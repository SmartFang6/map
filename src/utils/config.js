export function getDomainName() {
  // return location.origin;
  return process.env.VUE_APP_ENV === "dev"
    ? "https://web.dcyun.com:48467"
    : location.origin;
}
