<template>
  <div class="mask">
    <div class="dialog">
      <div class="main">
        <div class="head">
          <div class="title">{{ title }}</div>
        </div>
        <div class="body">
          <slot />
        </div>
      </div>
      <div v-if="$slots.footer" class="dialog-footer">
        <slot name="footer" />
      </div>
      <div class="close" @click="closeDialog">
        <i class="icon-close" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  inject: ['closeDialog'],
  props: {
    // visible: {
    //   type: Boolean,
    //   default: false
    // },
    title: {
      type: String,
      default: '',
    },
  },
  mounted() {
    document.body.appendChild(this.$el)
    // window.closeDialog = function() {
    //   document.body.removeChild(mask)
    // }
    // const html = `
    //   <div v-if="visible" class="dialog">
    //     <div class="main">
    //       <div class="head">
    //         <div class="title">${this.title}</div>
    //       </div>
    //       <div class="body">
    //         <slot />
    //       </div>
    //     </div>
    //     <div class="footer">
    //       <slot name="footer" />
    //     </div>
    //     <div class="close" onclick="closeDialog()">
    //       <i class="icon-close"></i>
    //     </div>
    //   </div>
    // `
    // const mask = document.createElement('div')
    // mask.className = 'mask'
    // mask.innerHTML = html
    // document.body.appendChild(mask)
  },
  beforeUnmount() {
    if (this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el)
    }
  },
}
</script>

<style lang="less" scoped>
.mask {
  // display: none;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(13, 18, 21, 0.76);
  z-index: 100;
  .dialog {
    // background: linear-gradient(#39f4f7, #39f4f7) left top, linear-gradient(#39f4f7, #39f4f7) left top;
    // background-repeat: no-repeat;
    // background-size:  2px 258px, 289px 2px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
    &::before {
      content: '';
      position: absolute;
      top: -9px;
      left: -9px;
      width: 289px;
      height: 258px;
      border-width: 2px;
      border-style: solid;
      border-color: #39f4f7 transparent transparent #39f4f7;
      // background: linear-gradient(#39f4f7, #39f4f7) left top, linear-gradient(#39f4f7, #39f4f7) left top;
      // background-size:  2px 289px, 2px 258px;
    }
    .main {
      min-width: 289px;
      min-height: 289px;
      padding: 10px;
      background-color: rgba(0, 86, 111, 0.75);
      position: relative;
      .head {
        .title {
          display: inline-block;
          padding: 7px 9px;
          background-color: #39f4f7;
          color: #000000;
          font-size: 18px;
          font-weight: bold;
        }
      }
      .body {
        padding: 10px;
      }
    }
    .dialog-footer {
      padding: 20px 30px;
      background-color: rgba(0, 0, 0, 0.29);
      border-top: solid 1px #468497;
    }
    .close {
      position: absolute;
      top: 20px;
      right: 20px;
      i {
        color: #39f4f7;
        font-size: 12px;
        cursor: pointer;
      }
    }
  }
}
</style>
