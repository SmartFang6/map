<!--****************************************
 * 工作成效
 *
 * founder: wangwg
 * Date:  17 2022/10/24
 *****************************************-->
<template>
  <div class="work-effect" v-if="list && list.length > 0">
    <div class="list-wrap" v-for="(item, index) in list" :key="index">
      <el-tooltip :content="item.cont" effect="dark" placement="top-start">
        <p class="content">{{ item.cont }}</p>
      </el-tooltip>
      <span class="unit">
        <strong>{{ item.num }}</strong>
        {{ item.unit }}
      </span>
    </div>
  </div>
</template>

<script setup>
import "element-plus/es/components/tooltip/style/css";
import { ElTooltip } from "element-plus";
import { ref, reactive, toRefs } from "vue";
import { useStore } from "vuex";

const store = useStore();

// 左侧注入数据
const leftData = ref(null);

console.log("person", store, leftData);

// 组件的数据模型
const model = reactive({
  list: [
    {
      id: 1001,
      cont: "清理非法占用河道岸线",
      num: "12",
      unit: "公里",
    },
    {
      id: 1001,
      cont: "清理非法采砂点",
      num: "27",
      unit: "个",
    },
    {
      id: 1001,
      cont: "清理非法采砂石量清理非法占用河道岸线清理非法占用河道岸线清理非法占用河道岸线清理非法占用河道岸线",
      num: "234",
      unit: "立方米",
    },
    {
      id: 1001,
      cont: "清理非法占用河道岸线",
      num: "31",
      unit: "公里",
    },
    {
      id: 1001,
      cont: "清理非法占用河道岸线",
      num: "17",
      unit: "公里",
    },
    {
      id: 1001,
      cont: "清理非法占用河道岸线",
      num: "17",
      unit: "公里",
    },
    {
      id: 1001,
      cont: "清理非法占用河道岸线",
      num: "17",
      unit: "公里",
    },
    {
      id: 1001,
      cont: "清理非法占用河道岸线",
      num: "17",
      unit: "公里",
    },
  ],
});

const { list } = toRefs(model);
</script>

<style lang="less" scoped>
.work-effect {
  width: 100%;
  height: 254px;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  padding: 8px 8px 0 12px;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: auto;
  &::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }

  &::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 4px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: rgba(206, 205, 205, 0.75);
  }

  &::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    background: rgba(255, 255, 255, 0.15);
  }

  .list-wrap {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: MicrosoftYaHei;
    width: 216px;
    height: 54px;
    background: url(@/assets/images/custom-perform-bg.png) no-repeat;
    background-size: cover;
    margin-bottom: 8px;

    .icon-diamond {
      width: 18px;
      height: 17px;
      margin-left: 10px;
      color: #fff;
      background: url(@/assets/images/icon-diamond.png) no-repeat;
      background-size: cover;
    }

    .content {
      width: 100%;
      padding: 0 10px;
      font-size: 16px;
      text-align: center;
      color: #ffffff;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .unit {
      font-size: 14px;
      white-space: nowrap;
      color: #7fc2e2;
      & > strong {
        font-size: 18px;
        font-weight: 600;
        color: #60d0ef;
      }
    }
  }

  .list-wrap:nth-child(2n) {
    margin-left: 20px;
  }
}
</style>
