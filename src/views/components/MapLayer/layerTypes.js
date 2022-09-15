/*------------------------------------------------------
¦ 图层类型
¦ 
¦ Author: 大风
¦ Date: 2022-09-13 12:51:06
¦ FilePath: src/views/components/MapLayer/layerTypes.js
¦------------------------------------------------------*/
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
    items: [
      {
        label: "河道",
        value: "riverLayer",
        type: "riverLayer",
        legend: RiverLegend,
      },
      {
        label: "水库",
        value: "reservoirLayer",
        type: "riverLayer",
        legend: RiverLegend,
      },
      {
        label: "山塘",
        value: "hillpondLayer",
        type: "riverLayer",
        legend: RiverLegend,
      },
      {
        label: "湖泊",
        value: "lakeLayer",
        type: "riverLayer",
        legend: RiverLegend,
      },
      {
        label: "人工水道",
        value: "canalLayer",
        type: "riverLayer",
        legend: RiverLegend,
      },
      {
        label: "其他水域",
        value: "otherwaterLayer",
        type: "riverLayer",
        legend: RiverLegend,
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
        legend: [
          {
            name: "完工",
            type: "finishedProj",
            count: 0,
          },
          {
            name: "在建",
            value: "buildingProj",
            count: 0,
          },
        ],
      },
      // {
      //   label: "完工",
      //   value: "finishedProj",
      // },
      // {
      //   label: "在建",
      //   value: "buildingProj",
      // },
    ],
  },
  {
    title: "监测点",
    items: [
      {
        label: "视频点",
        value: "videoLayer",
      },
      // {
      //   label: "水质断面",
      //   value: "sectionLayer",
      // },
    ],
  },
];
