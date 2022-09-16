<!--------------------------------------------
 ¦ 文件组件
 ¦
 ¦ 文件组件能通过后缀显示相关图标, 并提供下载
 ¦ 功能
 ¦
 ¦ @Author: 大风
 ¦ @Date: 2022-08-22 09:52:32
 ¦ @Dependencies: file-saver
 ¦------------------------------------------->

<template>
  <div :class="['file-wrapper', `file-name-align-${align}`]" @click="onClick">
    <img class="file-icon" :src="icon" :alt="fileName" />
    <p class="file-name">{{ fileName }}</p>
  </div>
</template>

<script>
import { computed } from "vue";
import { getFileIcon } from "./file";

export default {
  name: "File",
  props: {
    /**
     * 文件资源地址
     * @type {string}
     */
    src: {
      type: String,
      required: true,
    },
    /**
     * 文件名
     * 如果未提供文件名则显示资源路径中文件名(带后缀)
     * @type {string}
     */
    name: {
      type: String,
    },
    /**
     * 文件名排列
     * @type {string<"top"|"bottom"|"left"|"right">}
     */
    align: {
      type: String,
      default: "right",
    },
  },
  setup(props) {
    const icon = computed(() => getFileIcon(props.src));
    const fileName = computed(() => props.name ?? props.src.split("/").at(-1));
    const onClick = () => {
      let a = document.createElement("a");
      a.setAttribute("href", props.src);
      a.setAttribute("target", "_blank");
      a.click();
      a = null;
    };
    return {
      icon,
      fileName,
      onClick,
    };
  },
};
</script>

<style lang="less" scoped>
.file-wrapper {
  display: flex;
  cursor: pointer;
}

.file-wrapper.file-name-align-left,
.file-wrapper.file-name-align-right {
  justify-content: center;
  .file-name {
    display: flex;
    align-items: center;
  }
}

.file-wrapper.file-name-align-left {
  flex-direction: row-reverse;
  .file-name {
    padding-right: 14px;
  }
}

.file-wrapper.file-name-align-right {
  .file-name {
    padding-left: 14px;
  }
}

.file-wrapper.file-name-align-top,
.file-wrapper.file-name-align-bottom {
  align-items: center;
}

.file-wrapper.file-name-align-top {
  flex-direction: column-reverse;
}

.file-wrapper.file-name-align-bottom {
  flex-direction: column;
}

.file-name {
  color: #818e9b;
  font-size: 14px;
}

.file-icon {
  width: 47px;
  height: 50px;
  display: block;
}
</style>
