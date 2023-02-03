/*
 * @Author: bifang
 * @Date: 2022-11-23 11:59:00
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-02-03 10:36:25
 * @FilePath: /river-lake-cockpit-front/src/utils/crypt.js
 */
// crypto.js 文件
import CryptoJS from "crypto-js";
//秘钥 和后端协定好
//解密key
// var decryptKey = CryptoJS.enc.Latin1.parse("01187703B39C712B7FE74E0018516DDB");
// 加密key
// var encryptKey = CryptoJS.enc.Latin1.parse("EA53FD5B6D828F4BCBE410D2C3DB848B");
// 偏移量
var iv = CryptoJS.enc.Latin1.parse("");
export const encrypt = (
  data,
  encryptKey = "EA53FD5B6D828F4BCBE410D2C3DB848B"
) => {
  if (!data) return "";
  var srcs = CryptoJS.enc.Utf8.parse(data);
  encryptKey = CryptoJS.enc.Latin1.parse(encryptKey);
  var encrypted = CryptoJS.AES.encrypt(srcs, encryptKey, {
    iv: iv,
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.toString();
};
//加密

//解密
export const decrypt = (
  encrypted,
  decryptKey = "01187703B39C712B7FE74E0018516DDB"
) => {
  if (!encrypted) return "";
  let phoneReg = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/;
  if (phoneReg.test(encrypted)) {
    return encrypted;
  }
  decryptKey = CryptoJS.enc.Latin1.parse(decryptKey);
  var decrypted = CryptoJS.AES.decrypt(encrypted, decryptKey, {
    iv: iv,
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
};

// 返回带星号的手机号
export const backEncryptionPhone = (encrypted) => {
  if (!encrypted) return "";
  let temp = decrypt(encrypted);
  if (!temp) return "";
  return temp.replace(/^(.{3})(?:\d+)(.{4})$/, "$1****$2");
};
