<template>
  <div class="">
    <div class="header_title">标题名称</div>
    <ul class="tag_view">
      <li class="tag_view--item">
        <div>
          <p>事件总数</p>
          100
          <span>个</span>
        </div>
      </li>
      <li class="tag_view--item">
        <div style="color: #e35f5f">
          <p>已解决</p>
          100
          <span>个</span>
        </div>
      </li>
      <li class="tag_view--item">
        <div style="color: #ffb401">
          <p>未解决</p>
          100
          <span>个</span>
        </div>
      </li>
      <li class="tag_view--item">
        <div style="color: #0adbe0">
          <p>解决率</p>
          100
          <span>个</span>
        </div>
      </li>
    </ul>
    <div>
      <ProgressBar
        v-for="i in 12"
        :no="i"
        :count="i * 8"
        :key="i"
        :rate="i * 8"
        flexType="row"
        title="标题标题标题标题标题"
      />
    </div>
  </div>
</template>

<script setup>
/**
 EventSource 事件来源
 **/
import ProgressBar from "@/views/components/ProgressBar";
</script>

<style scoped lang="less">
.header_title {
  font-family: YouSheBiaoTiHei;
  font-size: 26px;
  text-align: left;
  line-height: 24px;
  letter-spacing: 0;
  color: #0adbe0;
  margin-bottom: 20px;
  margin-top: -20px;
}
.tag_view {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  .tag_view--item {
    width: 20%;
    height: 50px;
    background: url(~@/assets/images/count-icon.png) no-repeat 0 0/ 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    & > div {
      font-family: AGENCYB;
      font-size: 32px;
      height: 36px;
      line-height: 36px;
      color: #fff;
      position: relative;
      top: 0;
      left: 0;

      & > p {
        position: absolute;
        right: calc(100% + 10px);
        top: 4px;
        width: 100px;
        font-size: 12px;
        text-align: right;
        line-height: 12px;
        color: #ccf1ff;
      }

      & > span {
        font-size: 12px;
        color: #ccf1ff;
      }
    }
  }
}
</style>
