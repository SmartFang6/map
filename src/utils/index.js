// 点击五次后才跳转后台
function toAdminProjectFn() {
  let count = 0;
  return (handel) => {
    count += 1;
    console.log(count);
    if (count > 5) {
      handel();
      count = 1;
    }
  };
}
export const awaitToAdminProject = toAdminProjectFn();
import md5 from "md5";
import * as dayjs from "dayjs";
import store from "@/store";
export const getMD5_sign = (USERID = null) => {
  const date = new Date();
  const dateStr = dayjs(date).format("YYYY-MM-DD").replaceAll("-", "");
  const userId = USERID || store?.state?.userInfo?.userId;
  const text = dateStr + userId;
  const _res = md5(text).toLocaleUpperCase();
  return _res;
};
/**
 * 适应性 px
 *
 * **/
export const adjustSize = (pxNum) => {
  let clientWidth =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
  if (!clientWidth || !pxNum) return pxNum;
  let adjustSize = (pxNum / 1920) * clientWidth;
  return adjustSize || pxNum;
};
