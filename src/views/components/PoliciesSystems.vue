<template>
  <div class="policy">
    <Title title="政策制度">
      <!--S标题尾部功能区-->
      <template #more>
        <div class="tools">
          <i class="icon-zoom"></i>
        </div>
      </template>
      <!--E标题尾部功能区-->
    </Title>
    <!-- S内容区域 -->
    <div class="list" v-if="PoliciesSystemsList.length > 0">
      <vue-seamless-scroll
        :data="PoliciesSystemsList"
        :class-option="{ step: 0.3 }"
      >
        <div class="oneList" v-for="item in PoliciesSystemsList" :key="item.id">
          <i class="icon-rectangle"></i>
          <el-tooltip
            :content="item.policyName"
            effect="dark"
            placement="top-start"
          >
            <p class="content" @click="onPreviewPDFFile(item.pdfUrl)">
              {{ item.policyName }}
            </p>
          </el-tooltip>
          <span class="day">{{ item.createTime }}</span>
        </div>
      </vue-seamless-scroll>
    </div>
    <el-empty v-else description="暂无数据" :image-size="80" class="dc-empty" />
    <!-- E内容区域 -->
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import { getPoliciesSystemsList } from "@/apis/cockpitEventStats";
// import VueSeamlessScroll from "vue-seamless-scroll/src/components/myClass";

// 政策制度组件的数据源列表
const PoliciesSystemsList = ref([]);
const store = useStore();

// 获取获取政策制度列表
const getPoliciesSystems = async () => {
  // 通过后台接口获取文件制度信息列表
  const target = await getPoliciesSystemsList({
    adcd: store.state?.userInfo?.adminDivCode || "",
  });
  // 处理数据,获取预览需要的pdf文件地址
  PoliciesSystemsList.value = target?.map((item) => {
    return {
      ...item,
      pdfUrl: item?.fileInfoList?.[0]?.relativeUrl ?? "",
    };
  });
};

getPoliciesSystems();

// 预览pdf文件
const onPreviewPDFFile = (url = "") => {
  if (!url) return;
  let a = document.createElement("a");
  a.setAttribute("href", url);
  a.setAttribute("target", "_blank");
  a.click();
  a = null;
};
</script>
<style scoped lang="less">
.policy {
  height: 302px;
  overflow: hidden;
  :deep(.tools) {
    display: flex;
    position: absolute;
    right: 0;
    padding-right: 48px;
    .icon-zoom {
      width: 16px;
      height: 16px;
      color: #fff;
      background: url(@/assets/images/icon-zoom.png) no-repeat;
      background-size: cover;
      cursor: pointer;
    }
  }
  .list {
    width: 100%;
    margin-top: 10px;
    padding: 0 22px 0 16px;
    box-sizing: border-box;
    overflow: hidden;
    .oneList {
      display: flex;
      align-items: center;
      font-family: MicrosoftYaHei;
      width: 446px;
      height: 41px;
      // background-color: #0040a1;
      background: linear-gradient(to right, #0040a1, rgba(255, 255, 255, 0));
      margin-bottom: 9px;

      .icon-rectangle {
        width: 18px;
        height: 17px;
        margin-left: 10px;
        color: #fff;
        background: url(@/assets/images/icon-rectangle.png) no-repeat;
        background-size: cover;
      }
      .content {
        width: 290px;
        margin-left: 10px;
        font-size: 15px;
        text-align: left;
        color: #fff;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .day {
        margin-left: 24px;
        font-size: 16px;
        white-space: nowrap;
        color: #00dcf0;
      }
    }
  }
}
</style>
