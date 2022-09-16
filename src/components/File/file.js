/*--------------------------------------------
¦ 文件操作相关操作
¦
¦ @Author: 大风
¦ @Date: 2022-08-22 09:52:32
¦-------------------------------------------*/

/**
 * 文件类型对应文件后缀
 * @type {Object<any>}
 */
const suffixKeys = {
  pdf: ["pdf"],
  gif: ["gif"],
  png: ["png"],
  jpg: ["jpg", "jpeg"],
  zip: ["rar", "zip", "tar", "gz"],
  word: ["doc", "docx"],
  excel: ["xls", "xlsx", "csv", "xlt"],
  xml: ["xml"],
  svg: ["svg"],
  txt: ["txt"],
  other: ["other"],
};

/**
 * 文件后缀对应图标map
 * @type {WeakMap}
 */
const suffixIconMap = new WeakMap();
suffixIconMap.set(suffixKeys.pdf, require("./assets/pdf.svg"));
suffixIconMap.set(suffixKeys.gif, require("./assets/gif.svg"));
suffixIconMap.set(suffixKeys.png, require("./assets/png.svg"));
suffixIconMap.set(suffixKeys.jpg, require("./assets/jpg.svg"));
suffixIconMap.set(suffixKeys.zip, require("./assets/zip.svg"));
suffixIconMap.set(suffixKeys.word, require("./assets/doc.svg"));
suffixIconMap.set(suffixKeys.excel, require("./assets/excel.svg"));
suffixIconMap.set(suffixKeys.xml, require("./assets/xml.svg"));
suffixIconMap.set(suffixKeys.svg, require("./assets/svg.svg"));
suffixIconMap.set(suffixKeys.txt, require("./assets/txt.svg"));
suffixIconMap.set(suffixKeys.other, require("./assets/other.svg"));

/**
 * 获取文件图标
 * @param {string} src 文件资源地址或文件名
 */
export function getFileIcon(src) {
  const filePathArr = src.split(".");
  if (!Array.isArray(filePathArr) || filePathArr.length <= 0) {
    return suffixIconMap.get(suffixKeys.other);
  }

  const suffix = filePathArr.at(-1);
  const key = Object.keys(suffixKeys).find((key) =>
    suffixKeys[key].includes(suffix)
  );

  const icon = suffixIconMap.get(suffixKeys[key]);
  if (!key || !icon) {
    return suffixIconMap.get(suffixKeys.other);
  }

  return icon;
}
