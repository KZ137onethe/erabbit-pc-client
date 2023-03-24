// ? 这里定义 用户 相关的接口
import { request } from './request'

/** ? 账号登录
 * @param {String} account -- 用户账号
 * @param {String} password -- 用户密码
 */
export const _userAccountLogin = ({ account, password }) => {
	return request('/login', 'post', { account, password })
}

/**
 * ? 发送手机的短信验证码
 * @param {Number} phone -- 手机号
 * @returns Object
 */
export const _userGetVerificationCode = ({ phone }) => {
	return request('/login/code', 'get', { mobile: phone })
}

/**
 * ? 短信登录
 * @param {Number} phone -- 手机号
 * @param {Number} verificationCode -- 验证码
 * @returns Object
 */
export const _userSMSLogin = ({ phone, verificationCode }) => {
	return request('/login/code', 'post', { mobile: phone, code: verificationCode })
}

/**
 * 第三方登录
 * @param {*} unionId -- QQ的唯一标识
 * @param {*} source -- 注册来源，1为pc，2为webapp，3为微信小程序，4为Android，5为ios,6为qq,7为微信
 * @returns Object
 */
export const _userQQLogin = ({ unionId, source = 6 }) => {
	return request('/login/social', 'post', { unionId, source })
}

/**
 * 第三方QQ登录时，绑定手机号，发送验证码
 * @param {Number} phone -- 手机号
 * @returns
 */
export const _userQQBindGetVerificationCode = (phone) => {
	return request('/login/social/code', 'get', { mobile: phone })
}

/**
 * 第三方QQ登录时，绑定手机号
 * @param { String } unionId -- 第三方登录QQ唯一标识
 * @param { Number } mobile -- 手机号
 * @param { Number } verificationCode -- 验证码
 * @returns
 */
export const _userQQBindPhone = ({ unionId, mobile, verificationCode }) => {
	return request('/login/social/bind', 'post', { unionId, mobile, code: verificationCode })
}

/**
 * 检查用户账号是否唯一
 * @param {string} account -- 用户账号名
 * @returns
 */
export const _userCheckAccount = (account) => {
	return request('/register/check', 'get', { account })
}

/**
 * 第三方登录，完善用户信息接口 => 没有官网账号
 * @param {string} unionId  -- QQ的唯一标识
 * @param {Object} { account, phone, verificationCode, password } -- 用户账号名,用户手机号,手机验证码,账号密码
 * @returns
 */
export const _userQQPatchAccount = (unionId, { account, phone, verificationCode, password }) => {
	return request(`/login/social/${unionId}/complement`, 'post', { account, mobile: phone, code: verificationCode, password })
}

/**
 * PC端，用户注册接口时，获取手机验证码
 * @param {*} phone -- 手机号
 * @returns
 */
export const _userPCRegisterVerificationCode = (phone) => {
	return request('/register/code', 'get', { mobile: phone })
}

/**
 * PC端，用户注册接口
 * @param {} account -- 用户账号名
 * @param {} phone -- 手机号
 * @param {} verificationCode -- 验证码
 * @param {} password -- 用户账号密码
 * @returns
 */
export const _userPCRegister = ({ account, phone, verificationCode, password }) => {
	return request('/register', 'post', { account, mobile: phone, code: verificationCode, password })
}
