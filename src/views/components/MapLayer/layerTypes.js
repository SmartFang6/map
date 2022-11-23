/*------------------------------------------------------
¦ 图层类型
¦ 
¦ Author: 大风
¦ Date: 2022-09-13 12:51:06
¦ FilePath: src/views/components/MapLayer/layerTypes.js
¦------------------------------------------------------*/
import building from "@/assets/map/building.png";
import finish from "@/assets/map/finish.png";
const RiverLegend = [
  {
    name: "管理范围线",
    type: "lineManageLayer",
    style: "height:12px;background: rgb(255, 77, 101);",
  },
  {
    name: "临水线",
    type: "lineWaterLayer",
    style: "height:12px;background: rgb(255, 214, 51);",
  },
  {
    name: "中心线",
    type: "lineCenterLayer",
    style: "height:12px;background: rgb(255, 151, 0);",
  },
];
/**
 * 图层类型
 * @returns {Object[]}
 */
export default [
  {
    title: "水域调查",
    id: "waterAreaSurvey",
    items: [
      {
        label: "河道",
        value: "riverLayer",
        isShowChecked: true,
        type: "riverLayer",
        legend: RiverLegend,
        countId: "riverInfoQuantity",
      },
      {
        label: "水库",
        value: "reservoirLayer",
        isShowChecked: true,
        type: "riverLayer",
        legend: RiverLegend,
        countId: "reservoirInfoQuantity",
      },
      {
        label: "山塘",
        value: "hillpondLayer",
        isShowChecked: true,
        type: "riverLayer",
        legend: RiverLegend,
        countId: "hillypondInfoQuantity",
      },
      {
        label: "湖泊",
        value: "lakeLayer",
        isShowChecked: true,
        type: "riverLayer",
        legend: RiverLegend,
        countId: "lakeInfoQuantity",
      },
      {
        label: "人工水道",
        value: "canalLayer",
        isShowChecked: true,
        type: "riverLayer",
        legend: RiverLegend,
        countId: "artificialWaterwayInfoQuantity",
      },
      {
        label: "其他水域",
        value: "otherwaterLayer",
        isShowChecked: true,
        type: "riverLayer",
        legend: RiverLegend,
        countId: "otherWatersInfoQuantity",
      },
    ],
  },
  {
    title: "涉水项目",
    items: [
      {
        label: "涉河许可",
        type: "wadingPermit",
        value: "wadingPermit",
        isShowChecked: false,
        legend: [
          {
            name: "完工",
            type: "finishedProj",
            icon: finish,
          },
          {
            name: "在建",
            value: "buildingProj",
            icon: building,
          },
        ],
      },
    ],
  },
  {
    title: "监测点",
    items: [
      {
        label: "视频点",
        isShowChecked: true,
        value: "videoLayer",
      },
      // {
      //   label: "水质断面",
      //   value: "sectionLayer",
      // },
    ],
  },
];
