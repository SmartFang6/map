<!-- 水域调查弹窗 -->
<template>
  <div class="pop">
    <div class="header_title">{{ props.info?.name }}</div>
    <div class="body">
      <div class="tabs">
        <div
          class="tab"
          v-for="item in tabs"
          :class="activeTab === item.value ? 'tab_act' : ''"
          :key="item.name"
          @click="switchTab(item.value)"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
    <!-- #region 水域基础信息 -->
    <div class="base" v-if="activeTab === 1">
      <component :is="curDialogCom" :info="props.info"></component>
    </div>
    <!-- #endregion -->
    <!-- #region 水域事件 -->
    <template v-if="activeTab === 2">
      <div class="pop-body">
        <div class="left-img">
          <el-carousel
            indicator-position="none"
            v-if="props.info?.imageFileInfoList?.length > 0"
          >
            <el-carousel-item
              v-for="item in info.imageFileInfoList"
              :key="item.fileId"
            >
              <img :src="item.relativeUrl" alt="" class="left-img" />
            </el-carousel-item>
          </el-carousel>
          <img :src="noImg" alt="" v-else />
        </div>
        <ul>
          <li class="right-li">
            <span class="item-label">事件编号：</span>
            <el-tooltip
              :content="props.info?.eventId"
              effect="light"
              placement="top"
            >
              <span class="item-value">{{ props.info?.eventId }}</span>
            </el-tooltip>
          </li>
          <!-- <li class="right-li">
            <span class="item-label">问题来源：</span
            ><span class="item-value">{{ info.eventSourceName }}</span>
          </li> -->
          <!-- <li class="right-li">
            <span class="item-label">事件等级：</span
            ><span class="item-value">{{ info.eventGradeName }}</span>
          </li> -->
          <li class="right-li">
            <span class="item-label">责任部门：</span>
            <el-tooltip
              :content="props.info?.eventResponsibleUnitCodeName"
              effect="light"
              placement="top"
            >
              <span class="item-value">
                {{ props.info?.eventResponsibleUnitCodeName }}
              </span>
            </el-tooltip>
          </li>
          <li class="right-li">
            <span class="item-label">所属区域：</span>
            <el-tooltip
              :content="props.info?.adnm"
              effect="light"
              placement="top"
            >
              <span class="item-value">{{ props.info?.adnm }}</span>
            </el-tooltip>
          </li>
          <li class="right-li">
            <span class="item-label">所属河湖：</span>
            <el-tooltip
              :content="props.info?.rchnm"
              effect="light"
              placement="top"
            >
              <span class="item-value">{{ props.info?.rchnm }}</span>
            </el-tooltip>
          </li>
          <li class="right-li">
            <span class="item-label">发生时间：</span>
            <el-tooltip
              :content="props.info?.occurTime"
              effect="light"
              placement="top"
            >
              <span class="item-value">{{ props.info?.occurTime }}</span>
            </el-tooltip>
          </li>
          <li class="right-li">
            <span class="item-label">事件状态：</span>
            <el-tooltip
              :content="props.info?.eventStatusName"
              effect="light"
              placement="top"
            >
              <span class="item-value">{{ props.info?.eventStatusName }}</span>
            </el-tooltip>
          </li>
          <div class="footer" @click="onJupmDetail">
            <img
              src="@/assets/images/detail-icon.png"
              alt=""
              class="footer-img"
            />
            <span class="footer-text">查看详情</span>
          </div>
        </ul>
      </div>
      <!-- 详情入口 -->
    </template>
    <!-- #endregion -->
    <!-- #region 涉水项目 -->
    <template v-if="activeTab === 3">
      <div class="pop-trunk">
        <div class="left-map">
          <Map :location="location" />
        </div>
        <ul>
          <li class="right-li">
            <span class="item-label">所在乡镇：</span>
            <el-tooltip :content="9" effect="light" placement="top">
              <span class="item-value">五连镇关山小区</span>
            </el-tooltip>
          </li>
          <li class="right-li">
            <span class="item-label">项目名称：</span>
            <el-tooltip :content="1" effect="light" placement="top">
              <span class="item-value">浙水东引项目</span>
            </el-tooltip>
          </li>
          <li class="right-li">
            <span class="item-label">类型：</span>
            <el-tooltip :content="2" effect="light" placement="top">
              <span class="item-value">人工河道</span>
            </el-tooltip>
          </li>
          <li class="right-li">
            <span class="item-label">联系人：</span>
            <el-tooltip :content="3" effect="light" placement="top">
              <span class="item-value">xxx</span>
            </el-tooltip>
          </li>
          <li class="right-li">
            <span class="item-label">占用水域名称：</span>
            <el-tooltip :content="4" effect="light" placement="top">
              <span class="item-value">xxxx</span>
            </el-tooltip>
          </li>
          <li class="right-li">
            <span class="item-label">实施状态：</span>
            <el-tooltip :content="5" effect="light" placement="top">
              <span class="item-value">运行中</span>
            </el-tooltip>
          </li>
          <li class="right-li">
            <span class="item-label">相关文件：</span>
            <el-tooltip :content="6" effect="light" placement="top">
              <span class="item-value">dinghai.pdf</span>
            </el-tooltip>
          </li>
        </ul>
      </div>
    </template>
    <!-- #endregion -->
  </div>
  <EventDetailDialog
    :info="props.info"
    v-model:visible="eventDetailDialogVisible"
  />
</template>

<script setup>
import { ref, watch } from "vue";
import useHomeDialog from "@/views/components/useHomeDialog.js";
import EventDetailDialog from "@/views/dialog/EventDetail/index";
import Map from "@/views/OLMap/ReadMap";
import { ElMessage } from "element-plus";
import noImg from "@/assets/images/no-img.png";
import store from "@/store";
const { curDialogCom, currentDialog } = useHomeDialog();
const props = defineProps({
  info: {
    type: Object,
    default() {
      return {};
    },
  },
});
// 监听水域类型切换
watch(
  () => props.info,
  (e) => {
    console.log(e, "eeee");
    currentDialog.value = e.layerid;
    console.log(curDialogCom);
  },
  {
    immediate: true,
    deep: true,
  }
);
// 切换tab
const tabs = ref([
  {
    name: "水域基础信息",
    value: 1,
  },
  {
    name: "水域事件",
    value: 2,
  },
  {
    name: "涉水项目",
    value: 3,
  },
]);
const activeTab = ref(1);
const switchTab = (tab) => {
  activeTab.value = tab;
};

// 地图的坐标信息
const location = ref({});

// 跳转后台详情
function onJupmDetail() {
  if (store?.state?.userInfo?.roleId === "065e6e9013954b09b013a1846499a720") {
    eventDetailDialogVisible.value = true;
  } else {
    ElMessage({
      message: "本功能暂未开放",
      type: "warning",
    });
  }
}
const eventDetailDialogVisible = ref(false);
</script>

<style lang="less" scoped>
.pop {
  .tabs {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    .tab {
      width: 135px;
      height: 27px;
      font-family: YouSheBiaoTiHei;
      font-size: 18px;
      text-align: center;
      color: #ffffff;
      cursor: pointer;
    }
    .tab_act {
      width: 135px;
      height: 27px;
      background: url(@/assets/images/water_tab.png) no-repeat;
      background-size: 100% 100%;
    }
  }
}
// 水域事件
.pop-body {
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-sizing: border-box;

  .left-img {
    width: 268px;
    height: 100%;
  }

  .left-map {
    width: 358px;
    height: 348px;
  }
  .footer-img {
    width: 23px;
    height: 24px;
  }
  .footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    cursor: pointer;
    span {
      margin-left: 4px;
      font-family: YouSheBiaoTiHei;
      font-size: 22px;
      font-weight: normal;
      line-height: 28px;
      color: #00a6ed;
    }
  }
}

// 涉水项目
.pop-trunk {
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-sizing: border-box;

  .left-map {
    height: 368px;
    flex: 1;
    align-self: flex-start;
  }
}
ul {
  width: 298px;
  margin-left: 14px;

  li {
    display: flex;
    width: 100%;
    height: 44px;
    line-height: 44px;
    margin-bottom: 10px;
    padding: 0 12px;
    background-color: #0b216c;
    box-shadow: inset 0 2px 1px 0 #1642d8;
    text-align: left;
  }
}

.item-label {
  min-width: 98px;
  text-align: right;
  font-family: MicrosoftYaHei;
  font-size: 18px;
  color: #ffffff;
  flex-shrink: 0;
}

.item-value {
  font-family: MicrosoftYaHei;
  font-size: 18px;
  color: #43c7ff;
  margin-left: 12px;
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden; //溢出内容隐藏
  text-overflow: ellipsis; //文本溢出部分用省略号表示
  display: -webkit-box; //特别显示模式
  -webkit-line-clamp: 2; //行数
  line-clamp: 2;
  -webkit-box-orient: vertical; //盒子中内容竖直排列
}
</style>
