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
