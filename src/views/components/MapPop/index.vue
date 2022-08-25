<template>
  <div class="map-pop">
    <el-dialog v-model="dialogVisible" width="40%">
      <template #title>
        <div class="pop-title">
          <span>{{ info?.adnm }}</span>
          <!-- <el-button text :type="getTag(info.eventGrade)">{{
            info?.eventTypeName
          }}</el-button> -->
          <el-tag
            :type="getTag(info.eventGrade)"
            size="small"
            class="tag"
            effect="dark"
            >{{ info.eventGradeName }}</el-tag
          >
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
            <span class="item-label">事件编号：</span
            ><span class="item-value">{{ info.eventId }}</span>
          </li>
          <li class="right-li">
            <span class="item-label">问题来源：</span
            ><span class="item-value">{{ info.eventSourceName }}</span>
          </li>
          <li class="right-li">
            <span class="item-label">事件等级：</span
            ><span class="item-value">{{ info.eventGradeName }}</span>
          </li>
          <li class="right-li">
            <span class="item-label">责任部门：</span
            ><span class="item-value">{{
              info.eventResponsibleUnitCodeName
            }}</span>
          </li>
          <li class="right-li">
            <span class="item-label">所属区域：</span
            ><span class="item-value">{{ info.eventId }}</span>
          </li>
          <li class="right-li">
            <span class="item-label">所属河湖：</span
            ><span class="item-value">{{ info.rchnm }}</span>
          </li>
          <li class="right-li">
            <span class="item-label">发生时间：</span
            ><span class="item-value">{{ info.occurTime }}</span>
          </li>
          <li class="right-li">
            <span class="item-label">事件状态：</span
            ><span class="item-value">{{ info.eventStatusName }}</span>
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
let dialogVisible = ref(false);
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
  console.log("跳转后台详情");
}

// 打开弹窗
function open(val) {
  info.value = val;
  dialogVisible.value = true;
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
      // height: 156px;
    }

    ul {
      flex: 1;
      margin-left: 50px;

      li {
        width: 100%;
        line-height: 40px;
        text-align: left;
      }
    }

    .item-label {
      width: 100px;
      padding: 5px 10px;
      background: url(@/assets/images/pop-label.png);
      background-size: 100% 100%;
      color: #0adbe0;
    }

    .item-value {
      color: white;
      margin-left: 15px;
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
