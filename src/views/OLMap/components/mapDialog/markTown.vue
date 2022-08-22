<template>
  <div class="markTownMain">
    <el-dialog
      :key="riverDialogVisible"
      :visible.sync="riverDialogVisible"
      title=""
      width="720px"
      top="45vh"
      :modal-append-to-body="false"
    >
      <div class="mark">
        <div class="content">
          <ul class="contentTop">
            <li>
              <p class="title">河流名称</p>
              <p class="text">{{ '-/-' }}</p>
            </li>
            <li>
              <p class="title">幸福指数</p>
              <p class="text">{{ '-/-' }}{{ '-/-' }}</p>
            </li>
            <li>
              <p class="title">幸福程度</p>
              <p class="text">{{ '-/-' }}</p>
            </li>
            <li>
              <p class="title">河流等级</p>
              <p class="text">{{ '-/-' }}</p>
            </li>
            <li>
              <p class="title">河流长度</p>
              <p class="text">{{ '-/-' }}km</p>
            </li>
            <li>
              <p class="title">幸福码</p>
              <p class="text">
                <el-popover placement="bottom" title="非常幸福" width="200" trigger="click">
                  <el-button slot="reference">点击查看</el-button>
                </el-popover>
              </p>
            </li>
          </ul>
          <ul class="contentBottom">
            <li class="active">
              <div class="titleWrap">
                <p class="title">{{ '-/-' }}</p>
                <p class="computed">计算公式</p>
              </div>
              <div class="result">
                <p>{{ '-/-' }}</p>
              </div>
            </li>
          </ul>
        </div>
        <div class="footer">
          <div class="footerTitle">
            <span>指标详情</span>
          </div>
          <div class="footerContent">
            <div class="title">
              <p>区水利局</p>
            </div>
            <div v-if="itemDetailData.indexType === ''" class="wrap wrap4">
              <p>暂无数据</p>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      riverDialogVisible: false,
      itemDetailData: {
        indexType: '',
      },
    }
  },
  methods: {
    open() {
      this.riverDialogVisible = true
    },
  },
}
</script>
<style lang="less" scoped>
.markTownMain {
  position: relative;
  .mark {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    width: 760px;
    min-height: 613px;
    background-color: rgba(7, 63, 91, 0.9);
    color: #fff;
    box-shadow: -5px 3px 14px 0 rgba(84, 93, 105, 0.24);
    border-radius: 3px;
    // padding: 20px;
    box-sizing: border-box;
    z-index: 100;
  }
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 56px;
    border-radius: 3px 3px 0 0;
    padding: 0 20px;
    position: relative;
    background-color: #1890ff;
    color: #fff;
    .headerLeft {
      width: 150px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      p {
        width: 64px;
        height: 20px;
        line-height: 20px;
        font-size: 12px;
        color: #52c41a;
        background-color: #f6ffed;
        text-align: center;
        border-radius: 5px;
      }
    }
    .headerRight {
      p {
        cursor: pointer;
        i {
          margin-left: 5px;
        }
      }
    }
    .closeWrap {
      width: 20px;
      height: 20px;
      position: absolute;
      top: 15px;
      right: 15px;
      cursor: pointer;
      text-align: center;
      line-height: 20px;
      font-size: 22px;
    }
  }
  .content {
    margin: 0 auto;
    padding: 20px;
    min-height: 260px;
    .contentTop {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 20px;
      li {
        min-width: 230px;
        line-height: 24px;
        padding: 5px 0;
        .title {
          font-weight: bold;
        }
        .text {
          color: #999;
        }
        .el-button {
          border: none;
          padding: 0;
          color: #1890ff;
        }
        .el-button:hover,
        .el-button:focus {
          background-color: #fff;
        }
      }
    }
    .contentBottom {
      display: flex;
      flex-wrap: wrap;
      li {
        width: 230px;
        height: 80px;
        margin: 0 10px 10px 0;
        background-color: rgba(7, 63, 91, 0.9);
        display: flex;
        justify-content: space-between;
        padding: 14px;
        box-sizing: border-box;
        cursor: pointer;
        .titleWrap {
          color: #666;
          font-size: 15px;
          .computed {
            font-size: 14px;
            margin-top: 12px;
            color: #999;
          }
        }
        .result {
          font-size: 18px;
          color: #666;
        }
      }
      .active {
        background-color: rgba(7, 63, 91, 0.9);
      }
    }
  }
  .footer {
    .footerTitle {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      padding: 0 20px;
      img {
        margin-right: 13px;
      }
      span {
        color: #666;
      }
    }
    .footerContent {
      margin: 0 20px;
      height: 130px;
      font-size: 14px;
      color: #2572f1;
      padding: 20px;
      box-sizing: border-box;
      position: relative;
      background-color: rgba(7, 63, 91, 0.9);
      .title {
        height: 20px;
        line-height: 20px;
        padding: 0 8px;
        position: absolute;
        top: 10px;
        right: 10px;
        color: #666;
        img {
          margin-right: 10px;
        }
        p {
          min-width: 74px;
        }
      }
      .wrap {
        font-size: 16px;
        display: flex;
      }
      .wrap1 {
        align-items: center;
        .middle {
          li {
            min-height: 40px;
            line-height: 20px;
            text-align: center;
            padding: 5px 0;
          }
          li:nth-of-type(1) {
            border-bottom: 1px solid #aec4d8;
          }
        }
        .middle1 {
          max-width: 310px;
        }
        .middle2 {
          li {
            height: 30px;
            line-height: 30px;
          }
        }
        .equal {
          margin: 0 20px;
        }
      }
      .wrap2 {
        height: 100%;
        flex-direction: column;
        justify-content: space-around;
        flex-wrap: wrap;
        .top,
        .bottom {
          width: 100%;
        }
        .bottom,
        .score {
          display: flex;
        }
        :deep(.score) {
          align-items: center;
          margin-right: 30px;
          // .title{
          //   margin-right: 5px;
          // }
          .el-rate {
            margin-left: 5px;
          }
          .el-rate__text {
            position: relative;
            top: 1px;
          }
        }
      }
      .wrap3 {
        height: 100%;
        flex-wrap: wrap;
        flex-direction: column;
        justify-content: space-between;
        .top,
        .middle,
        .bottom {
          width: 100%;
        }
        .bottom {
          display: flex;
          .evaluate {
            display: flex;
            align-items: center;
            border: 1px solid #1890ff;
            margin-right: 10px;
            padding: 2px 5px;
            border-radius: 3px;
            font-size: 14px;
            cursor: pointer;
            img {
              width: 15px;
              height: 15px;
              margin: 0 5px;
            }
          }
        }
      }
      .wrap4 {
        text-align: center;
        line-height: 80px;
        p {
          width: 100%;
        }
      }
    }
  }
}
</style>
