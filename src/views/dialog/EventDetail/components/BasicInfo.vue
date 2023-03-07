<!--
  显示事件详情
-->
<template>
  <div class="descriptions-container highlight-title">
    <div class="accept-basic">
      <div class="descriptions">
        <el-descriptions title="事件详情" direction="vertical" :column="2">
          <el-descriptions-item label="上报时间">
            {{
              eventDetailVO?.reportTime &&
              moment(eventDetailVO?.reportTime).format("YYYY-MM-DD")
            }}
          </el-descriptions-item>
          <el-descriptions-item label="上报人员">
            {{ eventDetailVO?.reportUser }}
          </el-descriptions-item>
          <el-descriptions-item label="发现手段">
            {{ eventDetailVO?.eventDiscoveryMethodName }}
          </el-descriptions-item>
          <el-descriptions-item label="事件来源">
            {{ eventDetailVO?.eventSourceName }}
          </el-descriptions-item>
          <el-descriptions-item label="事件类型">
            {{ eventDetailVO?.eventTypeName }}
          </el-descriptions-item>
          <el-descriptions-item label="事件等级">
            {{ eventDetailVO?.eventGradeName }}
          </el-descriptions-item>
          <el-descriptions-item label="所属区域">
            {{ eventDetailVO?.adnm }}
          </el-descriptions-item>
          <el-descriptions-item label="所属河湖">
            {{ eventDetailVO?.rchnm }}
          </el-descriptions-item>
          <el-descriptions-item label="水域类型">
            {{ eventDetailVO?.waterAreaTypeName }}
          </el-descriptions-item>
          <el-descriptions-item label="发生时间">
            {{
              eventDetailVO?.occurTime &&
              moment(eventDetailVO?.occurTime).format("YYYY-MM-DD")
            }}
          </el-descriptions-item>
          <el-descriptions-item label="地理坐标">
            {{
              `${eventDetailVO?.longitude?.toFixed(
                6
              )} , ${eventDetailVO?.latitude?.toFixed(6)}`
            }}
          </el-descriptions-item>
          <el-descriptions-item label="位置描述">
            {{ eventDetailVO?.location }}
          </el-descriptions-item>
          <el-descriptions-item :span="2" label="事件描述">
            {{ eventDetailVO?.eventDescription }}
          </el-descriptions-item>

          <template #extra>
            <div class="map">
              <Map :location="location" />
            </div>
          </template>
        </el-descriptions>
      </div>
    </div>

    <el-descriptions class="files-content" direction="vertical" :column="1">
      <el-descriptions-item label="事件图片" class-name="vertical-align-top">
        <div class="file-list">
          <template
            v-for="(imageItem, index) in eventDetailVO?.imageFileInfoList"
            :key="imageItem?.fileId"
          >
            <el-image
              class="img"
              :src="imageItem?.relativeUrl"
              :initial-index="index"
              :preview-src-list="
                eventDetailVO?.imageFileInfoList.map((item) => item.relativeUrl)
              "
            />
          </template>
          <template
            v-if="
              !eventDetailVO?.imageFileInfoList ||
              eventDetailVO?.imageFileInfoList?.length <= 0
            "
          >
            <div class="file blank">
              <el-icon><Link /></el-icon>
            </div>
          </template>
        </div>
      </el-descriptions-item>
      <el-descriptions-item label="事件附件" class-name="vertical-align-top">
        <div class="file-list">
          <template
            v-for="fileItem in eventDetailVO?.pdfFileInfoList"
            :key="fileItem?.fileId"
          >
            <File :src="fileItem?.relativeUrl" />
          </template>
          <template
            v-if="
              !eventDetailVO?.pdfFileInfoList ||
              eventDetailVO?.pdfFileInfoList?.length <= 0
            "
          >
            <div class="file blank">
              <el-icon><Link /></el-icon>
            </div>
          </template>
        </div>
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>
import File from "@/components/File";
import { toRefs, reactive, watch } from "vue";
import Map from "@/views/OLMap/ReadMap";
import moment from "moment";
import { Link } from "@element-plus/icons-vue";

export default {
  name: "BasicInfo",
  components: {
    File,
    Map,
    Link,
  },
  props: {
    /**
     * 事件详情
     */
    details: {
      type: Object,
      default: () => null,
    },
  },
  setup(props) {
    const state = reactive({
      // 事件详情对象
      eventDetailVO: null,
    });

    watch(
      () => props.details,
      (details) => {
        state.eventDetailVO = reactive(JSON.parse(JSON.stringify(details)));
        state.location = {
          latitude: state.eventDetailVO?.latitude,
          longitude: state.eventDetailVO?.longitude,
          address: state.eventDetailVO?.location,
          adcd: state.eventDetailVO?.adcd,
        };
      },
      {
        immediate: true,
      }
    );

    const getLocation = ({ longitude, latitude }) => {
      state.eventDetailVO.longitude = longitude;
      state.eventDetailVO.latitude = latitude;
    };

    return {
      ...toRefs(state),
      getLocation,
      moment,
    };
  },
};
</script>

<style lang="less" scoped>
.accept-basic {
  display: flex;
  .descriptions {
    width: 100%;
    flex: 1;
  }
  .map {
    //width: 532px;
    //height: 439px;
    background: #ddd;
    margin-top: 50px;
    overflow: hidden;

    // version 2
    position: absolute;
    border-radius: 4px;
    border: solid 4px rgba(89, 126, 248, 0.4);
    width: 357px;
    height: 475px;
    right: 0;
    top: 18px;
  }
  :deep(.el-descriptions) {
    position: relative;
  }
  :deep(.el-descriptions__table) {
    width: 65%;
    min-height: 485px;
  }
}
.files-content {
  :deep(.el-descriptions__content.is-vertical-content) {
    border-bottom: none;
  }
}
.file-list {
  display: flex;
  flex-wrap: wrap;

  .file-wrapper {
    margin-right: 20px;
  }
}
.img,
.file {
  width: 148px;
  height: 120px;
  background-color: #e9ecf4;
  border-radius: 4px;
  margin-right: 20px;
}
.blank {
  display: flex;
  justify-content: center;
  align-items: center;
}
:deep(.vertical-align) {
  vertical-align: top;
}
</style>
