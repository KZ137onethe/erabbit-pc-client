import { request } from './request.js'

/**
 * 获取结算信息
 * @returns
 */
export function _getCheckoutInfo() {
	return request('/member/order/pre', 'get')
}
