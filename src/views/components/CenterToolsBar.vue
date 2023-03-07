<!------------------------------------------------------
 ¦ 中间的工具栏
 ¦ 搜索、日期类型、统计、配置等..
 ¦
 ¦ Author: 大风
 ¦ Date: 2022-09-07 16:08:51
 ¦ FilePath: src/views/components/CenterToolsBar.vue
 ¦----------------------------------------------------->

<template>
  <div class="center-tools-bar">
    <!--#region 搜索、日期类型切换-->
    <div class="filter">
      <div class="search-wrapper" :class="{ active: searchActive }">
        <img src="@/assets/images/center-tools-search.png" />
        <input
          type="text"
          v-model="searchText"
          placeholder="搜索    ⏎"
          @focus="searchActive = true"
          @blur="searchActive = false"
          @keyup.enter="emits('search', searchText)"
        />
      </div>
      <div class="datetime-wrapper">
        <el-dropdown>
          <div class="dropdown-inner">
            <span>{{ currentDateType?.label }}</span>
            <!-- <span>{{ currentDateType?.label ?? "年份" }}</span> -->
            <img src="@/assets/images/center-tools-dropdown-arrow.png" />
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                v-for="(dateType, index) in dateTypes"
                :key="index"
                @click="changeDate(dateType)"
              >
                {{ dateType.label }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <div class="datetime-wrapper adcd-wrapper">
        <el-dropdown>
          <div class="dropdown-inner">
            <span>{{ currentAdcd?.adnm }}</span>
            <img src="@/assets/images/center-tools-dropdown-arrow.png" />
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                v-for="(adcd, index) in adcdList"
                :key="index"
                @click="onChangeAdcd(adcd)"
              >
                {{ adcd.adnm }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    <!--#endregion-->

    <!--#region 统计-->
    <div class="stat">
      <div
        v-for="(item, index) in statList"
        :key="index"
        :class="{ 'stat-item': true, active: activeFilter?.type === item.type }"
        @click="
          store.commit('UPDATE_ACTIVE_FILTER', {
            type: item.type,
            value: 1,
          })
        "
      >
        <div class="label">{{ item.label }}</div>
        <div class="value">
          <span>{{ item.value }}</span>
          <span>个</span>
        </div>
      </div>
    </div>
    <!--#endregion-->

    <!--#region 配置-->
    <div class="settings">
      <a class="btn" @click="$router.push('/dynamicLayout')" />
    </div>
    <!--#endregion-->
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import moment from "moment";
import { getListDistrict } from "@/apis/home";
import { getEventRiskControl } from "@/apis/cockpitEventStats";

// 事件
const emits = defineEmits(["search", "changeTime"]);

const store = useStore();

// 搜索组件激活状态(自动伸缩)
const searchActive = ref(false);

// 搜索字符串
const searchText = ref("");

// 统计数据
const statData = ref(null);

// 当前(选中)的时间类型
const currentDateType = ref(null);

// 激活的过滤器
const activeFilter = computed(() => store.state.activeFilter);

// stat list
const statList = computed(() => [
  {
    label: "本月新增",
    value: statData.value?.todayAddNum || 0,
    type: "thisMonthNewStatus",
  },
  {
    label: "即将逾期",
    value: statData.value?.todayImmediatelyTimeoutNum || 0,
    type: "willExpireStatus",
  },
  {
    label: "本月逾期",
    value: statData.value?.todayTimeoutNum || 0,
    type: "expireStatus",
  },
]);

// 时间类型
const dateTypes = ref([
  // {
  //   label: "本年",
  //   value: "year",
  // },
  // {
  //   label: "本月",
  //   value: "month",
  // },
]);
const getTimeRange = () => {
  let date = new Date();
  let nowMonth = date.getMonth() + 1;
  let nowYear = date.getFullYear();
  const startYear = 2021;
  let endYear = nowYear;
  if (nowMonth >= 11) {
    endYear = nowYear + 1;
  }
  let timeRange = [];
  for (let i = startYear; i <= endYear; i++) {
    timeRange.unshift({
      label: i + "年",
      value: i,
    });
  }
  dateTypes.value = timeRange;
};
getTimeRange();
const changeDate = async (payload) => {
  const { value } = payload;
  // if (!init) {
  currentDateType.value = payload;
  // }
  const dataObj = {
    endTime: moment().format(value + "-12-31 23:59:59"),
    startTime: moment().format(value + "-01-01 00:00:00"),
  };
  store.commit("UPDATE_DATE", dataObj);
  emits("changeTime", dataObj);
  statData.value = await getEventRiskControl({
    ...dataObj,
    adcd: store?.state?.userInfo?.adminDivCode || "330182",
  });
};
const adcdList = ref([
  {
    adnm: store?.state?.adcdName || "",
    adcd: store?.state?.userInfo?.adminDivCode || "",
  },
]);
const getAdcdList = async () => {
  let res = await getListDistrict({
    parentAdcd: store?.state?.userInfo?.adminDivCode,
  });
  adcdList.value = [...adcdList.value, ...res];
};
const currentAdcd = ref({
  adnm: store?.state?.adcdName || "",
  adcd: store?.state?.userInfo?.adminDivCode || "",
});
const onChangeAdcd = (adcd) => {
  currentAdcd.value.adnm = adcd.adnm;
  currentAdcd.value.adcd = adcd.adcd;
  const dataObj = store?.state?.dateRange;
  dataObj.adcd = adcd.adcd;
  store.commit("UPDATE_DATE", dataObj);
};
onMounted(() => {
  let yr = new Date().getFullYear();
  getAdcdList();
  changeDate({ value: yr, label: yr + "年" });
});
</script>

<style lang="less" scoped>
.center-tools-bar {
  width: 830px;
  height: 123px;
  margin: 75px auto 0;
  display: flex;
  justify-content: space-between;
  position: absolute;
  left: 50%;
  margin-left: -415px;
  z-index: 100;
}
.filter,
.settings {
  width: 139px;
}
.filter {
  height: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  padding: 2px 0;
}
.search-wrapper,
.datetime-wrapper {
  // margin-bottom: 12px;
  padding: 0 10px;
  box-sizing: border-box;
  // width: 94px;
  width: 114px;
  height: 33px;
  border-radius: 16px;
  border: solid 1px #00a6ed;
  display: flex;
  align-items: center;
}
.adcd-wrapper .dropdown-inner span {
  display: inline-block;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.search-wrapper {
  transition: 0.3s all ease-out;
  & > img {
    width: 16px;
    height: 16px;
  }
  & > input {
    width: 100%;
    flex: 1;
    margin-left: 10px;
    height: 100%;
    outline: none;
    background: transparent;
    border: none;
    color: #fff;
    &::-webkit-input-placeholder {
      font-family: YOUSHEBIAOTIHEI;
      font-size: 18px;
      color: #a0bed1;
    }
    &::-ms-input-placeholder {
      font-family: YOUSHEBIAOTIHEI;
      font-size: 18px;
      color: #a0bed1;
    }
    &::-moz-input-placeholder {
      font-family: YOUSHEBIAOTIHEI;
      font-size: 18px;
      color: #a0bed1;
    }
  }
  &.active {
    width: 280px;
    z-index: 100;
    position: relative;
    background: #031f57;
  }
}
.datetime-wrapper {
  width: 114px;
  cursor: pointer;
  padding-left: 14px;
  padding-right: 12px;
  & span {
    font-size: 18px;
    font-family: YOUSHEBIAOTIHEI;
    color: #fff;
  }
  & img {
    width: 12px;
    height: 8px;
    margin-left: 4px;
  }
  .dropdown-inner {
    width: 90px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
.stat {
  width: 551px;
  height: 75px;
  background: url(@/assets/images/center-stat-bg.png) no-repeat;
  background-size: contain;
  display: flex;
  justify-content: space-around;
  padding: 18px 20px 0;
  box-sizing: border-box;
}
.stat-item {
  cursor: pointer;
  width: 154px;
  height: 64px;
  padding-bottom: 8px;
  box-sizing: border-box;
  &.active {
    background-image: url(@/assets/images/center-tools-bar-checked.png);
    background-repeat: no-repeat;
    background-position: center bottom;
    background-size: contain;
  }
  & .label {
    font-family: YouSheBiaoTiHei;
    color: #e0ecff;
    font-size: 24px;
    line-height: 24px;
  }
  & .value > span:first-child {
    font-family: AGENCYB;
    font-size: 36px;
    line-height: 36px;
  }
  & .value > span:last-child {
    font-size: 14px;
    color: #fff;
    font-weight: bold;
    font-style: italic;
    padding-left: 9px;
  }
}
.stat-item:nth-child(1) > .value > span:first-child {
  color: #00dcf0;
}
.stat-item:nth-child(2) > .value > span:first-child {
  color: #ff4d65;
}
.stat-item:nth-child(3) > .value > span:first-child {
  color: #ffd633;
}
.settings {
  display: flex;
  justify-content: flex-end;
  height: 100%;
  align-items: center;
  & > .btn {
    display: block;
    cursor: pointer;
    width: 87px;
    height: 33px;
    cursor: pointer;
    background: url(@/assets/images/config-button.png) no-repeat;
    background-size: 100% 100%;
  }
}
</style>
