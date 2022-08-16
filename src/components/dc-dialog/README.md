## install
先安装以下依赖
### vue3
`npm install vue-final-modal@next`

### vue2
`npm install vue-final-modal@latest`

然后将组件复制进项目 直接使用

## 基础示例
```vue
<template>
  <div>
    <CustomModal
        v-model="show"
        :showFoot="true"
        title="title header"
        content-class="" 添加新的类名
        @before-close="handleBeforeClose">
      <template #title>
        使用slot自定义title
      </template>  
      <template #foot>
        使用slot自定义foot
      </template>
      <template #before-foot-operate>
        底部再原有按钮之前添加按钮， 需要showFoot=true， showFoot 优先于slot foot
      </template>
    </CustomModal>
    <button @click="showDialog">Open modal {{ show1 }}</button>
  </div>
</template>

<script>
import CustomModal from './components/CustomModal'
export default {
  name: 'dc-dialog-demo',
  components: { CustomModal, testEvent },
  data: () => ({
    show1: false,
  }),
  methods: {
    showDialog() {
      this.show1 = true
    },
    cancel() {
      console.log('cancel');
    },
    handleBeforeClose(event) {
      // event.stop() 可以阻止弹窗关闭
    }
  }
}
</script>

<style>
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
</style>

```

## event

- clickOutside
- beforeOpen
- opened
- beforeClose
- closed
- cancel
- button-submit
- button-info
- button-cancel
- fullScreen
窗口全屏会触发全局resize事件，

## props透传参数 会传递带内部的vue-final-modal组件
```vue

<template>
  <vue-final-modal
    :name="null"
    :value="false"
    :ssr="true"
    :classes="false"
    overlay-class=""
    content-class=""
    styles=""
    overlay-style=""
    content-style=""
    :lock-scroll="true"
    :hide-overlay="false"
    :click-to-close="true"
    :esc-to-close="false"
    :prevent-click="false"
    :attach="false"
    transition="vfm"
    overlay-transition="vfm"
    :z-index-auto="true"
    :z-index-base="1000"
    :z-index="false"
    :focus-retain="true"
    :focus-trap="false"
    :fit-parent="true"
    :drag="false"
    drag-selector=""
    :keep-changed-style="false"
    :resize="false"
    :resize-directions="['t', 'tr', 'r', 'br', 'b', 'bl', 'l', 'tl']"
    :min-width="0"
    :min-height="0"
    :max-width="Infinity"
    :max-height="Infinity"
  >

  </vue-final-modal>
</template>
```

### 默认值
```vue 
 {
        name: null,
        ssr: false,
        classes: '',
        'content-class': contentClass,
        'overlay-class': '',
        styles: {},
        'content-style': {},
        'overlay-style': {},
        'transition': 'vfm',
        'overlay-transition': 'vfm',
        'lock-scroll': true,
        'hide-overlay': false,
        'click-to-close': true,
        'esc-to-close': false,
        'prevent-click': false,
        attach: false,
        'z-index-auto': true,
        'z-index-base': 1000,
        'z-index': false,
        'focus-trap': false,
        drag: true,
        'fit-parent': false,
        'drag-selector': '',
        'keep-changed-style': false,
        resize: false,
        'resize-directions': [],
        'min-width': 0,
        'min-height': 0,
        'max-width': 0,
        'max-height': 0
}
```
