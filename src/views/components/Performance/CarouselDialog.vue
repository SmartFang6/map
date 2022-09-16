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
          class="vue-pdf-embed"
          :source="activeFiles?.source"
          :page="activeFiles?.pageNum"
          :style="scaleFun"
        />
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
import { ref, reactive, watch, computed, onMounted } from "vue";
import { useStore } from "vuex";
import VuePdfEmbed from "vue-pdf-embed";
import { createLoadingTask } from "vue3-pdfjs/cjs"; // 获得总页数

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
    adnm: "温州苍南县",
    source: require("@/assets/pdf/苍南县-考核积分细则.pdf").default, //预览pdf文件地址
    pageNum: 1, //当前页面
    scale: 1, // 缩放比例
    numPages: 0, // 总页数
  },
  {
    adcd: "330502",
    adnm: "湖州吴兴区",
    source: "",
    pageNum: 1,
    scale: 1,
    numPages: 0,
  },
  {
    adcd: "330902",
    adnm: "舟山定海区",
    source: require("@/assets/pdf/定海区各责任部门考核积分细则.pdf").default,
    pageNum: 1,
    scale: 1,
    numPages: 0,
  },
  {
    adcd: "330182",
    adnm: "杭州建德市",
    source: "",
    pageNum: 1,
    scale: 1,
    numPages: 0,
  },
  {
    adcd: "330782",
    adnm: "金华义乌市",
    source: "",
    pageNum: 1,
    scale: 1,
    numPages: 0,
  },
]);

// 当前展示的pdf文件数据
const activeFiles = ref({});

onMounted(() => {
  // 获取缓存中关于地区的code
  const adCode = store.state?.userInfo?.adminDivCode || "";
  // 从数据源筛选要展示的pdf文件数据
  dataModel?.forEach((item) => {
    if (item.adcd === adCode) {
      activeFiles.value = item;
    }
  });
  // 获取pdf文件的总页数
  if (activeFiles.value?.source) {
    const loadingTask = createLoadingTask(activeFiles.value?.source);
    loadingTask.promise.then((fileInfo) => {
      activeFiles.value.numPages = fileInfo.numPages;
    });
  }
});

// 文件缩放的样式方法
const scaleFun = computed(() => `transform:scale(${activeFiles.value?.scale})`);

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
}
</style>
