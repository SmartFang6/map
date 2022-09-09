<template>
  <div class="">
    <div class="header_title">标题名称</div>
    <ul class="tag_view">
      <li class="tag_view--item">
        <div>
          <p>事件总数</p>
          {{ info?.eventNum || 0 }}
          <span>个</span>
        </div>
      </li>
      <li class="tag_view--item">
        <div style="color: #e35f5f">
          <p>已解决</p>
          {{ info?.eventSolveNum || 0 }}
          <span>个</span>
        </div>
      </li>
      <li class="tag_view--item">
        <div style="color: #ffb401">
          <p>未解决</p>
          {{ info?.eventUnSolveNum || 0 }}
          <span>个</span>
        </div>
      </li>
      <li class="tag_view--item">
        <div style="color: #0adbe0">
          <p>解决率</p>
          {{ info?.eventSourceSolveRate || 0 }}
          <span>%</span>
        </div>
      </li>
    </ul>
    <div class="progress_view">
      <ProgressBar
        v-for="(item, index) in problemSourceList"
        :no="index + 1"
        :count="item?.allNum || 0"
        :key="item?.eventSource || index"
        :rate="item?.eventSourceSolveRate || 0"
        flexType="row"
        :title="item?.eventSourceName || ''"
      />
    </div>
  </div>
</template>

<script setup>
/**
 EventSource 事件来源
 **/
import ProgressBar from "@/views/components/ProgressBar";
import { getEventSourceInfo } from "@/apis/home";
import { onMounted, ref } from "vue";
import { useStore } from "vuex";

const store = useStore();
const info = ref({});
const problemSourceList = ref([]);
const getData = async () => {
  const { userInfo, dateObj = {} } = store?.state || {};
  const params = {
    adcd: userInfo?.adminDivCode || "",
    endTime: dateObj?.endTime || "",
    startTime: dateObj?.startTime || "",
  };
  info.value = {};
  problemSourceList.value = [];
  const message = await getEventSourceInfo(params);
  if (!message) return;
  info.value = message;
  problemSourceList.value = message?.voList || [];
};

onMounted(() => {
  getData();
});
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
.progress_view {
  padding-right: 10px;
  height: 600px;
  overflow: hidden;
  overflow-y: auto;
  &::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }

  &::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 4px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: rgba(206, 205, 205, 0.75);
  }

  &::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    background: rgba(255, 255, 255, 0.15);
  }
}
</style>
