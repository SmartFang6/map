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
      <SeamlessScroll :data-list="PoliciesSystemsList">
        <template #default="{ row }">
          <div class="oneList" :key="row.id">
            <i class="icon-rectangle"></i>
            <el-tooltip
              :content="row.policyName"
              effect="dark"
              placement="top-start"
            >
              <p class="content" @click="onPreviewPDFFile(row.pdfUrl)">
                {{ row.policyName }}
              </p>
            </el-tooltip>
            <span class="day">{{ row.createTime }}</span>
          </div>
        </template>
      </SeamlessScroll>
    </div>

    <el-empty v-else description="暂无数据" :image-size="80" class="dc-empty" />
    <!-- E内容区域 -->
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import { getPoliciesSystemsList } from "@/apis/cockpitEventStats";
import SeamlessScroll from "@/components/SeamlessScroll";

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
  PoliciesSystemsList.value = [
    {
      id: "3778b5534c9041ecb39fe25477c87325",
      adcd: "330182",
      policyName:
        "浙水办【2022】9号浙江省水利厅办公室关于发布水域监管“一件事”第一批试点单位的通知",
      pdfUrl:
        "https://zjwater-easyv-files.oss-cn-hangzhou-zwynet-d01-a.internet.cloud.zj.gov.cn/process-浙水办【2022】9号浙江省水利厅办公室关于发布水域监管“一件事”第一批试点单位的通知.pdf1ab1811205174a539f3fdcb891faa4ac.pdf",
      createTime: "2022-09-13",
    },
    {
      id: "8e36701bc9c4452eaec4a6d467f168ff",
      adcd: "330182",
      policyName: "关于做好基层治理“一件事”集成改革有关工作的通知",
      pdfUrl:
        "https://zjwater-easyv-files.oss-cn-hangzhou-zwynet-d01-a.internet.cloud.zj.gov.cn/process-【3380】关于做好基层治理“一件事”集成改革有关工作的通知.pdfb7338ef4f7d0437a91933a2f9829a196.pdf",
      createTime: "2022-09-13",
    },
    {
      id: "3778b5534c9041ecb39fe25477c87325",
      adcd: "330182",
      policyName:
        "浙水办【2022】9号浙江省水利厅办公室关于发布水域监管“一件事”第一批试点单位的通知",
      pdfUrl:
        "https://zjwater-easyv-files.oss-cn-hangzhou-zwynet-d01-a.internet.cloud.zj.gov.cn/process-浙水办【2022】9号浙江省水利厅办公室关于发布水域监管“一件事”第一批试点单位的通知.pdf1ab1811205174a539f3fdcb891faa4ac.pdf",
      createTime: "2022-09-13",
    },
    {
      id: "8e36701bc9c4452eaec4a6d467f168ff",
      adcd: "330182",
      policyName: "关于做好基层治理“一件事”集成改革有关工作的通知",
      pdfUrl:
        "https://zjwater-easyv-files.oss-cn-hangzhou-zwynet-d01-a.internet.cloud.zj.gov.cn/process-【3380】关于做好基层治理“一件事”集成改革有关工作的通知.pdfb7338ef4f7d0437a91933a2f9829a196.pdf",
      createTime: "2022-09-13",
    },
    {
      id: "3778b5534c9041ecb39fe25477c87325",
      adcd: "330182",
      policyName:
        "浙水办【2022】9号浙江省水利厅办公室关于发布水域监管“一件事”第一批试点单位的通知",
      pdfUrl:
        "https://zjwater-easyv-files.oss-cn-hangzhou-zwynet-d01-a.internet.cloud.zj.gov.cn/process-浙水办【2022】9号浙江省水利厅办公室关于发布水域监管“一件事”第一批试点单位的通知.pdf1ab1811205174a539f3fdcb891faa4ac.pdf",
      createTime: "2022-09-13",
    },
    {
      id: "8e36701bc9c4452eaec4a6d467f168ff",
      adcd: "330182",
      policyName: "关于做好基层治理“一件事”集成改革有关工作的通知",
      pdfUrl:
        "https://zjwater-easyv-files.oss-cn-hangzhou-zwynet-d01-a.internet.cloud.zj.gov.cn/process-【3380】关于做好基层治理“一件事”集成改革有关工作的通知.pdfb7338ef4f7d0437a91933a2f9829a196.pdf",
      createTime: "2022-09-13",
    },
    {
      id: "3778b5534c9041ecb39fe25477c87325",
      adcd: "330182",
      policyName:
        "浙水办【2022】9号浙江省水利厅办公室关于发布水域监管“一件事”第一批试点单位的通知",
      pdfUrl:
        "https://zjwater-easyv-files.oss-cn-hangzhou-zwynet-d01-a.internet.cloud.zj.gov.cn/process-浙水办【2022】9号浙江省水利厅办公室关于发布水域监管“一件事”第一批试点单位的通知.pdf1ab1811205174a539f3fdcb891faa4ac.pdf",
      createTime: "2022-09-13",
    },
    {
      id: "8e36701bc9c4452eaec4a6d467f168ff",
      adcd: "330182",
      policyName: "关于做好基层治理“一件事”集成改革有关工作的通知",
      pdfUrl:
        "https://zjwater-easyv-files.oss-cn-hangzhou-zwynet-d01-a.internet.cloud.zj.gov.cn/process-【3380】关于做好基层治理“一件事”集成改革有关工作的通知.pdfb7338ef4f7d0437a91933a2f9829a196.pdf",
      createTime: "2022-09-13",
    },
  ];
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
    height: 250px;
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
