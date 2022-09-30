<template>
  <div class="cockpit">
    <div class="header_box">
      <slot name="header" />
    </div>
    <div class="side left_side" :class="{ closeWL: leftSideViewClose }">
      <div class="btn btnL" @click="switchSideL">
        <div class="triangle"></div>
      </div>
      <div class="side-content">
        <slot name="left" />
      </div>
    </div>
    <div style="width: 100vw; height: 100vh">
      <slot name="map"></slot>
    </div>
    <div class="side right_side" :class="{ closeWR: rightSideViewClose }">
      <div class="btn btnR" @click="switchSideR">
        <div class="triangle"></div>
      </div>
      <div class="side-content">
        <slot name="right" />
      </div>
    </div>
    <div class="bottom_view">
      <!-- <div @click="switchBottom" class="btn">X</div> -->
      <div class="bottom_view_content" :class="{ closeHB: bottomViewClose }">
        <slot name="bottom" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const leftSideViewClose = computed(() => {
  return store.state.layout?.left === "close" || false;
});
const rightSideViewClose = computed(() => {
  return store.state.layout?.right === "close" || false;
});
const bottomViewClose = computed(() => {
  return store.state.layout?.bottom === "close" || false;
});
const switchSideL = () => {
  store.commit("UPDATE_LAYOUT", {
    left: store.state.layout?.left === "close" ? "open" : "close",
  });
};
const switchSideR = () => {
  store.commit("UPDATE_LAYOUT", {
    right: store.state.layout?.right === "close" ? "open" : "close",
  });
};
// const switchBottom = () => {
//   store.commit("UPDATE_LAYOUT", {
//     bottom: store.state.layout?.bottom === "close" ? "open" : "close",
//   });
// };
</script>

<style scoped lang="less">
@topH: 75px;
@sideW: 500px;
@bottomH: 256px;
.cockpit {
  width: 100vw;
  height: 100vh;
  position: relative;
  top: 0;
  left: 0;
  overflow: hidden;
  background: url(@/assets/images/layout-bg-1.png);
  background-size: 100%;

  .header_box {
    width: 100vw;
    height: @topH;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 999;
  }
  .side {
    // width: @sideW;
    // height: calc(100vh - @topH);
    width: @sideW;
    top: 0;
    padding-top: @topH;
    position: absolute;
    z-index: 100;
    bottom: 0;
    transition: transform 0.5s ease;

    .side-content {
      width: @sideW;
      height: 100%;
    }

    .btn {
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      width: 40px;
      height: 100px;
      background: #2c3e50;
      position: absolute;
      bottom: 0;
      top: 0;
      margin: auto;
      line-height: 100px;
      cursor: pointer;
      .triangle {
        position: relative;
        border: 10px solid transparent;
        border-left-color: #fff;
        transition: all 0.1s;
      }
    }

    .btnL {
      right: -40px;
      background: url(@/assets/images/silder_l.png) no-repeat;
      background-size: 100% 100%;
      .triangle {
        left: -4px;
        transform: rotate(180deg);
      }
    }
    .btnR {
      left: -40px;
      background: url(@/assets/images/silder_r.png) no-repeat;
      background-size: 100% 100%;
      .triangle {
        left: 6px;
        transform: rotate(0deg);
      }
    }
  }
  .left_side {
    left: 0;
    background: url(@/assets/images/layout-left-bg.png);
    background-size: 100%;
  }
  .right_side {
    right: 0;
    background: url(@/assets/images/layout-right-bg.png);
    background-size: 100%;
    display: flex;
    justify-content: flex-end;
  }
  .bottom_view {
    // width: calc(100vw - 2 * @sideW);
    width: 100%;
    transition: transform 0.5s ease;
    height: @bottomH;
    position: absolute;
    z-index: 1;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 0 auto;
    // background: rgba(72, 108, 8, 0.71);
    // background: url(@/assets/images/layout-bottom-bg.png) no-repeat center bottom;
    .btn {
      width: 100px;
      height: 40px;
      background: #2c3e50;
      color: #fff;
      position: absolute;
      top: -40px;
      left: 0;
      right: 0;
      margin: 0 auto;
    }
  }
  .bottom_view_content {
    width: 100%;
    height: 100%;
    transition: transform 0.5s ease;
  }
  .closeWL {
    transform: translateX(-@sideW);
    .btnL .triangle {
      left: 6px;
      transform: rotate(0deg);
    }
  }
  .closeWR {
    transform: translateX(@sideW);
    .btnR .triangle {
      left: -10px;
      transform: rotate(180deg);
    }
  }
  .closeHB {
    transform: translateY(calc(@bottomH - 38px));
  }
}
</style>
