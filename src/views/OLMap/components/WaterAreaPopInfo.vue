<template>
  <div class="popInfo">
    <div class="conent">
      <div class="one">
        <span class="title">{{ info.adnm ? info.adnm: '--' }}</span>
      </div>
        <div class="two">
          <span class="lineone">问题数</span>
        <span class="lineonenum">{{ info.allNum !== null ? info.allNum : '--' }}</span>
        <span class="lineoneunit">个</span></div>
        <div class="three">
        <span class="linetwo">销号率</span>
        <span class="linetwonum">{{ info.completedRate !== null && info.completedRate !== undefined ? (Number(info.completedRate)*100).toFixed(2) : '--' }}</span>
        <span class="linetwounit">%</span>
        </div>
    </div>
  <!-- <img class="bg" :src="icon" /> -->
  </div>
</template>
<script>
import DcOverlay from '../common/DcOverlay'
import bgPic from '@/assets/map/bg.png'
import titlePic from '@/assets/map/title.png'
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
    return {
      icon: '',
      titleIcon: '',
    }
  },
  mounted() {
    this.icon = bgPic
    this.titleIcon = titlePic
  },
  methods: {
    
  },
}
</script>
<style lang="less" scoped>
.popInfo {
  transform: translate(-50%, 50%);
  background: url('~@/assets/map/bg.png') no-repeat ;
  background-size: 100% 100%;
  width: 269px;
  height: 132px;
  position: relative;
  text-align: left;
  .conent{
    position: absolute;
    top: 0;
    left: 0;
    width: 188px;
    height: 132px;
    .one {
      padding-top: 10px;
    }
    .two {
      padding-top: 8px;
    }
    .three {
      padding-top: 8px;
    }
    .title {
      font-family: YouSheBiaoTiHei;
      font-size: 24px;
      color: #0adbe0;
      text-align: left;
      padding-left: 20px;
    }
    
  .lineone {
    margin-top: 120px;
    margin-left: 20px;
    background: url('~@/assets/map/title.png') no-repeat ;
    background-size: 100% 100%;
    width: 70px;
    height: 24px;
    font-family: MicrosoftYaHei;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 28px;
    letter-spacing: 0px;
    color: #0adbe0;
    padding: 3px 5px 3px 5px;
  }
  .lineonenum {
    // position: relative;
    font-family: AgencyFB-Bold;
    font-size: 24px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 28px;
    letter-spacing: 0px;
    color: #0adbe0;
    margin-left: 20px;
    // left: 10px;
    // left: -250px;
  }
  .lineoneunit {
    // position: relative;
    font-family: MicrosoftYaHei;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 28px;
    letter-spacing: 0px;
    color: #0adbe0;
    // left: -150px;
  }
  .linetwo {
    background: url('~@/assets/map/title.png') no-repeat ;
    background-size: 100% 100%;
    width: 70px;
    height: 24px;
    font-family: MicrosoftYaHei;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 28px;
    letter-spacing: 0px;
    color: #0adbe0;
    // margin-top: 120px;
    margin-bottom: 20px;
    margin-left: 20px;
    padding: 3px 5px 3px 5px;
  }
  .linetwonum {
    // position: relative;
    font-family: AgencyFB-Bold;
    font-size: 24px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 28px;
    letter-spacing: 0px;
    color: #0adbe0;
    margin-left: 20px;
    // left: -250px;
    // top: 30px;
  }
  .linetwounit {
    // position: relative;
    font-family: MicrosoftYaHei;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 28px;
    letter-spacing: 0px;
    color: #0adbe0;
    // left: -150px;
    // top: 30px;
  }
  }
  
  
}
</style>
