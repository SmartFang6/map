import { ref, computed } from "vue";
import * as LayerEnum from "@/utils/LayerEnum"; // 图层id
// 地图弹窗 -----
// 视频点弹窗
import VideoDialog from "@/views/dialog/VideoDialog.vue";
// 水域弹窗
// 河道弹窗
import RiverDialog from "@/views/dialog/RiverDialog.vue";
// 湖泊弹窗
import LakeDialog from "@/views/dialog/LakeDialog.vue";
// 水库
import reservoirDialog from "@/views/dialog/ReservoirDialog";
// 山塘
import PoolDialog from "@/views/dialog/PoolDialog.vue";
// 人工水道弹窗
import CanalDialog from "@/views/dialog/CanalDialog.vue";
// 其他水域弹窗
import OtherwaterDialog from "@/views/dialog/OtherwaterDialog.vue";
// 涉河许可
import ProjectDialog from "@/views/dialog/ProjectDialog.vue";

// 弹窗组件
const dialogEmnu = {
  [LayerEnum.RIVER_LAYER]: { com: RiverDialog, width: "468px" }, // 河道弹窗
  [LayerEnum.LAKE_LAYER]: { com: LakeDialog, width: "468px" }, // 湖泊弹窗
  [LayerEnum.RESERVOIR_LAYER]: { com: reservoirDialog, width: "860px" }, // 水库弹窗
  [LayerEnum.HILLPOND_LAYER]: { com: PoolDialog, width: "860px" }, // 山塘
  [LayerEnum.OTHERWATER_LAYER]: { com: OtherwaterDialog, width: "468px" }, // 人工水道
  [LayerEnum.CANAL_LAYER]: { com: CanalDialog, width: "468px" }, // 其他水域
  [LayerEnum.VIDEO_LAYER]: { com: VideoDialog, width: "468px" }, // 视频弹窗
  [LayerEnum.WADING_PERMIT]: { com: ProjectDialog, width: "860px" }, // 涉河许可
};
export default function () {
  // 当前展示的弹窗
  const currentDialog = ref("");
  // 弹窗的宽度
  const DialogWidth = computed(() => {
    return dialogEmnu[currentDialog.value]?.width || "468px";
  });
  // 当前展示的弹窗组件
  const curDialogCom = computed(() => {
    return dialogEmnu[currentDialog.value]?.com;
  });
  return {
    currentDialog,
    DialogWidth,
    curDialogCom,
  };
}
