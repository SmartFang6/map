<template>
  <DialogOne :title="info.stnm" theme-color="#54f9fc">
    <div class="content">
      <i class="icon icon-rainfall" />
      <div class="value">{{ info.sumDrp !== null ? (+info.sumDrp).toFixed(2) : '--' }}</div>
      <div class="unit">mm</div>
    </div>
  </DialogOne>
</template>

<script>
import DialogOne from './DialogOne'

export default {
  components: { DialogOne },
  props: {
    info: {
      type: Object,
      default() {
        return {}
      },
    },
  },
}
</script>

<style lang="less" scoped>
.content {
  display: flex;
  align-items: baseline;
  .icon {
    color: #51f1f4;
    font-size: 20px;
  }
  .value {
    margin-left: 11px;
    color: #51f1f4;
    font-family: 'AgencyFB';
    font-size: 24px;
    font-weight: bold;
  }
  .unit {
    margin-left: 5px;
    color: #65b6d1;
  }
}
</style>
