/*
 * @Author: bifang
 * @Date: 2023-02-02 16:53:13
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-02-03 14:40:13
 * @FilePath: /river-lake-cockpit-front/src/utils/rsa.js
 */
import JSEncrypt from "jsencrypt";
import moment from "moment";
import { encrypt } from "@/utils/crypt";
import { getAuthSign } from "@/apis/common";
/**
 *
 * @param {*} pubKey 公钥
 * @param {*} str 加密数据 moduleId + userId + date 8位日期
 * @returns
 */
export function encodeRsa(pubKey, str) {
  let encrypt = new JSEncrypt();
  encrypt.setPublicKey(pubKey);
  let encrypted = encrypt.encrypt(str);
  return encrypted;
}
/**
 * getPublicSign 外部应用调取获取加密后的sign
 * @param {*} moduleId 应用编号
 * @param {*} userId 用户编号
 * @returns publicSign 公钥 sign
 */
export function getPublicSign(moduleId, userId) {
  return new Promise((res) => {
    const dateKey = moment().format("YYYYMMDD");
    // publicKey 为aes加密的 密钥
    const publicKey = "waterOne" + dateKey;
    const sign = encrypt(moduleId + userId, publicKey);
    getAuthSign({
      moduleId,
      sign,
      userId,
    }).then((publicSign) => {
      res(publicSign);
    });
  });
}

/**
 * 返回rsa加密后的SecretText
 * @param {*} sign 公钥
 * @param {*} strText moduleId + userId
 * @returns secretText rsa加密后的SecretText
 */
export function getSecretText(sign, strText) {
  const dateKey = moment().format("YYYYMMDD");
  return encodeRsa(sign, strText + dateKey);
}
