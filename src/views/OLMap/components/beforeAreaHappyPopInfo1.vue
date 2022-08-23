<template>
  <div class="areahappy">
    <div class="content">
      <div class="title">{{ info.townshipName }}</div>
      <div class="row">
        <div class="left">
          幸福指数：<span class="score">{{ info.happinessIndex }}</span>
        </div>
        <div class="right">{{ info.happinessDegree }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import DcOverlay from '../common/DcOverlay'
export default {
  mixins: [DcOverlay],
  props: {
    info: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  data() {
    return {}
  },
  methods: {},
}
</script>

<style lang="less" scoped>
.areahappy {
  background-image: url('~@/assets/images/mxqt/dialog.png');
  background-repeat: no-repeat;
  background-size: 100%, 100%;
  color: #ffffff;
  font-family: MicrosoftYaHei-Bold;
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  .content {
    padding: 30px;
    .row {
      display: flex;
      margin-top: 10px;
      .left {
        justify-content: flex-start;
        .score {
          color: #00baff;
          font-family: AgencyFB-Bold;
          font-size: 30px;
        }
      }
      .right {
        text-align: center;
        margin-left: 20px;
        margin-top: 8px;
        padding: 4px;
        background-color: #33b3fd;
      }
    }
  }
}
</style>
