<!--****************************************
 * 工作成效
 *
 * founder: wangwg
 * Date:  17 2022/10/24
 *****************************************-->
<template>
  <div class="work-effect" v-if="list && list.length > 0">
    <div class="list-wrap" v-for="(item, index) in list" :key="index">
      <el-tooltip
        :content="item.effectTypeName"
        effect="dark"
        placement="top-start"
      >
        <p class="content" :title="item.effectTypeName">
          {{ item.effectTypeName }}
        </p>
      </el-tooltip>
      <span class="unit">
        <strong :style="'color:' + item.color">{{ item.effectValue }}</strong>
        {{ item.effectUnitName }}
      </span>
    </div>
  </div>
</template>

<script setup>
/**
 工作成效
 **/
import "element-plus/es/components/tooltip/style/css";
import { ElTooltip } from "element-plus";
import { ref, computed, watch } from "vue";
import { useStore } from "vuex";
import { getWorkEffectList } from "@/apis/home";

// 组件注入数据模型
const listModel = ref(null);

// 事件类型的翻译映射
const unitMapper = {
  // 清理非法占用河道岸线
  CX011: { unitName: "公里", color: "#ffdc00" },
  // 清理非法采砂点
  CX021: { unitName: "个", color: "#ec4d94" },
  // 清理非法采砂石量
  CX022: { unitName: "立方米", color: "#00d2f3" },
  // 打击非法采砂船只
  CX023: { unitName: "艏", color: "#d57e1c" },
  // 清理建筑和生活垃圾
  CX031: { unitName: "吨", color: "#08b14d" },
  // 拆除违法建筑
  CX041: { unitName: "平方米", color: "#1293ee" },
  // 清除围堤
  CX051: { unitName: "公里", color: "#ffdc00" },
  // 清除非法林地
  CX052: { unitName: "平方米", color: "#1293ee" },
  // 清除非法网箱养殖
  CX053: { unitName: "平方米", color: "#1293ee" },
  // 清除违规种植大棚
  CX054: { unitName: "平方米", color: "#1293ee" },
  // 清除水利工程
  illegalProject: { unitName: "处", color: "#1293ee" },
};

// 获取工作成效的数据
function getWorkEffectData(dateRange) {
  if (!dateRange) return;
  const params = {
    ...dateRange,
  };
  // 获取工作成效的数据列表
  getWorkEffectList(params).then((res) => {
    // 筛选数据
    if (!res?.eventDisposalEffectStatVOList) return;
    listModel.value = res?.eventDisposalEffectStatVOList.map((item) => {
      // 获取时间的单位
      item.effectUnitName = unitMapper[item.effectType]?.unitName;
      // 获取事件数量的字体颜色
      item.color = unitMapper[item.effectType]?.color;
      return item;
    });
  });
}

// 工作成效的列表数据
const list = computed(() => {
  if (!listModel.value) {
    return [];
  }
  return listModel.value;
});

const store = useStore();

// 监听驾驶舱的日期间隔
watch(
  () => store?.state?.dateRange,
  (newVal, oldVal) => {
    const val = newVal || oldVal;
    getWorkEffectData(val);
  },
  {
    immediate: true,
    deep: true,
  }
);
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
