<!--------------------------------------------
 ¦ 右侧风险管控组件
 ¦
 ¦ Author: 大风
 ¦ Date: 2022-08-16 16:30:22
 ¦------------------------------------------->

<template>
  <div class="risk-control">
    <Title title="风险管控" />
    <div class="risk-list">
      <!--#region 每日新增-->
      <div class="risk-item down">
        <div class="icon">
          <img src="@/assets/images/risk-default.png" />
          <div class="index">
            <img src="@/assets/images/risk-down.png" />
            <div class="value">
              {{ dataModel?.todayCompareToYesterdayAddNum }}
            </div>
          </div>
        </div>

        <div class="data">
          <div class="value">
            <span>{{ dataModel?.todayAddNum }}</span>
            <span>个</span>
          </div>
          <div class="label">每日新增</div>
        </div>
      </div>
      <!--#endregion-->

      <!--#region 每日超期-->
      <div class="risk-item danger up">
        <div class="icon">
          <img src="@/assets/images/risk-danger.png" />
          <div class="index">
            <img src="@/assets/images/risk-up.png" />
            <div class="value">
              {{ dataModel?.todayCompareToYesterdayTimeoutNum }}
            </div>
          </div>
        </div>

        <div class="data">
          <div class="value">
            <span>{{ dataModel?.todayTimeoutNum }}</span>
            <span>个</span>
          </div>
          <div class="label">每日超期</div>
        </div>
      </div>
      <!--#endregion-->

      <!--#region 即将逾期-->
      <div class="risk-item warning up">
        <div class="icon">
          <img src="@/assets/images/risk-warning.png" />
          <div class="index">
            <img src="@/assets/images/risk-up.png" />
            <div class="value">
              {{ dataModel?.todayCompareToYesterdayImmediatelyTimeoutNum }}
            </div>
          </div>
        </div>

        <div class="data">
          <div class="value">
            <span>{{ dataModel?.todayImmediatelyTimeoutNum }}</span>
            <span>个</span>
          </div>
          <div class="label">每日逾期</div>
        </div>
      </div>
      <!--#endregion-->
    </div>
  </div>
</template>

<script setup>
import Title from "@/components/Title/index.vue";
import { ref, onBeforeMount } from "vue";
import { getEventRiskControl } from "@/api/cockpitEventStats";

// 风险管控组件数据源
let dataModel = ref(null);

/**
 * 获取风险管控的数据
 * @param {Object} queryParam
 * @returns {any}
 */
const getEventRiskModel = async (queryParam) => {
  const param = Object.assign(
    {
      adcd: "330182",
      code: "",
      startTime: "2022-07-23 09:29:29",
      endTime: "2022-08-23 09:29:29",
      searchText: "",
      pageNo: 1,
      pageSize: 10,
    },
    queryParam
  );
  return await getEventRiskControl(param);
};

onBeforeMount(async () => {
  dataModel.value = await getEventRiskModel();
  console.log(dataModel);
});
</script>

<style lang="less" scoped>
.risk-control {
  display: flex;
  flex-direction: column;
}

.risk-list {
  // padding: 20px 19px 43px 10px;
  padding: 20px 19px 20px 10px;
  display: flex;
  justify-content: space-between;
}

.risk-item {
  display: flex;
  padding-top: 10px;
  position: relative;

  & .icon {
    & .index {
      position: absolute;
      top: 0;
      left: 45px;
      display: flex;
      align-items: center;
      & .value {
        font-size: 18px;
        font-family: AGENCYB;
        padding-left: 3px;
      }
    }
  }

  &.down > .icon > .index > .value {
    color: #32da85;
  }

  &.up > .icon > .index > .value {
    color: #e35f5f;
  }

  & .data {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
    padding-left: 8px;

    & .value > span:first-child {
      font-family: AGENCYB;
      letter-spacing: 4px;
      font-size: 30px;
      color: #0adbe0;
    }
    & .value > span:last-child {
      color: #fff;
      letter-spacing: 2px;
      font-size: 16px;
    }

    & .label {
      font-family: MicrosoftYaHei;
      font-size: 16px;
      color: #fff;
      letter-spacing: 2px;
      padding-bottom: 6px;
    }
  }

  &.danger > .data > .value > span:first-child {
    color: #e35f5f;
  }

  &.warning > .data > .value > span:first-child {
    color: #ffcd19;
  }
}
</style>
