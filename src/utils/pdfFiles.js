// 处理绩效 -> 考核制度的PDF文件信息配置
import { reactive } from "vue";

export const pdfFiles = reactive([
  {
    adcd: "330327", // 行政区划代码
    adnm: "温州苍南县", // 行政区划名称
    source:
      "https://zjwater-easyv-files.oss-cn-hangzhou-zwynet-d01-a.internet.cloud.zj.gov.cn/kaohejifen.pdf", //预览pdf文件的地址
    pageNum: 1, //第几页
    scale: 1, // 缩放比例
    numPages: 0, // 总页数
  },
  {
    adcd: "330502",
    adnm: "湖州吴兴区",
    source: "",
    pageNum: 1,
    scale: 1,
    numPages: 0,
  },
  {
    adcd: "330902",
    adnm: "舟山定海区",
    source:
      "https://zjwater-easyv-files.oss-cn-hangzhou-zwynet-d01-a.internet.cloud.zj.gov.cn/dinghai.pdf",
    pageNum: 1,
    scale: 1,
    numPages: 0,
  },
  {
    adcd: "330182",
    adnm: "杭州建德市",
    source: "",
    pageNum: 1,
    scale: 1,
    numPages: 0,
  },
  {
    adcd: "330782",
    adnm: "金华义乌市",
    source: "",
    pageNum: 1,
    scale: 1,
    numPages: 0,
  },
]);
