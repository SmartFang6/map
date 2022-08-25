<!--------------------------------------------
 ¦ 地图图层
 ¦ 文件描述
 ¦
 ¦ Author: 大风
 ¦ Date: 2022-08-23
 ¦------------------------------------------->

<template>
  <div class="map-layer">
    <!--#region 时间单位切换-->
    <div class="time-tabs">
      <el-tabs v-model="timeActive" type="card">
        <el-tab-pane class="tab-item" label="本月" name="month"></el-tab-pane>
        <el-tab-pane label="本年" name="year"></el-tab-pane>
        <el-tab-pane label="自定义" name="custom">
          <div>
            <el-date-picker
              v-model="dateRange"
              class="date-picker"
              type="monthrange"
              size="small"
              value-format="YYYY-MM-DD HH:mm:ss"
              prefix-icon="none"
              ref="datePickerRef"
            ></el-date-picker>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!--#endregion-->

    <!--#region 图类型切换-->
    <!-- 暂时隐藏，默认展示点位图，后续做市级再放出来 -->
    <!-- <div class="graph-tabs">
      <div
        class="graph-style"
        :class="{ active: graphActive === '1' }"
        @click="graphActive = '1'"
      >
        统计图
      </div>
      <div
        class="graph-style"
        :class="{ active: graphActive === '2' }"
        @click="graphActive = '2'"
      >
        点位图
      </div>
    </div> -->
    <!--#endregion-->
  </div>
</template>

<script>
import moment from "moment";
import { reactive, toRefs, watch } from "vue";

export default {
  name: "MapLayer",
  emits: ["changeTime", "changeLayerType"],
  setup(props, { emit }) {
    const state = reactive({
      timeActive: "year",
      graphActive: "2",
      datePickerRef: null,
      dateRange: [],
      searchTime: null,
    });

    // 监听时间切换状态发送事件
    watch(
      () => state.timeActive,
      (timeActive) => {
        if (timeActive === "month") {
          emit("changeTime", {
            startTime: moment(new Date())
              .startOf("month")
              .format("YYYY-MM-DD 00:00:00"),
            endTime: moment(new Date())
              .endOf("month")
              .format("YYYY-MM-DD 23:59:59"),
          });
        } else if (timeActive === "year") {
          emit("changeTime", {
            startTime: moment(new Date())
              .startOf("year")
              .format("YYYY-MM-DD 00:00:00"),
            endTime: moment(new Date())
              .endOf("year")
              .format("YYYY-MM-DD 23:59:59"),
          });
        } else {
          state.datePickerRef.$el?.nextElementSibling.click();
        }
      },
      {
        immediate: true,
      }
    );

    // 自定义事件发生变化后发送事件
    watch(
      () => state.dateRange,
      (dateRange) => {
        if (!dateRange || !dateRange[0] || !dateRange[1]) {
          return;
        }
        let [startTime, endTime] = dateRange;
        endTime = moment(endTime).endOf("day").format("YYYY-MM-DD 23:59:59");
        emit("changeTime", {
          startTime,
          endTime,
        });
      }
    );

    // 监听图形切换状态发送事件
    watch(
      () => state.graphActive,
      (graphActive) => emit("changeLayerType", graphActive),
      {
        immediate: true,
      }
    );

    return {
      ...toRefs(state),
    };
  },
};
</script>

<style lang="less" scoped>
.map-layer {
  position: absolute;
  top: 80px;
  left: 500px;
  right: 500px;
  line-height: initial;
  font-size: 16px;
  z-index: 100;

  :deep(.el-tabs--card > .el-tabs__header .el-tabs__item) {
    box-sizing: border-box;
    border: none;
    color: white;
  }
  :deep(.el-tabs--card > .el-tabs__header .el-tabs__nav) {
    border: none;
  }
  :deep(.el-tabs--card > .el-tabs__header) {
    border: none;
  }
  :deep(.el-tabs__header) {
    margin: 0;
  }
  :deep(.el-tabs--card > .el-tabs__header .el-tabs__item.is-active) {
    background: url(@/assets/images/checked.png);
    background-size: 100% 100%;
  }
}

.time-tabs {
  display: flex;
  justify-content: center;
  font-family: YOUSHEBIAOTIHEI;
  width: 100%;
  .el-tabs {
    width: 100%;
  }
  .el-tab-pane {
    width: 100%;
  }
  :deep(.el-tabs__nav-scroll) {
    display: flex;
    aling-items: center;
    justify-content: center;
  }
  :deep(.el-date-editor) {
    // opacity: 0;
    // background: transparent;
    background: rgba(11, 27, 48, 0.75);
    color: #fff;
  }
  :deep(.el-date-editor .el-range-input) {
    color: #c4f0ff;
  }
  :deep(.el-date-editor.el-input__wrapper) {
    // box-shadow: none;
    width: 180px;
  }
}

.graph-tabs {
  position: absolute;
  display: flex;
  flex-direction: column;
  color: #c4f0ff;
  float: right;
  right: 60px;
  top: 20px;

  .graph-style {
    color: #c4f0ff;
    font-size: 16px;
    width: 130px;
    height: 38px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    &.active {
      color: #fff;
      background: url(@/assets/images/performance-tab-active.png);
    }
  }
  .date-picker {
    float: left;
  }
}
</style>
