<template>
  <div class="ProgressBar">
    <div
      class="no_box"
      :style="{ color: colors[no] }"
      :class="{
        'no_box--one': +no <= 3,
      }"
    >
      {{ no }}
    </div>
    <div
      class="bar"
      :class="{
        'bar_flex--one': flexType === 'col',
        'bar_flex--two': flexType === 'row',
      }"
    >
      <div class="title">
        <el-tooltip
          class="item"
          effect="dark"
          :content="title"
          placement="right-start"
        >
          {{ title }}
        </el-tooltip>
      </div>
      <div class="progress_view">
        <div class="rate_tag" :style="{ width: `${rate}%` }" />
        <p>
          <span class="count" :style="{ color: colors[no] }">{{ count }}</span>
          <span>&nbsp;/&nbsp;</span>
          <span class="rate">{{ rate }}%</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
/**
 ProgressBar
 **/
defineProps({
  no: {
    type: Number || String,
    default: () => "1",
  },
  count: {
    type: Number || String,
    default: () => "1",
  },
  title: {
    type: String,
    default: () => "",
  },
  flexType: {
    type: String,
    default: () => "row",
    // default: () => "col",
  },
  rate: {
    type: Number || String,
    default: () => 60,
  },
});

const colors = {
  1: "#ff6c00",
  2: "#ffc025",
  3: "#009ff2",
};
</script>

<style scoped lang="less">
* {
  padding: 0;
  margin: 0;
  list-style: none;
  box-sizing: border-box;
}

.ProgressBar {
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: AGENCYB;
  margin-bottom: 10px;

  .no_box {
    width: 40px;
    height: 100%;
    margin-right: 20px;
    color: #00f5ff;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
  }

  .no_box--one {
    padding-bottom: 10px;
    background: url(~@/assets/images/rankings-bottom.png) no-repeat 5px 20px/ 30px
      auto;
  }

  .bar {
    height: 100%;
    flex: 1 1 auto;

    .title {
      text-align: left;
      color: #e6f8ff;
      font-size: 14px;
    }

    .progress_view {
      width: 100%;
      height: 16px;
      background-color: rgba(255, 255, 255, 0.15);
      border-radius: 8px;
      position: relative;
      top: 0;
      left: 0;

      .rate_tag {
        height: 100%;
        background-image: linear-gradient(-18deg, #0adbe0 0%, #14a2d2 100%),
          linear-gradient(90deg, rgba(89, 240, 93, 0.5) 0%, #59f05d 100%);
        background-blend-mode: normal, normal;
        border-radius: 8px;
      }

      p {
        position: absolute;
        right: 0;
        bottom: 16px;
        margin: 0;
        padding: 0;
        height: 24px;
        line-height: 24px;
        color: #9ce7fd;

        .count {
          font-size: 18px;
        }

        .rate {
          font-size: 14px;
        }
      }
    }
  }

  .bar_flex--one {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    .title {
      width: 100%;
    }
  }

  .bar_flex--two {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title {
      padding-top: 24px;
      width: 150px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .progress_view {
      margin-top: 20px;
    }
  }
}
</style>
