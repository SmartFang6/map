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
          placeholder="搜索 ⏎"
          @focus="searchActive = true"
          @blur="searchActive = false"
          @keyup.enter="emits('search', searchText)"
        />
      </div>
      <div class="datetime-wrapper">
        <el-dropdown>
          <div class="dropdown-inner">
            <span>{{ currentDateType.label }}</span>
            <img src="@/assets/images/center-tools-dropdown-arrow.png" />
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                v-for="(dateType, index) in dateTypes"
                :key="index"
                @click="currentDateType = dateType"
              >
                {{ dateType.label }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    <!--#endregion-->

    <!--#region 统计-->
    <div class="stat">
      <div class="stat-item">
        <div class="label">本月新增</div>
        <div class="value">
          <span>34</span>
          <span>个</span>
        </div>
      </div>
      <div class="stat-item">
        <div class="label">即将逾期</div>
        <div class="value">
          <span>34</span>
          <span>个</span>
        </div>
      </div>
      <div class="stat-item">
        <div class="label">本月逾期</div>
        <div class="value">
          <span>34</span>
          <span>个</span>
        </div>
      </div>
    </div>
    <!--#endregion-->

    <!--#region 配置-->
    <div class="settings">
      <a class="btn" />
    </div>
    <!--#endregion-->
  </div>
</template>

<script setup>
import { ref, defineEmits } from "vue";

// 事件
const emits = defineEmits(["search"]);

// 搜索组件激活状态(自动伸缩)
const searchActive = ref(false);

// 搜索字符串
const searchText = ref("");

// 时间类型
const dateTypes = [
  {
    label: "本年",
    value: "",
  },
  {
    label: "本月",
    value: "",
  },
];

// 当前(选中)的时间类型
const currentDateType = ref(dateTypes[0]);
</script>

<style lang="less" scoped>
.center-tools-bar {
  width: 830px;
  height: 83px;
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
  padding: 0 10px;
  box-sizing: border-box;
  width: 87px;
  height: 33px;
  border-radius: 16px;
  border: solid 1px #00a6ed;
  display: flex;
  align-items: center;
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
    width: 300px;
    z-index: 100;
    position: relative;
    background: #031f57;
  }
}
.datetime-wrapper {
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
  }
  .dropdown-inner {
    width: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
.stat {
  width: 551px;
  height: 67px;
  background: url(@/assets/images/center-stat-bg.png);
  background-size: contain;
  display: flex;
  justify-content: space-around;
  padding: 18px 20px 0;
  box-sizing: border-box;
}
.stat-item {
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
    background: url(@/assets/images/config-button.png);
    background-size: contain;
  }
}
</style>
