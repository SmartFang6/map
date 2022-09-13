export function getDomainName() {
  // return location.origin;
  return process.env.VUE_APP_ENV === "prod"
    ? location.origin
    : "https://web.dcyun.com:48467";
}
