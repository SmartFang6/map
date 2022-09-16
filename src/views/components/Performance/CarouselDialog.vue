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
        <!-- <vue-pdf-embed
          class="vue-pdf-embed"
          v-if="activeFiles?.source"
          :source="activeFiles?.source"
          :page="activeFiles?.pageNum"
          :style="scaleFun"
        /> -->
        <iframe
          class="pdf-frame"
          :src="activeFiles?.source"
          frameborder="0"
        ></iframe>
        <div class="page-tool">
          <div class="page-tool-item" @click="prevPage">上一页</div>
          <div class="page-tool-item">
            {{ activeFiles.pageNum || 0 }}/{{ activeFiles.numPages || 0 }}
          </div>
          <div class="page-tool-item" @click="nextPage">下一页</div>
          <div
            class="page-tool-item"
            @click="pageZoomOut"
            style="display: none"
          >
            放大
          </div>
          <div class="page-tool-item" @click="pageZoomIn" style="display: none">
            缩小
          </div>
        </div>
      </div>
      <!--#endregion-->
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
// import VuePdfEmbed from "vue-pdf-embed";
import { createLoadingTask } from "vue3-pdfjs/cjs"; // 获得总页数

// 接收父组件传值
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  files: {
    type: Object,
    default: () => {},
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

// 当前展示的pdf文件数据
const activeFiles = ref({});

// 监听父组件传递的pdf预览文件数据
watch(
  () => props.files,
  (files) => {
    activeFiles.value = files;
    // 获取pdf文件的总页数
    if (activeFiles.value?.source) {
      console.log(activeFiles.value);
      const loadingTask = createLoadingTask(activeFiles.value?.source);
      loadingTask.promise.then((fileInfo) => {
        activeFiles.value.numPages = fileInfo.numPages;
      });
    }
  },
  {
    immediate: true,
  }
);

// 文件缩放的样式方法
// const scaleFun = computed(() => `transform:scale(${activeFiles.value?.scale})`);

// 上一页
const prevPage = () => {
  if (activeFiles.value?.pageNum > 1) {
    activeFiles.value.pageNum -= 1;
  }
};

// 下一页
const nextPage = () => {
  if (activeFiles.value?.pageNum < activeFiles.value?.numPages) {
    activeFiles.value.pageNum += 1;
  }
};

// 文件方放大
const pageZoomOut = () => {
  if (activeFiles.value?.scale < 2) {
    activeFiles.value.scale += 0.1;
  }
};

// 文件缩小
const pageZoomIn = () => {
  if (activeFiles.value?.scale > 1) {
    activeFiles.value.scale -= 0.1;
  }
};

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
    height: auto;
    min-height: 600px;
    padding: 20px;
    box-sizing: border-box;
    background: rgb(66, 66, 66);
  }

  .vue-pdf-embed {
    text-align: center;
    width: 100%;
    margin: 0 auto;
    box-sizing: border-box;
  }

  .pdf-wrap {
    overflow-y: auto;
  }

  .page-tool {
    position: absolute;
    bottom: 35px;
    padding-left: 15px;
    padding-right: 15px;
    display: flex;
    align-items: center;
    background: rgb(66, 66, 66);
    color: white;
    border-radius: 19px;
    z-index: 100;
    cursor: pointer;
    margin-left: 50%;
    transform: translateX(-50%);
  }

  .page-tool-item {
    padding: 8px 15px;
    padding-left: 10px;
    cursor: pointer;
  }

  .pdf-frame {
    width: 100%;
    min-height: 768px;
  }
}
</style>
