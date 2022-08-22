<template>
  <div class="popInfo" :style="{ backgroundImage: 'url(' + this.getImage() + ')' }">
    <div class="content">
        <div class="total-title">
          <div class="townname">{{ info.adnm }}</div>
        </div>
        <div class="total-row">
          <div class="col">
            <div class="col-title">水域面积</div>
            <div class="score">{{ info.waterArea !== null ? info.waterArea : '--' }}km²</div>
          </div>
          <div class="col white">
            <div class="col-title">水面率</div>
            <div class="degree">
              {{ info.waterSurfaceRate !== null ? info.waterSurfaceRate : '--' }}%
            </div>
          </div>
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
  methods: {
    getImage() {
      let icon = require('@/assets/images/mxqt/dialog_blue.png')
      return icon
    },
    getColor() {
      let background = '#28e457'
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
          font-size: 22px;
          // color: black;
          text-align: center;
          margin-top: 8px;
          padding: 4px;
          //  padding: 3px 0 0 5px;
          // background-color: #28e457;
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
      .beautiful {
        background-color: #6db773;
        width: 70px;
        // height:20px;
        padding: 6px;
      }
    }
  }
}
</style>
