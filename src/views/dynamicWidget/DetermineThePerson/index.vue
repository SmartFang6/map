<!--****************************************
 * 事件定人
 *
 * founder: wangwg
 * Date:  10 2022/10/24
 *****************************************-->
<template>
  <div class="person-container">
    <div class="summary-wrap" v-if="dept && dept.length > 0">
      <li class="summary-item" v-for="field in dept" :key="field?.id">
        <span>{{ field.num + "个" }}</span>
        <span>{{ field.content }}</span>
      </li>
    </div>
    <div class="list-content">
      <div class="table-header">
        <div>问题名称</div>
        <div>责任单位</div>
        <div>责任乡镇</div>
        <div>责任人</div>
        <div>状态</div>
      </div>
      <div class="table-body" v-if="list && list.length > 0">
        <SeamlessScroll :list="list">
          <div>
            <div
              v-for="(item, index) in list"
              :key="index"
              :class="{ 'table-row': true, stripe: index % 2 !== 0 }"
              :data-id="index"
            >
              <el-tooltip
                :content="item.problem"
                effect="dark"
                placement="top-start"
              >
                <div :title="item.problem">{{ item.problem }}</div>
              </el-tooltip>
              <el-tooltip
                :content="item.unit"
                effect="dark"
                placement="top-start"
              >
                <div :title="item.unit">{{ item.unit }}</div>
              </el-tooltip>
              <el-tooltip
                :content="item.village"
                effect="dark"
                placement="top-start"
              >
                <div :title="item.village">{{ item.village }}</div>
              </el-tooltip>
              <el-tooltip
                :content="item.person"
                effect="dark"
                placement="top-start"
              >
                <div :title="item.person">{{ item.person }}</div>
              </el-tooltip>
              <el-tooltip
                :content="item.status"
                effect="dark"
                placement="top-start"
              >
                <div :title="item.status">{{ item.status }}</div>
              </el-tooltip>
            </div>
          </div>
        </SeamlessScroll>
      </div>
      <el-empty
        v-else
        description="暂无数据"
        :image-size="80"
        class="dc-empty"
      />
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
  dept: [
    {
      id: 1001,
      num: 8,
      content: "责任单位",
    },
    {
      id: 1002,
      num: 235,
      content: "责任乡镇",
    },
  ],
  list: [
    {
      id: 2001,
      problem: "关于做好基层治理“一件事”集成改革",
      unit: "江南水利局",
      village: "灵溪镇",
      person: "陈皮四",
      status: "未处理",
    },
    {
      id: 2002,
      problem: "关于做好基层治理“一件事”集成改革",
      unit: "江南水利局",
      village: "灵溪镇",
      person: "陈皮四",
      status: "未处理",
    },
    {
      id: 2003,
      problem: "关于做好基层治理“一件事”集成改革",
      unit: "江南水利局",
      village: "灵溪镇",
      person: "陈皮四",
      status: "未处理",
    },
    {
      id: 2004,
      problem: "关于做好基层治理“一件事”集成改革",
      unit: "江南水利局",
      village: "灵溪镇",
      person: "陈皮四",
      status: "未处理",
    },
    {
      id: 2005,
      problem: "关于做好基层治理“一件事”集成改革",
      unit: "江南水利局",
      village: "灵溪镇",
      person: "陈皮四",
      status: "未处理",
    },
    {
      id: 2006,
      problem: "关于做好基层治理“一件事”集成改革",
      unit: "江南水利局",
      village: "灵溪镇",
      person: "陈皮四",
      status: "未处理",
    },
    {
      id: 2007,
      problem: "关于做好基层治理“一件事”集成改革",
      unit: "江南水利局",
      village: "灵溪镇",
      person: "陈皮四",
      status: "未处理",
    },
    {
      id: 2008,
      problem: "关于做好基层治理“一件事”集成改革",
      unit: "江南水利局",
      village: "灵溪镇",
      person: "陈皮四",
      status: "未处理",
    },
  ],
});

const { dept, list } = toRefs(model);
</script>

<style lang="less" scoped>
.person-container {
  width: 100%;
  height: 100%;
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  padding-top: 2px;

  .summary-wrap {
    width: 100%;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 12px;
    .summary-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-family: MicrosoftYaHei;
      width: 212px;
      height: 60px;
      margin-left: 24px;
      background: url(@/assets/images/custom-perform-bg.png) no-repeat;
      background-size: 100% 100%;
      color: #ffffff;
    }
    .summary-item:first-child {
      margin-left: 0;
    }
  }

  .list-content {
    width: 100%;
    height: 215px;
    background-color: rgba(1, 2, 5, 0.1);
    box-shadow: inset 0 2px 1px 0 #002480;
    box-sizing: border-box;
    font-size: 16px;
    font-family: MicrosoftYaHei;
    color: #7ed5f1;
    padding: 0 15px;
    margin-left: 8px;
    overflow: hidden;
    .table-header {
      height: 46px;
      display: flex;
      align-items: center;
      justify-content: space-around;
    }
    .table-body {
      height: 168px;
      width: 100%;
      overflow: hidden;
    }
    .table-row {
      display: flex;
      height: 32px;
      margin-top: 2px;
      align-items: center;
      justify-content: space-around;
      color: #ffffff;
      &.stripe {
        background-color: rgba(3, 55, 138, 0.2);
      }
    }
    .table-row:first-child {
      margin: 0;
    }
    .table-header > div,
    .table-row > div {
      text-align: left;
      padding-left: 10px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      display: inline-block;
    }
    .table-header > div:nth-child(1),
    .table-row > div:nth-child(1) {
      width: 148px;
      padding-left: 0;
    }
    .table-header > div:nth-child(2),
    .table-row > div:nth-child(2) {
      width: 136px;
    }
    .table-header > div:nth-child(3),
    .table-row > div:nth-child(3) {
      width: 98px;
    }
    .table-header > div:nth-child(4),
    .table-row > div:nth-child(4) {
      width: 98px;
    }
    .table-header > div:nth-child(5),
    .table-row > div:nth-child(5) {
      width: 98px;
    }
  }
}
</style>
