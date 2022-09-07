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
import dayjs from "dayjs";
import store from "@/store";
export const getMD5_sign = (USERID = null) => {
  const date = new Date();
  const dateStr = dayjs(date).format("YYYY-MM-DD").replaceAll("-", "");
  const userId = USERID || store?.state?.userInfo?.userId;
  const text = dateStr + userId;
  const _res = md5(text).toLocaleUpperCase();
  return _res;
};
