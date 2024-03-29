// ? 这里定义 用户 相关的接口
import request from "@/utils/request.js"

/** ? 账号登录
 * @param {String} account -- 用户账号
 * @param {String} password -- 用户密码
 */
function _userAccountLogin({ account, password }) {
  return request({
    url: "/login",
    method: "post",
    headers: {
      isToken: false,
    },
    data: { account, password },
  })
}

/**
 * ? 发送手机的短信验证码
 * @param {Number} phone -- 手机号
 * @returns Object
 */
function _userGetVerificationCode(phone) {
  return request({
    url: "/login/code",
    method: "get",
    headers: {
      isToken: false,
    },
    params: { mobile: phone },
  })
}

/**
 * ? 短信登录
 * @param {Number} phone -- 手机号
 * @param {Number} verificationCode -- 验证码
 * @returns Object
 */
function _userSMSLogin({ phone, verificationCode }) {
  return request({
    url: "/login/code",
    method: "post",
    headers: {
      isToken: false,
    },
    data: {
      mobile: phone,
      code: verificationCode,
    },
  })
}

/**
 * 第三方登录
 * @param {*} unionId -- QQ的唯一标识
 * @param {*} source -- 注册来源，1为pc，2为webapp，3为微信小程序，4为Android，5为ios,6为qq,7为微信
 * @returns Object
 */
function _userQQLogin({ unionId, source = 6 }) {
  return request({
    url: "/login/social",
    method: "post",
    headers: {
      isToken: false,
    },
    data: {
      unionId,
      source,
    },
  })
}

/**
 * 第三方QQ登录时，绑定手机号，发送验证码
 * @param {Number} phone -- 手机号
 * @returns
 */
function _userQQBindGetVerificationCode(phone) {
  return request({
    url: "/login/social/code",
    method: "get",
    headers: {
      isToken: false,
    },
    params: {
      mobile: phone,
    },
  })
}

/**
 * 第三方QQ登录时，绑定手机号
 * @param { String } unionId -- 第三方登录QQ唯一标识
 * @param { Number } mobile -- 手机号
 * @param { Number } verificationCode -- 验证码
 * @returns
 */
function _userQQBindPhone({ unionId, mobile, verificationCode }) {
  return request({
    url: "/login/social/bind",
    method: "post",
    headers: {
      isToken: false,
    },
    data: {
      unionId,
      mobile,
      code: verificationCode,
    },
  })
}

/**
 * 检查用户账号是否唯一
 * @param {string} account -- 用户账号名
 * @returns
 */
function _userCheckAccount(account) {
  return request({
    url: "/register/check",
    method: "get",
    headers: {
      isToken: false,
    },
    params: {
      account,
    },
  })
}

/**
 * 第三方登录，完善用户信息接口 => 没有官网账号
 * @param {string} unionId  -- QQ的唯一标识
 * @param {Object} { account, phone, verificationCode, password } -- 用户账号名,用户手机号,手机验证码,账号密码
 * @returns
 */
function _userQQPatchAccount(unionId, { account, phone, verificationCode, password }) {
  return request({
    url: `/login/social/${unionId}/complement`,
    method: "post",
    headers: {
      isToken: false,
    },
    data: {
      account,
      mobile: phone,
      code: verificationCode,
      password,
    },
  })
}

/**
 * PC端，用户注册接口时，获取手机验证码
 * @param {*} phone -- 手机号
 * @returns
 */
function _userPCRegisterVerificationCode(phone) {
  return request({
    url: "/register/code",
    method: "get",
    headers: {
      isToken: false,
    },
    params: {
      mobile: phone,
    },
  })
}

/**
 * PC端，用户注册接口
 * @param {} account -- 用户账号名
 * @param {} phone -- 手机号
 * @param {} verificationCode -- 验证码
 * @param {} password -- 用户账号密码
 * @returns
 */
function _userPCRegister({ account, phone, verificationCode, password }) {
  return request({
    url: "/register",
    method: "post",
    headers: {
      isToken: false,
    },
    data: {
      account,
      mobile: phone,
      code: verificationCode,
      password,
    },
  })
}

export default {
  _userAccountLogin,
  _userGetVerificationCode,
  _userSMSLogin,
  _userQQLogin,
  _userQQBindGetVerificationCode,
  _userQQBindPhone,
  _userCheckAccount,
  _userQQPatchAccount,
  _userPCRegisterVerificationCode,
  _userPCRegister,
}
