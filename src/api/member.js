import { request } from '@/utils/request.js'

/**
 * 获取我的收藏
 * @param {*} page -- 页码
 * @param {*} pageSize -- 页码条数
 * @param {*} collectType -- 收藏类型 1为商品，2为专题，3为品牌
 */
export function _getCollect({ page = 1, pageSize = 10, collectType = 1 }) {
	return request('/member/collect', 'get', { page, pageSize, collectType })
}

/**
 * 获取我的足迹
 * @param {*} page -- 页码
 * @param {*} pageSize -- 页码条数
 */
export function _getHistory({ page, pageSize }) {
	return request('/member/browseHistory', 'get', { page, pageSize })
}

/**
 * 获取我的订单列表
 * @param {*} page -- 页码
 * @param {*} pageSize -- 页码条数
 * @param {*} orderState -- 订单状态，1为待付款、2为待发货、3为待收货、4为待评价、5为已完成、6为已取消，未传该参数或0为全部
 */
export function _getOrderList({ page, pageSize, orderState = 0 }) {
	return request('/member/order', 'get', { page, pageSize, orderState })
}

/**
 * 取消订单
 * @param {*} orderId 订单Id
 * @param {*} cancelReason 取消订单原因
 * @returns
 */
export function _cancelOrder({ orderId, cancelReason }) {
	return request(`/member/order/${orderId}/cancel`, 'put', { cancelReason })
}
