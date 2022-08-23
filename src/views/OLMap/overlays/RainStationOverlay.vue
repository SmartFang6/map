<template>
  <div class="firstOverlay">
    <img
      :src="icon"
      class="img"
      @click="showDetail"
    >
    <table
      class="line"
    >
      <tr>
        <td style="color: #bbcce8; font-size: 12px; font-family: SourceHanSansCN-Regular;">
          {{ detail.stnm !== null ? detail.stnm + '  ': '-- ' }}
        </td>
        <td style="color: #ffffff; font-size: 12px; font-family: SourceHanSansCN-Heavy;">
          {{ detail.drp !== null ? detail.drp : '--' }}
        </td>
        <td style="color: #cecece; font-size: 12px; font-family: SourceHanSansCN-Regular;">
          mm
        </td>
      </tr>
    </table>
  </div>
</template>
<script>
import DcMarker from '../common/DcOverlay'
// 雨情检测类型图片
import rainRed from '@/assets/map/rainRedAni.png'
import rainGreen from '@/assets/map/rainGreen.png'

export default {
  name: 'Pyramid',
  filters: {
    twoDecimal(value) {
      if (
        value === undefined ||
        value === null ||
        value === '' ||
        value === NaN
      ) {
        return '-'
      }
      return value.toFixed(2)
    },
  },
  mixins: [DcMarker],
  props: {
    detail: {
      type: Object,
      default() { return {} },
    },
    rainTableShow: {
      type: Boolean,
      default() { return false },
    },
  },
  data() {
    return { icon: '' }
  },
  mounted() {
    switch (this.detail.warnType) {
      case '1':
        this.icon = rainRed
        break
      case '0':
        this.icon = rainGreen
        break
      default:
        this.icon = rainGreen
        break
    }
  },
  methods: {
    showDetail(e) {
      e.stopPropagation()
      this.$emit('showDetail', this.detail)
    },
  },
}
</script>

<style lang="less" scoped>
.firstOverlay {
  position: relative;
  .text {
    // position: absolute;
    display: flex;
    justify-content: space-around;
    text-align: center;
    padding: 0px 2px 0px 2px;
    background-color: #38407f;
    box-shadow: 0px 4px 8px 0px
      rgba(6, 0, 1, 0.12);
    border-radius: 8px;
    opacity: 0.8;
    transform: translate(-30%, 90%);
    span{
      min-width: 60px;
    }
  }

  .line {
    position: absolute;
    padding: 0px 1px 0px 1px;
    background-color: #38407f;
    border-radius: 8px;
    opacity: 0.8;
    transform: translate(-50%, 40%);
  }

  table {
    // position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -150%);
    border: solid 0.2px;
    border-radius: 5px;
    background-color: rgba(0, 0, 0, 0.8);
    padding: 0 15px;
    white-space: nowrap;
  }
  .img {
    transform: scale(0.65);
  }
  .title {
    font-weight: bolder;
    font-size: 18px;
    color: #fff;
  }
  .content {
    padding-right: 10px;
  }
  .bold-num {
    font-size: 20px;
    font-weight: bolder;
  }
  .detail {
    float: right;
    background: #226ce7;
    border-radius: 3px;
    padding: 5px;
    color: white;
    font-size: 15px;
  }
  .detail:hover {
    cursor: pointer;
  }
  .whiteFont {
    color: #fff;
  }
}
</style>
