<template>
  <div
    class="popInfo"
    :style="{ backgroundImage: 'url(' + this.getImage(info.happinessDegree) + ')' }"
  >
    <div class="content">
      <!-- 区域幸福指数 -->
      <template v-if="info.layerid === 'regionalHappinessIndex'">
        <div class="total-title">
          <div class="townname">{{ info.townshipName }}</div>
        </div>
        <div class="total-row">
          <div class="col">
            <div class="col-title">幸福指数</div>
            <div class="score">{{ info.happinessIndex }}</div>
          </div>
          <div class="col white">
            <div class="col-title">幸福程度</div>
            <div class="degree" :style="{ backgroundColor: this.getColor(info.happinessDegree) }">
              {{ info.happinessDegree }}
            </div>
          </div>
        </div>
      </template>
      <!-- 河流幸福指数 -->
      <template v-if="info.layerid === 'channelHappinessIndex'">
        <div class="total-title">
          <div class="townname">{{ info.riverName }}</div>
        </div>
        <div class="total-row">
          <div class="col">
            <div class="col-title">幸福指数</div>
            <div class="score">{{ info.happinessIndex }}</div>
          </div>
          <div class="col white">
            <div class="col-title">幸福程度</div>
            <div class="degree" :style="{ backgroundColor: this.getColor(info.happinessDegree) }">
              {{ info.happinessDegree }}
            </div>
          </div>
        </div>
      </template>
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
  methods: {
    getImage() {
      // 动态获取图片
      let icon = require('@/assets/images/mxqt/dialog_blue.png')
      if (this.info.happinessDegree === '不幸福') {
        icon = require('@/assets/images/mxqt/dialog_red.png')
      }
      if (this.info.happinessDegree === '一般') {
        icon = require('@/assets/images/mxqt/dialog_orange.png')
      }
      if (this.info.happinessDegree === '比较幸福') {
        icon = require('@/assets/images/mxqt/dialog_yellow.png')
      }
      if (this.info.happinessDegree === '幸福') {
        icon = require('@/assets/images/mxqt/dialog_green.png')
      }
      if (this.info.happinessDegree === '非常幸福') {
        icon = require('@/assets/images/mxqt/dialog_blue.png')
      }
      // console.log(icon)
      return icon
    },
    getColor() {
      let background = '#28e457'
      if (this.info.happinessDegree === '不幸福') {
        background = '#FF592C'
      }
      if (this.info.happinessDegree === '一般') {
        background = '#ff9e1b'
      }
      if (this.info.happinessDegree === '比较幸福') {
        background = '#fff44a'
      }
      if (this.info.happinessDegree === '幸福') {
        background = '#00FF6C'
      }
      if (this.info.happinessDegree === '非常幸福') {
        background = '#33B3FD'
      }
      // console.log(icon)
      return background
    },
  },
}
</script>
<style lang="less" scoped>
.popInfo {
  background-repeat: no-repeat;
  background-size: 100%, 100%;
  color: #ffffff;
  font-family: MicrosoftYaHei-Bold;
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  .content {
    padding: 20px;
    .total-title {
      display: flex;
      width: 260px;
      height: 35px;
      .townname {
        margin: 0 0 0 30px;
        padding-top: 18px;
        color: white;
        font-size: 20px;
        font-weight: bold; //字体加粗
        // justify-content: flex-start;
        // display: flex;
        // align-items: center;
      }
    }
    .total-row {
      width: 220px;
      height: 80px;
      margin-top: 15px;
      margin-left: 20px;
      background-color: #073f5b;
      opacity: 0.7; // 透明度
      border: solid 2px #449dbe;
      display: flex;
      text-align: center;
      .col {
        width: 120px;
        color: white;
        justify-content: flex-end;
        align-items: center;
        padding: 8px 8px 8px 0;
        .col-title {
          margin: auto;
          font-size: 14px;
        }
        .score {
          font-size: 22px;
          margin-top: 8px;
          padding: 3px 0 0 5px;
        }
        .degree {
          font-size: 16px;
          color: black;
          text-align: center;
          margin-top: 11px;
          padding: 4px;
          background-color: #28e457;
        }
      }
      .white {
        color: white;
        justify-content: flex-end;
        flex: 1;
        align-items: center;
      }
    }
    .title {
      font-size: 18px;
    }
    .row {
      font-size: 14px;
      margin-top: 8px;
      .unit {
        font-size: 16px;
        font-weight: 900;
      }
    }
  }
}
</style>
