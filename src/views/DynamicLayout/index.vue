<!--****************************************
 * 大屏配置页面
 *
 * founder: king
 * Date:  28 2022/9/28
 *****************************************-->
<template>
  <el-container class="dynamicConfig--warp">
    <el-header class="dynamicConfig--warp__header">
      <div class="header--warp">
        <header class="title">水域监管驾驶舱大屏配置</header>
        <div class="select--box">
          <el-select v-model="layoutId" @change="getLayoutInfo">
            <el-option
              v-for="item in layoutList"
              :key="item?.id"
              :label="item?.layoutName"
              :value="item?.id"
            />
          </el-select>
        </div>
      </div>
      <div class="tools--box">
        <el-button type="danger" link :icon="Delete" @click="delLayout">
          删除该布局
        </el-button>
        <el-button type="warning" link :icon="Brush" @click="clearCall">
          清空
        </el-button>
        <el-button type="primary" link :icon="View" @click="previewShow = true">
          预览
        </el-button>
        <el-button type="success" link :icon="Promotion" @click="publishLayout">
          发布并使用
        </el-button>
        <el-button type="primary" :icon="HomeFilled" @click="$router.go(-1)">
          返回
        </el-button>
      </div>
    </el-header>
    <el-container>
      <!--      <el-aside class="aside-list" width="16vw">-->
      <!--        <div class="template-item" v-for="item in templateList" :key="item?.id">-->
      <!--          dd-->
      <!--        </div>-->
      <!--      </el-aside>-->
      <el-main class="dynamicConfig--warp__main">
        <OperationPanel
          ref="operationPanel"
          :initLayout="initLayout"
          @updateConfig="updateConfigCall"
        />
        <el-dialog
          v-model="previewShow"
          top="0"
          width="100vw"
          destroy-on-close
          custom-class="preview--dialog"
        >
          <PreviewLayout :nowConfig="nowConfig" />
        </el-dialog>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
/**
 大屏配置页面
 **/
// import { ref } from "vue";
import {
  View,
  Promotion,
  Delete,
  HomeFilled,
  Brush,
} from "@element-plus/icons-vue";
import OperationPanel from "./components/OperationPanel";
import PreviewLayout from "./components/PreviewLayout";
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import {
  delUserConfigLayout,
  getConfigLayoutById,
  getUserConfigLayoutList,
  setUserConfigLayoutInfo,
} from "@/apis/dynamicLayout";
import { ElMessage, ElMessageBox } from "element-plus";
import {
  buildParamsLayout,
  buildUserLayout,
} from "@/views/dynamicWidget/commonTools";

const router = useRouter();
const store = useStore();

// 删除布局
const layoutId = ref(null);
function delLayout() {
  if (!layoutId.value) return ElMessage.info("请选择模版！");
  delUserConfigLayout({
    code: layoutId.value,
  });
}

// 获取布局列表
const layoutList = ref([]);
async function getUserLayoutList() {
  try {
    const message = await getUserConfigLayoutList();
    if (!message) return;
    layoutList.value = message;
    layoutList.value.push({
      id: "",
      layoutName: "新增",
    });
  } catch (e) {
    console.log(e);
  }
}
getUserLayoutList();

async function getLayoutInfo() {
  if (!layoutId.value) {
    clearCall();
  } else {
    try {
      const message = await getConfigLayoutById({
        code: layoutId.value,
      });
      console.log(message);
      const newLayout = buildUserLayout(message);
      nowConfig.value = newLayout;
      initLayout.value = newLayout;
    } catch (e) {
      console.log(e);
    }
  }
}

// 布局操作
const nowConfig = ref(null);
function updateConfigCall(payload) {
  nowConfig.value = {
    ...payload,
  };
}
const previewShow = ref(false);

const operationPanel = ref(null);
function clearCall() {
  nowConfig.value = {
    layoutName: "",
    left: [],
    right: [],
  };
  initLayout.value = {
    layoutName: "",
    left: [],
    right: [],
  };
  operationPanel?.value?.clearConfig && operationPanel?.value?.clearConfig();
}
async function publishLayout() {
  // store.commit("UPDATE_LAYOUT_CONFIG", JSON.stringify(nowConfig.value));
  try {
    let params = {
      layoutName: store?.state?.layoutConfig?.layoutName || "",
      ...nowConfig.value,
    };
    const { value } = await ElMessageBox.prompt(
      "请填写组件名称",
      "布局发布并使用",
      {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        inputPlaceholder: params?.layoutName,
        inputPattern: /.+/,
        inputErrorMessage: "名称不能为空",
      }
    );
    if (value) {
      params.layoutName = value;
    }
    const message = buildParamsLayout(params);
    await setUserConfigLayoutInfo(message);
    store.commit("UPDATE_LAYOUT_CONFIG", params);
    await router?.replace("/").then(() => {
      location.reload();
    });
  } catch (e) {
    console.log(e);
    ElMessage.warning("发布失败");
  }
}
// init
const initLayout = ref(null);
onMounted(() => {
  initLayout.value = store.state?.layoutConfig;
  nowConfig.value = store.state?.layoutConfig;
  layoutId.value = initLayout.value?.id;
});
</script>

<style scoped lang="less">
@headerH: 60px;
.dynamicConfig--warp {
  width: 100vw;
  height: 100vh;
  background: url(@/assets/images/layout-bg-1.png) no-repeat;
  background-size: 100%;
}
.dynamicConfig--warp__header {
  box-sizing: border-box;
  height: @headerH;
  text-align: left;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
  background: url(~@/assets/images/config/header.png) no-repeat;
  background-size: 100% 90px;
  .header--warp {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .title {
      font-family: YOUSHEBIAOTIHEI;
      font-size: 24px;
    }
    :deep(.select--box) {
      margin-left: 20px;

      .el-input__wrapper {
        background-color: transparent;
        border-radius: 18px;
        border: 1px solid var(--el-color-primary);
        box-shadow: 0 0 0 0 var(--el-color-primary);
      }

      .el-input__inner {
        color: #fff;
      }
    }
  }
  .tools--box {
    margin-left: auto;
  }
}
.aside-list {
  height: calc(100vh - @headerH);
  overflow-x: hidden;
  overflow-y: scroll;
  background: #7fc2e2;

  &::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }

  &::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: rgba(206, 205, 205, 0.75);
  }

  &::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.15);
  }

  .template-item {
    width: 260px;
    margin: 0 auto 10px;
    height: 60px;
    border-radius: 8px;
    background: #2d7d96;
  }
}
.dynamicConfig--warp__main {
  padding: 0 !important;
  overflow: hidden;
}
</style>
<style lang="less">
.preview--dialog {
  height: 100vh;
  box-sizing: border-box;
  margin: 0;
  position: relative;
  top: 0;
  left: 0;
  .el-dialog__header {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 9999;
    .el-dialog__headerbtn {
      color: #fff;
      font-size: 24px;
      font-weight: 900;
    }
  }
  .el-dialog__body {
    padding: 0;
  }
}
</style>
