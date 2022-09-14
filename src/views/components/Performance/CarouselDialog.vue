<!--
    处理绩效的轮播弹窗组件
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
      <el-carousel indicator-position="outside">
        <el-carousel-item v-for="(item, index) in galleryList" :key="index">
          <img class="gallery-inner" :src="item.url" :alt="item.name" />
        </el-carousel-item>
      </el-carousel>
      <!--#endregion-->
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

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

const galleryList = ref([
  // {
  //   id: 1001,
  //   name: "rule",
  //   url: "http://html5-epg.wasu.tv/_CMS_NEWS_IMG_/www224/202209/02/cms_55236964872586607774644.jpg",
  // },
  // {
  //   id: 1002,
  //   name: "rule",
  //   url: "http://html5-epg.wasu.tv/_CMS_NEWS_IMG_/www224/202207/04/cms_67344705967398992624193.jpg",
  // },
  // {
  //   id: 1003,
  //   name: "rule",
  //   url: "http://html5-epg.wasu.tv/_CMS_NEWS_IMG_/www224/202208/09/cms_6834115643127880877769.jpg",
  // },
  // {
  //   id: 1004,
  //   name: "rule",
  //   url: "http://html5-epg.wasu.tv/_CMS_NEWS_IMG_/www224/202103/23/cms_81509214635837408606126.jpg",
  // },
  // {
  //   id: 1005,
  //   name: "rule",
  //   url: "http://html5-epg.wasu.tv/_CMS_NEWS_IMG_/www224/202203/10/cms_1430663409879255511237.jpg",
  // },
]);
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
}
</style>
