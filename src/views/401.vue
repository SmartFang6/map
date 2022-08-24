<template>
  <div class="main_wrap">
    <p class="text">暂无权限访问，请联系管理员！</p>
    <img src="@/assets/images/401.png" alt="" />
  </div>
</template>
<style lang="less" scoped>
.main_wrap {
  width: 100%;
  height: 100%;
  position: relative;
  .text {
    font-family: "宋体";
    color: #158dee;
    font-size: 40px;
    position: absolute;
    bottom: 150px;
    left: 50%;
    transform: translateX(-40%);
  }
  img {
    display: block;
    margin: 0 auto;
  }
}
</style>
