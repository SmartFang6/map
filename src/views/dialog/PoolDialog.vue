<template>
  <div class="map-pop">
    <div class="header_title">{{ props.info?.name }}</div>
    <div class="pop-body">
      <div class="left-img">
        <div class="num-title">
          <div class="item">
            <div class="name">坝顶高程</div>
            <div class="value">
              {{ props.info?.dmh?.toFixed(1) ?? "-" }}
              <span>m</span>
            </div>
          </div>
          <div class="item">
            <div class="name">最大坝高</div>
            <div class="value">
              {{ props.info?.a?.toFixed(1) ?? "-" }}
              <span>m</span>
            </div>
          </div>
          <div class="item">
            <div class="name">水域面积</div>
            <div class="value">
              {{ props.info?.area?.toFixed(2) ?? "-" }}
              <span>m²</span>
            </div>
          </div>
          <div class="item">
            <div class="name">集雨面积</div>
            <div class="value">
              {{ props.info?.rcarea?.toFixed(2) ?? "-" }}
              <span>m²</span>
            </div>
          </div>
        </div>
        <div class="img-box">
          <el-carousel
            indicator-position="none"
            v-if="props.info.imageFileInfoList?.length > 0"
          >
            <el-carousel-item
              v-for="item in props.info.imageFileInfoList"
              :key="item.fileId"
            >
              <img :src="item.relativeUrl" alt="" class="left-img" />
            </el-carousel-item>
          </el-carousel>
          <img class="no-img" :src="noImg" alt="" v-else />
        </div>
      </div>
      <ul>
        <li class="right-li">
          <span class="item-label">所属县区</span>
          <el-tooltip
            :content="props.info?.county"
            effect="light"
            placement="top"
          >
            <span class="item-value">{{ props.info?.county }}</span>
          </el-tooltip>
        </li>
        <li class="right-li">
          <span class="item-label">所在乡镇</span>
          <el-tooltip
            :content="props.info?.town"
            effect="light"
            placement="top"
          >
            <span class="item-value">
              {{ props.info?.town }}
            </span>
          </el-tooltip>
        </li>
        <li class="right-li">
          <span class="item-label">主要功能</span>
          <el-tooltip
            :content="props.info?.function"
            effect="light"
            placement="top"
          >
            <span class="item-value">{{ props.info?.function }}</span>
          </el-tooltip>
        </li>
        <li class="right-li">
          <span class="item-label">灌溉面积</span>
          <el-tooltip
            :content="props.info?.rchnm ?? '-'"
            effect="light"
            placement="top"
          >
            <span class="item-value">{{ props.info?.rchnm ?? "-" }}</span>
          </el-tooltip>
        </li>
        <li class="right-li">
          <span class="item-label">巡查人员</span>
          <el-tooltip
            :content="props.info?.people ?? '-'"
            effect="light"
            placement="top"
          >
            <span class="item-value">{{ props.info?.people ?? "-" }}</span>
          </el-tooltip>
        </li>
        <li class="right-li">
          <span class="item-label">联系方式</span>
          <el-tooltip
            :content="props.info?.phone ?? '-'"
            effect="light"
            placement="top"
          >
            <span class="item-value">{{ props.info?.phone ?? "-" }}</span>
          </el-tooltip>
        </li>
        <li class="right-li">
          <span class="item-label">是否进行山塘整治</span>
          <el-tooltip
            :content="props.info?.x ?? '-'"
            effect="light"
            placement="top"
          >
            <span class="item-value">{{ props.info?.x ?? "-" }}</span>
          </el-tooltip>
        </li>
        <li class="right-li">
          <span class="item-label">整治完成时间</span>
          <el-tooltip
            :content="props.info?.rnvtm"
            effect="light"
            placement="top"
          >
            <span class="item-value">{{ props.info?.rnvtm }}</span>
          </el-tooltip>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import noImg from "@/assets/images/no-img.png";
const props = defineProps({
  info: {
    type: Object,
    default() {
      return {};
    },
  },
});
</script>

<style lang="less" scoped>
.map-pop {
  .pop-title {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: #0adbe0;
    font-size: 24px;

    .tag {
      margin-left: 10px;
    }
  }

  .pop-body {
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;

    .left-img {
      flex: 1;
      height: 430px !important;
      text-align: center;
      height: 100%;
      .num-title {
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        width: 100%;
        height: 73px;
        margin-bottom: 10px;
        background: url(@/assets/images/responsible-checked.png) no-repeat;
        background-size: 100% 100%;
        .item {
          width: 25%;
          .name {
            font-family: MicrosoftYaHei;
            font-size: 16px;
            color: #ccf1ff;
          }
          .value {
            margin-top: 4px;
            font-family: MicrosoftYaHei;
            font-size: 24px;
            color: #ffffff;
            span {
              margin-left: 4px;
              font-size: 16px;
              color: #6fcbed;
            }
          }
        }
      }
      .img-box:last-child {
        flex: 1;
        .no-img {
          margin-top: 100px;
        }
      }
    }

    ul {
      width: 270px;
      margin-left: 14px;

      li {
        display: flex;
        width: 100%;
        height: 44px;
        line-height: 44px;
        margin-bottom: 10px;
        padding: 0 12px;
        background-color: #005273;
        box-shadow: inset 0 2px 1px 0 #0089be;
        text-align: left;
      }
    }

    .item-label {
      min-width: 78px;
      text-align: right;
      font-family: MicrosoftYaHei;
      font-size: 18px;
      color: #ffffff;
      flex-shrink: 0;
    }

    .item-value {
      font-family: MicrosoftYaHei;
      font-size: 18px;
      color: #00dcf0;
      margin-left: 12px;
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden; //溢出内容隐藏
      text-overflow: ellipsis; //文本溢出部分用省略号表示
      display: -webkit-box; //特别显示模式
      -webkit-line-clamp: 2; //行数
      line-clamp: 2;
      -webkit-box-orient: vertical; //盒子中内容竖直排列
    }
  }
}
</style>
