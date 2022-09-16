<template>
  <div class="map-pop">
    <EventDetailDialog
      :info="info"
      v-model:visible="eventDetailDialogVisible"
    />
    <el-dialog v-if="false" v-model="dialogVisible" width="40%">
      <template #title>
        <div class="pop-title">
          <span>{{ info?.eventSourceName }}</span>
          <!-- <el-button text :type="getTag(info.eventGrade)">{{
            info?.eventTypeName
          }}</el-button> -->
          <el-tag
            :type="getTag(info.eventGrade)"
            size="small"
            class="tag"
            effect="dark"
          >
            {{ info.eventGradeName }}
          </el-tag>
        </div>
      </template>
      <div class="pop-body">
        <div class="left-img">
          <el-carousel
            indicator-position="none"
            v-if="info.imageFileInfoList?.length > 0"
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
            <el-tooltip :content="info?.eventId" effect="light" placement="top">
              <span class="item-value">{{ info?.eventId }}</span>
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
              :content="info?.eventResponsibleUnitCodeName"
              effect="light"
              placement="top"
            >
              <span class="item-value">
                {{ info?.eventResponsibleUnitCodeName }}
              </span>
            </el-tooltip>
          </li>
          <li class="right-li">
            <span class="item-label">所属区域：</span>
            <el-tooltip :content="info?.adnm" effect="light" placement="top">
              <span class="item-value">{{ info?.adnm }}</span>
            </el-tooltip>
          </li>
          <li class="right-li">
            <span class="item-label">所属河湖：</span>
            <el-tooltip :content="info?.rchnm" effect="light" placement="top">
              <span class="item-value">{{ info?.rchnm }}</span>
            </el-tooltip>
          </li>
          <li class="right-li">
            <span class="item-label">发生时间：</span>
            <el-tooltip
              :content="info?.occurTime"
              effect="light"
              placement="top"
            >
              <span class="item-value">{{ info?.occurTime }}</span>
            </el-tooltip>
          </li>
          <li class="right-li">
            <span class="item-label">事件状态：</span>
            <el-tooltip
              :content="info?.eventStatusName"
              effect="light"
              placement="top"
            >
              <span class="item-value">{{ info?.eventStatusName }}</span>
            </el-tooltip>
          </li>
        </ul>
      </div>
      <!-- 详情入口 -->
      <div class="footer" @click="onJupmDetail">
        <img src="@/assets/images/detail-icon.png" alt="" class="footer-img" />
        <span class="footer-text">查看详情</span>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";
import noImg from "@/assets/images/no-img.png";
// import { awaitToAdminProject } from "@/utils";
import store from "@/store";
import { ElMessage } from "element-plus";
import EventDetailDialog from "@/views/dialog/EventDetail/index";

let dialogVisible = ref(false);
const eventDetailDialogVisible = ref(false);
let info = ref({});

// 事件等级颜色匹配
function getTag(val) {
  const typeMap = {
    1: "danger",
    2: "warning",
    3: "success",
  };
  return typeMap[val];
}

// 跳转后台详情
function onJupmDetail() {
  console.log("跳转后台详情", info.value);
  if (store?.state?.userInfo?.roleId === "065e6e9013954b09b013a1846499a720") {
    eventDetailDialogVisible.value = true;
  } else {
    ElMessage({
      message: "本功能暂未开放",
      type: "warning",
    });
  }
}

// 打开弹窗
function open(val) {
  info.value = val;
  dialogVisible.value = true;
  eventDetailDialogVisible.value = true;
}

defineExpose({
  open,
});
</script>

<style lang="less" scoped>
.map-pop {
  :deep(.el-dialog) {
    background-color: rgba(#19385b, 0.8);
    color: white;
    border: 1px solid #64d2f7;
  }

  :deep(.el-dialog__headerbtn .el-dialog__close) {
    svg {
      display: none;
    }
    background: url(@/assets/images/close-icon.png);
    background-size: 100% 100%;
  }

  .pop-title {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: #0adbe0;
    font-size: 24px;

    .tag {
      margin-left: 10px;
    }
  }

  .pop-body {
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    padding: 0 50px;

    .left-img {
      width: 268px;
      height: 100%;
    }

    ul {
      flex: 1;
      margin-left: 50px;

      li {
        display: flex;
        width: 100%;
        line-height: 30px;
        text-align: left;
        margin-bottom: 15px;
      }
    }

    .item-label {
      width: 100px;
      min-width: 78px;
      height: 30px;
      background: url(@/assets/images/pop-label.png);
      background-size: 100% 100%;
      color: #0adbe0;
      text-align: center;
      flex-shrink: 0;
    }

    .item-value {
      color: white;
      margin-left: 15px;
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden; //溢出内容隐藏
      text-overflow: ellipsis; //文本溢出部分用省略号表示
      display: -webkit-box; //特别显示模式
      -webkit-line-clamp: 2; //行数
      line-clamp: 2;
      -webkit-box-orient: vertical; //盒子中内容竖直排列
    }
  }
  .footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-right: 40px;
    cursor: pointer;
    &-img {
      width: 27px;
      height: 28px;
    }
    &-text {
      font-size: 18px;
      font-weight: 700;
      color: #0adbe0;
      margin-left: 10px;
    }
  }
}
</style>
