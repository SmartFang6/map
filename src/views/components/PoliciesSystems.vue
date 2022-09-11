<template>
  <div class="policy">
    <Title title="政策制度">
      <!--S标题尾部功能区-->
      <template #more>
        <div class="tools">
          <i class="icon-zoom"></i>
        </div>
      </template>
      <!--E标题尾部功能区-->
    </Title>
    <!-- S内容区域 -->
    <div class="list" v-if="PoliciesSystemsList.length > 0">
      <vue-seamless-scroll
        :data="PoliciesSystemsList"
        :class-option="{ step: 0.3 }"
      >
        <div class="oneList" v-for="item in PoliciesSystemsList" :key="item.id">
          <i class="icon-rectangle"></i>
          <p class="content">
            {{ item.policyName }}
          </p>
          <span class="day">{{ item.createTime }}</span>
        </div>
      </vue-seamless-scroll>
    </div>
    <el-empty v-else description="暂无数据" :image-size="80" class="dc-empty" />
    <!-- E内容区域 -->
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import { getPoliciesSystemsList } from "@/apis/cockpitEventStats";
import VueSeamlessScroll from "vue-seamless-scroll/src/components/myClass";
const PoliciesSystemsList = ref([]);
// 获取获取政策制度列表
const store = useStore();
const getPoliciesSystems = async () => {
  if (store.state.userInfo) {
    const search = {
      adcd: store.state.userInfo.adminDivCode,
    };
    const res = await getPoliciesSystemsList(search);
    console.log(res);
    PoliciesSystemsList.value = res;
    // console.log(PoliciesSystemsList);
  }
};
getPoliciesSystems();
</script>
<style scoped lang="less">
.policy {
  height: 302px;
  ::v-deep .tools {
    display: flex;
    position: absolute;
    right: 0;
    padding-right: 48px;
    .icon-zoom {
      width: 16px;
      height: 16px;
      color: #fff;
      background: url(@/assets/images/icon-zoom.png) no-repeat;
      background-size: cover;
      cursor: pointer;
    }
  }
  .list {
    width: 100%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 10px;
    overflow: hidden;
    .oneList {
      display: flex;
      align-items: center;
      font-family: MicrosoftYaHei;
      width: 443px;
      height: 41px;
      background-color: #0040a1;
      background-image: linear-gradient(to right, #0040a1, #031129);
      margin-bottom: 9px;

      .icon-rectangle {
        width: 18px;
        height: 17px;
        margin-left: 10px;
        color: #fff;
        background: url(@/assets/images/icon-rectangle.png) no-repeat;
        background-size: cover;
      }
      .content {
        width: 290px;
        color: #fff;
        font-size: 15px;
        margin: 0 24px 0 10px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .day {
        color: #00dcf0;
        font-size: 16px;
      }
    }
  }
}
</style>
