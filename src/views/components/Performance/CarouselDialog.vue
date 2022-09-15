<!--
    考核制度的轮播弹窗组件
-->
<template>
  <div class="carousel-dialog">
    <el-dialog
      v-model="dialogVisible"
      custom-class="common_dialog"
      width="60vw"
    >
      <div class="top-title">
        <h2 class="title-wrap">考核制度</h2>
      </div>
      <!--#region 轮播的内容区-->
      <!-- <el-carousel indicator-position="outside">
        <el-carousel-item v-for="(item, index) in galleryList" :key="index">
          <img class="gallery-inner" :src="item.url" :alt="item.name" />
        </el-carousel-item>
      </el-carousel> -->
      <!--#endregion-->

      <!--#region 考核制度的pdf文件预览区-->
      <div class="pdf-preview">
        <vue-pdf-embed
          :source="activeFiles.source"
          :style="scaleFun"
          class="vue-pdf-embed"
          :page="activeFiles.pageNum"
        />
      </div>
      <!--#endregion-->
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, watch, onMounted } from "vue";
import { useStore } from "vuex";
import VuePdfEmbed from "vue-pdf-embed";
// import { createLoadingTask } from "vue3-pdfjs/esm"; // 获得总页数

const store = useStore();

// 接收父组件传值
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(["update:visible"]);

// 是否开启弹窗
const dialogVisible = ref(false);

// 监听父组件的开启弹窗参数
watch(
  () => props.visible,
  (visible) => {
    dialogVisible.value = visible;
  },
  {
    immediate: true,
  }
);

// 监听本组件的弹窗展示参数,并同步父组件
watch(
  () => dialogVisible.value,
  (dialogVisible) => {
    if (!dialogVisible) {
      emits("update:visible", false);
    }
  },
  {
    immediate: false,
  }
);

// 本组件预览pdf文件的数据源
const dataModel = reactive([
  {
    adcd: "330327",
    source: require("@/assets/pdf/苍南县-考核积分细则.pdf").default, //预览pdf文件地址
    pageNum: 1, //当前页面
    scale: 1, // 缩放比例
    numPages: 7, // 总页数
  },
  {
    adcd: "330902",
    source: require("@/assets/pdf/定海区各责任部门考核积分细则.pdf").default,
    pageNum: 1, //当前页面
    scale: 1, // 缩放比例
    numPages: 8, // 总页数
  },
]);

const activeFiles = ref(null);

onMounted(() => {
  // 获取缓存中关于地区的code
  const adCode = store.state?.userInfo?.adminDivCode || "";
  // 从数据源筛选要展示的pdf文件数据
  dataModel?.forEach((item) => {
    if (item.adcd === adCode) {
      activeFiles.value = item;
    }
  });
});

// 示例数据
// const galleryList = ref([
//   {
//     id: 1001,
//     name: "rule",
//     url: "http://html5-epg.wasu.tv/_CMS_NEWS_IMG_/www224/202209/02/cms_55236964872586607774644.jpg",
//   },
// ]);
</script>

<style lang="less" scoped>
.carousel-dialog {
  display: block;

  :deep(.el-dialog__body) {
    // padding: 0;
    opacity: 1;
  }

  .top-title {
    display: flex;
    position: absolute;
    top: 18px;

    .title-wrap {
      font-size: 26px;
      font-weight: 400;
      font-family: YouSheBiaoTiHei;
      color: #0adbe0;
    }
  }

  .gallery-inner {
    width: 100%;
    height: 100%;
  }

  .pdf-preview {
    position: relative;
    height: 100vh;
    padding: 20px 0;
    box-sizing: border-box;
    background: rgb(66, 66, 66);
  }

  .vue-pdf-embed {
    text-align: center;
    width: 515px;
    border: 1px solid #e5e5e5;
    margin: 0 auto;
    box-sizing: border-box;
  }
}
</style>
