// ? 这里定义 用户 相关的接口
import { request } from './request'

/** ? 账号登录
 * @param {String} account -- 用户账号
 * @param {String} password -- 用户密码
 */
const _userAccountLogin = ({ account, password }) => {
	return request('/login', 'post', { account, password })
}

/**
 * ? 短信登录
 * @param {Number} phone -- 手机号
 * @param {Number} verificationCode -- 验证码
 * @returns Object
 */
const _userSMSLogin = ({ phone, verificationCode }) => {
	return request('/login/code', 'post', { mobile: phone, code: verificationCode })
}

/**
 * ? 发送短信验证码
 * @param {Number} phone -- 手机号
 * @returns Object
 */
const _userGetVerificationCode = ({ phone }) => {
	return request('/login/code', 'get', { mobile: phone })
}

export { _userAccountLogin, _userSMSLogin, _userGetVerificationCode }
