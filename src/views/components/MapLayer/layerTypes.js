/*------------------------------------------------------
¦ 图层类型
¦ 
¦ Author: 大风
¦ Date: 2022-09-13 12:51:06
¦ FilePath: src/views/components/MapLayer/layerTypes.js
¦------------------------------------------------------*/

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
      },
      {
        label: "水库",
        value: "reservoirLayer",
      },
      {
        label: "山塘",
        value: "hillpondLayer",
      },
      {
        label: "湖泊",
        value: "lakeLayer",
      },
      {
        label: "人工水道",
        value: "canalLayer",
      },
      {
        label: "其他水域",
        value: "otherwaterLayer",
      },
    ],
  },
  {
    title: "涉水项目",
    items: [
      {
        label: "完工",
        value: "finishedProj",
      },
      {
        label: "在建",
        value: "buildingProj",
      },
    ],
  },
  {
    title: "监测点",
    items: [
      {
        label: "视频点",
        value: "videoLayer",
      },
      {
        label: "水质断面",
        value: "sectionLayer",
      },
    ],
  },
];
