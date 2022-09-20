<template>
  <div class="map-pop">
    <EventDetailDialog
      :info="info"
      v-model:visible="eventDetailDialogVisible"
    />
    <el-dialog v-model="dialogVisible" width="40%">
      <template #header>
        <div class="pop-title">
          <span>{{ info?.eventSourceName }}</span>
          <!-- <el-button text :type="getTag(info.eventGrade)">{{
            info?.eventTypeName
          }}</el-button> -->
          <el-tag
            :type="getTag(info.eventGrade)"
            size="small"
            class="tag"
            effect="dark"
          >
            {{ info.eventGradeName }}
          </el-tag>
        </div>
      </template>

      <!--#region 水域详情的标签选择区-->
      <div class="pop-tabs">
        <ul class="tabs-wrap">
          <li
            v-for="item in tabsList"
            :key="item.key"
            @click="tabClick(item)"
            :class="['tabs_item', item.key === activeTab ? 'active' : '']"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>
      <!--#endregion-->

      <!--#region '水域基础信息'标签的内容区-->
      <template v-if="activeTab === 1">
        <div class="pop-cont">
          <ul>
            <li>
              <span class="label">所属地区：</span>
              <span class="value">建德市</span>
            </li>
            <li>
              <span class="label">所属流域：</span>
              <span class="value">独流入海小水系</span>
            </li>
            <li>
              <span class="label">平均宽度：</span>
              <span class="value">12.4m</span>
            </li>
            <li>
              <span class="label">河流长度：</span>
              <span class="value">2.40km</span>
            </li>
            <li>
              <span class="label">起点：</span>
              <span class="value">xxxxx村</span>
            </li>
            <li>
              <span class="label">终点：</span>
              <span class="value">xxxxx村</span>
            </li>
            <li>
              <span class="label">水域面积：</span>
              <span class="value">998m²</span>
            </li>
            <li>
              <span class="label">是否为重要水域：</span>
              <span class="value">是</span>
            </li>
          </ul>
        </div>
      </template>
      <!--#endregion-->

      <!--#region '水域事件'标签的内容区-->
      <template v-else-if="activeTab === 2">
        <div class="pop-body">
          <div class="left-img">
            <el-carousel
              indicator-position="none"
              v-if="info.imageFileInfoList?.length > 0"
            >
              <el-carousel-item
                v-for="item in info.imageFileInfoList"
                :key="item.fileId"
              >
                <img :src="item.relativeUrl" alt="" class="left-img" />
              </el-carousel-item>
            </el-carousel>
            <img :src="noImg" alt="" v-else />
          </div>
          <ul>
            <li class="right-li">
              <span class="item-label">事件编号：</span>
              <el-tooltip
                :content="info?.eventId"
                effect="light"
                placement="top"
              >
                <span class="item-value">{{ info?.eventId }}</span>
              </el-tooltip>
            </li>
            <!-- <li class="right-li">
            <span class="item-label">问题来源：</span
            ><span class="item-value">{{ info.eventSourceName }}</span>
          </li> -->
            <!-- <li class="right-li">
            <span class="item-label">事件等级：</span
            ><span class="item-value">{{ info.eventGradeName }}</span>
          </li> -->
            <li class="right-li">
              <span class="item-label">责任部门：</span>
              <el-tooltip
                :content="info?.eventResponsibleUnitCodeName"
                effect="light"
                placement="top"
              >
                <span class="item-value">
                  {{ info?.eventResponsibleUnitCodeName }}
                </span>
              </el-tooltip>
            </li>
            <li class="right-li">
              <span class="item-label">所属区域：</span>
              <el-tooltip :content="info?.adnm" effect="light" placement="top">
                <span class="item-value">{{ info?.adnm }}</span>
              </el-tooltip>
            </li>
            <li class="right-li">
              <span class="item-label">所属河湖：</span>
              <el-tooltip :content="info?.rchnm" effect="light" placement="top">
                <span class="item-value">{{ info?.rchnm }}</span>
              </el-tooltip>
            </li>
            <li class="right-li">
              <span class="item-label">发生时间：</span>
              <el-tooltip
                :content="info?.occurTime"
                effect="light"
                placement="top"
              >
                <span class="item-value">{{ info?.occurTime }}</span>
              </el-tooltip>
            </li>
            <li class="right-li">
              <span class="item-label">事件状态：</span>
              <el-tooltip
                :content="info?.eventStatusName"
                effect="light"
                placement="top"
              >
                <span class="item-value">{{ info?.eventStatusName }}</span>
              </el-tooltip>
            </li>
          </ul>
        </div>
        <!-- 详情入口 -->
        <div class="footer" @click="onJupmDetail">
          <img
            src="@/assets/images/detail-icon.png"
            alt=""
            class="footer-img"
          />
          <span class="footer-text">查看详情</span>
        </div>
      </template>
      <!--#endregion-->

      <!--#region '涉水项目'标签的内容区-->
      <template v-else>
        <div class="pop-trunk">
          <div class="left-map">
            <Map :location="location" />
          </div>
          <ul>
            <li class="right-li">
              <span class="item-label">所在乡镇：</span>
              <el-tooltip :content="9" effect="light" placement="top">
                <span class="item-value">五连镇关山小区</span>
              </el-tooltip>
            </li>
            <li class="right-li">
              <span class="item-label">项目名称：</span>
              <el-tooltip :content="1" effect="light" placement="top">
                <span class="item-value">浙水东引项目</span>
              </el-tooltip>
            </li>
            <li class="right-li">
              <span class="item-label">类型：</span>
              <el-tooltip :content="2" effect="light" placement="top">
                <span class="item-value">人工河道</span>
              </el-tooltip>
            </li>
            <li class="right-li">
              <span class="item-label">联系人：</span>
              <el-tooltip :content="3" effect="light" placement="top">
                <span class="item-value">齐豫东</span>
              </el-tooltip>
            </li>
            <li class="right-li">
              <span class="item-label">占用水域名称：</span>
              <el-tooltip :content="4" effect="light" placement="top">
                <span class="item-value">豫东水流枝干</span>
              </el-tooltip>
            </li>
            <li class="right-li">
              <span class="item-label">实施状态：</span>
              <el-tooltip :content="5" effect="light" placement="top">
                <span class="item-value">运行中</span>
              </el-tooltip>
            </li>
            <li class="right-li">
              <span class="item-label">相关文件：</span>
              <el-tooltip :content="6" effect="light" placement="top">
                <span class="item-value">dinghai.pdf</span>
              </el-tooltip>
            </li>
          </ul>
        </div>
      </template>
      <!--#endregion-->
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import noImg from "@/assets/images/no-img.png";
// import { awaitToAdminProject } from "@/utils";
import store from "@/store";
import { ElMessage } from "element-plus";
import EventDetailDialog from "@/views/dialog/EventDetail/index";
import Map from "@/views/OLMap/ReadMap";

let dialogVisible = ref(false);
const eventDetailDialogVisible = ref(false);
let info = ref({});

// 事件等级颜色匹配
function getTag(val) {
  const typeMap = {
    1: "danger",
    2: "warning",
    3: "success",
  };
  return typeMap[val];
}

// 跳转后台详情
function onJupmDetail() {
  console.log("跳转后台详情", info.value);
  if (store?.state?.userInfo?.roleId === "065e6e9013954b09b013a1846499a720") {
    eventDetailDialogVisible.value = true;
  } else {
    ElMessage({
      message: "本功能暂未开放",
      type: "warning",
    });
  }
}

// 打开弹窗
function open(val) {
  info.value = val;
  // dialogVisible.value = true;
  eventDetailDialogVisible.value = true;
}

// 水域详情的标签页数组
const tabsList = reactive([
  {
    key: 1,
    name: "水域基础信息",
  },
  {
    key: 2,
    name: "水域事件",
  },
  {
    key: 3,
    name: "涉水项目",
  },
]);

// 激活的标签页
let activeTab = ref(1);

// tab 点击事件
const tabClick = (item) => {
  activeTab.value = item.key;
  console.log(item, activeTab);
};

// 地图的坐标信息
const location = ref({});

defineExpose({
  open,
});
</script>

<style lang="less" scoped>
.map-pop {
  :deep(.el-dialog) {
    background-color: rgba(#19385b, 0.8);
    color: white;
    border: 1px solid #64d2f7;
  }

  :deep(.el-dialog__headerbtn .el-dialog__close) {
    svg {
      display: none;
    }
    background: url(@/assets/images/close-icon.png);
    background-size: 100% 100%;
  }

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

  .pop-tabs {
    display: block;
    padding-bottom: 20px;
    box-sizing: border-box;
    .tabs-wrap {
      display: flex;
      align-items: center;
      .tabs_item {
        display: flex;
        width: auto;
        height: 30px;
        padding: 0 8px;
        border-radius: 4px;
        margin-left: 10px;
        align-items: center;
        font-size: 18px;
        font-weight: 400;
        background-color: #254875;
        color: #599cf7;
        cursor: pointer;
      }
      .tabs_item:first-child {
        margin-left: 0;
      }
      & > .active {
        background-color: #4378be;
        color: #fff;
      }
    }
  }

  .pop-body {
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    padding: 0 50px;

    .left-img {
      width: 268px;
      height: 100%;
    }

    .left-map {
      width: 358px;
      height: 348px;
    }

    ul {
      flex: 1;
      margin-left: 50px;

      li {
        display: flex;
        width: 100%;
        line-height: 30px;
        text-align: left;
        margin-bottom: 15px;
      }
    }

    .item-label {
      width: 100px;
      min-width: 78px;
      height: 30px;
      background: url(@/assets/images/pop-label.png);
      background-size: 100% 100%;
      color: #0adbe0;
      text-align: center;
      flex-shrink: 0;
    }

    .item-value {
      color: white;
      margin-left: 15px;
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden; //溢出内容隐藏
      text-overflow: ellipsis; //文本溢出部分用省略号表示
      display: -webkit-box; //特别显示模式
      -webkit-line-clamp: 2; //行数
      line-clamp: 2;
      -webkit-box-orient: vertical; //盒子中内容竖直排列
    }
  }

  .pop-cont {
    ul {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      li {
        display: flex;
        width: calc(100% / 2 - 5px);
        height: 44px;
        line-height: 44px;
        margin-right: 10px;
        margin-bottom: 10px;
        padding: 0 12px;
        background-color: #005273;
        box-shadow: inset 0 2px 1px 0 #0089be;
        text-align: left;
      }
      li:nth-child(2n) {
        margin-right: 0;
      }
      li:last-child {
        .label {
          width: 160px;
        }
      }
      .oneLine {
        width: 100%;
        margin-right: 0;
      }
    }

    .label {
      width: 120px;
      min-width: 78px;
      text-align: right;
      font-family: MicrosoftYaHei;
      font-size: 18px;
      color: #ffffff;
      flex-shrink: 0;
    }

    .value {
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

  .pop-trunk {
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;

    .left-map {
      height: 368px;
      flex: 1;
      align-self: flex-start;
    }

    ul {
      width: 298px;
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
      min-width: 90px;
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

  .footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-right: 40px;
    cursor: pointer;
    &-img {
      width: 27px;
      height: 28px;
    }
    &-text {
      font-size: 18px;
      font-weight: 700;
      color: #0adbe0;
      margin-left: 10px;
    }
  }
}
</style>
