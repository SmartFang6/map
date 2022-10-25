<!-- 视频弹框 -->
<template>
  <div
    class="video"
    v-loading="loading"
    element-loading-background="rgba(40, 44, 60, 0.8)"
  >
    <div class="title">{{ vmName ?? "test" }}</div>
    <div v-if="hasSignal" id="container" ref="container" controls />
    <div v-else class="lost-box">暂无信号</div>
  </div>
</template>

<script setup>
import { queryVideoUrlList, controlVideo } from "@/apis/dialog";
import { ref, onUnmounted, onMounted, nextTick } from "vue";
import { ElMessage } from "element-plus";
const props = defineProps({
  info: {
    type: Object,
    default() {
      return {};
    },
  },
});
const loading = ref(false);
onMounted(() => {
  let { vmName: name, vmCode: code } = props.info;
  vmName.value = name;
  vmCode.value = code;
  console.log(code, "code");
  destroy();
  nextTick(() => {
    play(vmCode.value);
  });
  window.downcallbacK = downcallbacK;
  window.upcallbacK = upcallbacK;
});
onUnmounted(() => {
  destroy();
  closePendingInterface();
});
const container = ref(null);
const han = () => {
  container.value.children[3].style.display = "block";
};
const vmName = ref("");
const vmCode = ref("");
// 云台控制鼠标按压回调 云台调用接口
const downcallbacK = (type) => {
  controlVideo({
    code: vmCode.value,
    command: type,
    speed: 15,
  }).catch((err) => {
    console.log(err);
  });
};
// 云台控制鼠标松开回调 云台调用接口
const upcallbacK = () => {
  controlVideo({
    code: vmCode.value,
    command: "stop",
    speed: 15,
  }).catch((err) => {
    console.log(err);
  });
};
const player = ref(null);
// 初始化
const create = () => {
  player.value = new window.EasyWasmPlayer(
    Object.assign({
      container: container.value, // 播放video
      videoBuffer: 0.2, // 缓存时长
      isResize: false,
      text: "",
      loadingText: "加载中",
      debug: true,
      showBandwidth: true, // 显示网速
      operateBtns: {
        fullscreen: true,
        screenshot: true,
        play: true,
        audio: true,
      },
      vod: false, // 点播
      forceNoOffscreen: true, // 离屏渲染
      isNotMute: false,
      cameraid: vmCode.value,
    })
  );
};
// 是否有信号
const hasSignal = ref(true);
// 关闭弹窗 取消正在请求中的接口
const controller = new AbortController();
const closePendingInterface = () => {
  // 取消请求
  controller.abort();
};
// 播
const play = (Code) => {
  loading.value = true;
  queryVideoUrlList(
    { codeList: Code },
    {
      signal: controller.signal,
    }
  )
    .then((data) => {
      console.log(data, "data");
      return data;
    })
    .then((message) => {
      console.log(message[Code]);
      if (!message[Code].flv) {
        ElMessage.error("暂无信号");
        hasSignal.value = false;
        destroy();
      } else {
        hasSignal.value = true;
        create();
        player.value.on("load", () => {
          player.value.play(message[Code].flv);
        });
        han();
      }
      loading.value = false;
      console.log(message, message[Code].flv);
    });
};
// 暂停
// eslint-disable-next-line no-unused-vars
const pause = () => {
  player.value.pause();
};
// 停止播放销毁
const destroy = () => {
  if (player.value) {
    player.value.destroy();
  }
};
</script>
<style lang="less" scoped>
.video {
  width: 100%;
}
.title {
  margin-bottom: 12px;
}
#container {
  width: 100%;
  // width: calc(100% - 30px);
  box-sizing: border-box;
  height: 62vh;
  // margin-left: 13px;
  > div:nth-of-type(3) {
    display: none;
  }
}
.lost-box {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 360px;
  color: #fff;
  font-size: 20px;
}
</style>
