<template>
  <VueFinalModal
    v-model="bindValue"
    v-bind="bindAttributes"
    @cancel="$emit('cancel', $event)"
    @click-outside="$emit('click-outside', $event)"
    @before-open="$emit('before-open', $event)"
    @opened="$emit('opened', $event)"
    @before-close="$emit('before-close', $event)"
    @closed="$emit('closed', $event)"
  >
    <div class="dc-bg-modal-header">
      <div class="dc-bg-modal-header-title">
        <slot name="title">
          {{ title }}
        </slot>
      </div>
      <div class="dc-bg-modal-header-operate">
        <div
          class="icon-bar hvr-pulse-grow"
          v-if="!fullScreen"
          @click="fullScreen = true"
        >
          <img src="./1.png" alt="" />
        </div>
        <div
          class="icon-bar hvr-pulse-grow"
          v-if="fullScreen"
          @click="fullScreen = false"
        >
          <img src="./3.png" alt="" />
        </div>
        <div class="icon-bar hvr-pulse-grow" @click="handleClose">
          <img src="./2.png" alt="" />
        </div>
      </div>
    </div>

    <div
      class="dc-bg-modal-content"
      :class="{ 'padding-bottom': !$slots.foot && !showFoot }"
    >
      <slot></slot>
    </div>

    <div class="dc-bg-modal-foot" v-if="$slots.foot || showFoot">
      <div v-if="showFoot" class="dc-bg-modal-foot-operate">
        <slot name="before-foot-operate"></slot>
        <div
          class="button submit"
          @click="$emit('button-submit')"
          v-if="showFoot && showSubmit"
        >
          {{ submitText }}
        </div>
        <div
          class="button info"
          @click="$emit('button-info')"
          v-if="showFoot && showInfo"
        >
          {{ infoText }}
        </div>
        <div
          class="button cancel"
          @click="$emit('button-cancel')"
          v-if="showFoot && showCancel"
        >
          {{ cancelText }}
        </div>
        <slot name="after-foot-operate"></slot>
      </div>
      <template v-else>
        <slot name="foot"></slot>
      </template>
    </div>
  </VueFinalModal>
</template>

<script>
import { VueFinalModal } from "vue-final-modal";

function omit(obj, keys) {
  const filterKeys = Object.keys(obj).filter((key) => keys.includes(key));

  const res = filterKeys.reduce((tol, cur) => {
    tol[cur] = obj[cur];
  }, {});

  return res;
}

export default {
  name: "dc-dialog-demo",
  components: {
    VueFinalModal,
  },
  props: {
    value: Boolean,
    mode: {
      type: String,
      default: "default", // mini  medium
    },
    title: {
      type: String,
      default: "",
    },
    showFoot: {
      type: Boolean,
      default: false,
    },
    showSubmit: {
      type: Boolean,
      default: true,
    },
    submitText: {
      type: String,
      default: "提交",
    },
    showInfo: {
      type: Boolean,
      default: false,
    },
    infoText: {
      type: String,
      default: "提交",
    },
    showCancel: {
      type: Boolean,
      default: true,
    },
    cancelText: {
      type: String,
      default: "取消",
    },
  },
  data() {
    return {
      fullScreen: false,
    };
  },
  computed: {
    bindAttributes() {
      const contentClass = [
        "dc-bg-center-wrap",
        this.mode,
        { "full-screen": this.fullScreen },
        this.$attrs["content-class"] || "",
      ];
      const defaultValue = {
        name: null,
        ssr: false,
        classes: "",
        "content-class": contentClass,
        "overlay-class": "",
        styles: {},
        "content-style": {},
        "overlay-style": {},
        transition: "vfm",
        "overlay-transition": "vfm",
        "lock-scroll": true,
        "hide-overlay": false,
        "click-to-close": true,
        "esc-to-close": false,
        "prevent-click": false,
        attach: false,
        "z-index-auto": true,
        "z-index-base": 1000,
        "z-index": false,
        "focus-trap": false,
        drag: true,
        "fit-parent": false,
        "drag-selector": "",
        "keep-changed-style": false,
        resize: false,
        "resize-directions": [],
        "min-width": 0,
        "min-height": 0,
        "max-width": 0,
        "max-height": 0,
        ...omit(this.$attrs || {}, ["content-class"]),
      };
      return defaultValue;
    },
    bindValue: {
      get() {
        return this.value;
      },
      set(v) {
        this.$emit("input", v);
        if (!v) {
          this.$nextTick(() => {
            this.fullScreen = false;
          });
        }
      },
    },
  },
  watch: {
    fullScreen(v) {
      if (v) {
        window.addEventListener("keyup", this.onEscapeKeyUp);
      } else {
        window.removeEventListener("keyup", this.onEscapeKeyUp);
      }
      this.$emit("fullScreen", this.fullScreen);
      const myEvent = new Event("resize");
      window.dispatchEvent(myEvent);
    },
  },
  unmounted() {
    window.removeEventListener("keyup", this.onEscapeKeyUp);
  },
  methods: {
    onEscapeKeyUp(event) {
      if (event.which === 27) {
        this.fullScreen = false;
        this.$emit("fullScreen", this.fullScreen);
      }
    },
    handleClose() {
      this.bindValue = false;
      this.$emit("close");
    },
  },
};
</script>

<style lang="less">
.dc-bg-center-wrap {
  width: 85%;
  height: 85%;
  display: flex;
  justify-content: start !important;
  flex-direction: column;
  align-items: center;
  position: relative;
  background: #fff;

  &.medium {
    width: 65%;
    height: 65%;
  }

  &.mini {
    width: 50%;
    height: 50%;
  }

  &.full-screen {
    width: 100vw;
    height: 100vh;
  }

  .dc-bg-modal-header {
    height: 84px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 40px;
    box-sizing: border-box;
    flex-shrink: 0;

    .dc-bg-modal-header-title {
      color: #000;
      font-size: 32px;
      font-weight: 700;
    }

    .dc-bg-modal-header-operate {
      display: flex;
      justify-content: center;
      align-items: center;

      .icon-bar {
        width: 32px;
        height: 32px;

        & + .icon-bar {
          margin-left: 24px;
        }

        img {
          width: 100%;
          height: 100%;
        }
      }
    }

    .close-icon {
      top: -25px;
      right: 16px;
      width: 25px;
      height: 25px;
      background: rgba(0, 75, 213, 0.95);
      cursor: pointer;

      i {
        &:before {
          content: "";
          position: absolute;
          width: 2px;
          height: 25px;
          background: #fff;
          left: 13px;
          top: -13px;
          transform: rotate(45deg);
        }

        &:after {
          content: "";
          position: absolute;
          width: 2px;
          height: 25px;
          background: #fff;
          left: 13px;
          top: -13px;
          transform: rotate(-45deg);
        }
      }
    }
  }

  .dc-bg-modal-content {
    width: 100%;
    box-sizing: border-box;
    height: 100%;
    overflow: auto;
    padding: 0 42px 0 40px;

    &.padding-bottom {
      padding-bottom: 40px;
    }

    &::-webkit-scrollbar {
      width: 7px;
    }

    &::-webkit-scrollbar-track {
      background-color: #f5f5f5;
      -webkit-box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.1);
      border-radius: 5px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: rgba(0, 0, 0, 0.2);
      border-radius: 5px;
    }

    &::-webkit-scrollbar-button {
      background-color: #eee;
      display: none;
    }

    &::-webkit-scrollbar-corner {
      background-color: black;
    }
  }

  .dc-bg-modal-foot {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 40px;
    box-sizing: border-box;
    flex-shrink: 1;
    color: #000;
    font-size: 32px;
    font-weight: 700;

    .dc-bg-modal-foot-operate {
      .button {
        display: inline-block;
        line-height: 68px;
        padding: 0 10px;
        color: #ffffff;
        min-width: 220px;
        border-radius: 5px;
        text-align: center;
        cursor: pointer;
        font-size: 28px;
        font-weight: normal;

        &:hover {
          color: #eeeeee;
        }

        & + .button {
          margin-left: 24px;
        }

        &.submit {
          background: #ffc500;
        }

        &.info {
          background: #4d8cff;
        }

        &.cancel {
          background: #b9b9b9;
        }
      }
    }
  }
}

.vfm__container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.vfm__content {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Pulse Grow */
@-webkit-keyframes hvr-pulse-grow {
  to {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
}

@keyframes hvr-pulse-grow {
  to {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
}

.hvr-pulse-grow {
  display: inline-block;
  vertical-align: middle;
  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  box-shadow: 0 0 1px rgba(0, 0, 0, 0);
  cursor: pointer;
}

.hvr-pulse-grow:hover,
.hvr-pulse-grow:focus,
.hvr-pulse-grow:active {
  -webkit-animation-name: hvr-pulse-grow;
  animation-name: hvr-pulse-grow;
  -webkit-animation-duration: 0.6s;
  animation-duration: 0.6s;
  -webkit-animation-timing-function: linear;
  animation-timing-function: linear;
  -webkit-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
  -webkit-animation-direction: alternate;
  animation-direction: alternate;
}
</style>
