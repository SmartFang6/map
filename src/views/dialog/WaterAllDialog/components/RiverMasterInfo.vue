<!-- #region 河长信息 -->
<template>
  <div class="pop-body">
    <ul class="right_box">
      <li>
        <span class="item-label">河长姓名：</span>
        <span class="item-value">{{ fatherInfo?.name ?? "-" }}</span>
      </li>
      <li>
        <span class="item-label">河长级别：</span>
        <span class="item-value">
          {{ fatherInfo?.rvmasterLev ?? "-" }}
        </span>
      </li>
      <li>
        <span class="item-label">职务：</span>
        <span class="item-value">{{ fatherInfo?.post ?? "-" }}</span>
      </li>
      <li>
        <span class="item-label">联系部门：</span>
        <span class="item-value">{{ fatherInfo?.contactUnit ?? "-" }}</span>
      </li>
    </ul>
  </div>
  <div class="children_info">
    <div class="info_title">下级河长</div>
    <ul class="children_box" v-if="childrenList.length > 0">
      <li v-for="item in childrenList" :key="item.rvmasterId">
        <p class="c-grade">{{ item.rchnm }}</p>
        <p class="c-name">{{ item.name }}</p>
      </li>
    </ul>
    <div class="img-box" v-else>
      <img :src="noImg" alt="" />
      <p>暂无数据</p>
    </div>
  </div>
</template>
<!-- #endregion -->

<script setup>
import { onMounted } from "vue";
import {
  getEventSourceInfo,
  getPersonInfoByRchcd,
} from "@/apis/waterBeautiful";
import noImg from "@/assets/images/no-img.png";
import { ref } from "vue";
const props = defineProps({
  info: {
    type: Object,
    default() {
      return {};
    },
  },
});
onMounted(() => {
  console.log("m");
  getMasterInfo();
});
let fatherInfo = ref({});
const getMasterInfo = async () => {
  let res = await getPersonInfoByRchcd({
    rchcd: props.info?.code,
  });
  fatherInfo.value = res;
  console.log(res, fatherInfo, "fatherInfo");
  getChildrenList();
};
let childrenList = ref([]);
const getChildrenList = async () => {
  let res = await getEventSourceInfo({
    rchcd: props.info?.code,
    type: 1,
  });
  childrenList.value = res;
};
</script>

<style scoped lang="less">
.pop-body {
  display: flex;
  justify-content: space-between;
  max-height: 400px;
  box-sizing: border-box;
}
.right_box {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  flex: 1;

  li {
    display: flex;
    width: 23.7%;
    height: 44px;
    margin-right: calc(6% / 4);
    line-height: 44px;
    padding: 0 12px;
    background-color: #0b216c;
    box-shadow: inset 0 2px 1px 0 #1642d8;
    text-align: left;
    &:nth-child(4) {
      margin-right: 0;
    }
  }
}
.children_info {
  .info_title {
    font-size: 16px;
    color: #fff;
    margin: 14px 0 10px 0;
  }
  .img-box {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 200px;
    p {
      margin-top: 12px;
      font-size: 18px;
      color: #fff;
    }
  }
}
.children_box {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  li {
    display: block;
    margin-bottom: 10px;
    height: 48px;
    padding: 0 12px;
    background-color: #0b216c;
    box-shadow: inset 0 2px 1px 0 #1642d8;
    width: 23.5%;
    margin-right: calc(6% / 4);
    &:nth-child(4n) {
      margin-right: 0;
    }
    font-size: 14px;
    color: #fff;
  }
  .c-grade {
    padding-top: 6px;
  }
  .c-name {
    margin-top: -2px;
    text-align: right;
  }
}

.item-label {
  min-width: 82px;
  text-align: right;
  font-family: MicrosoftYaHei;
  font-size: 16px;
  color: #ffffff;
  flex-shrink: 0;
}

.item-value {
  font-family: MicrosoftYaHei;
  font-size: 16px;
  color: #43c7ff;
  margin-left: 12px;
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden; //溢出内容隐藏
  text-overflow: ellipsis; //文本溢出部分用省略号表示
  display: -webkit-box; //特别显示模式
  -webkit-line-clamp: 2; //行数
  line-clamp: 2;
  -webkit-box-orient: vertical; //盒子中内容竖直排列
}
</style>
