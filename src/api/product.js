import { request } from './request'

// 定义获得商品详情的接口
export function _findGoodsDetail(id) {
	return request('/goods', 'get', { id })
}

/**
 *定义获取同类商品推荐的接口 | 猜你好物的接口
 * @param {Object} {id, limit}
 * @returns {Object}
 */
export function _findGoodsRelevant({ id, limit }) {
	return request('/goods/relevant', 'get', { id, limit })
}

/**
 * 定义商品热销榜数据的接口
 * @param {*} id 商品id
 * @param {*} limit 数量限制
 * @param {*} type 热销类型，1为24小时，2为周榜，3为总榜，默认为1
 * @returns {Object}
 */
export function _findGoodsHot({ id, limit, type }) {
	return request('/goods/hot', 'get', { id, limit, type })
}

/**
 * 定义商品评价信息的接口
 * @param {Number} id 商品id
 */
export function _findGoodsCommentInfo({ id }) {
	return request(`/goods/${id}/evaluate`, 'get')
}

/**
 * 定义商品评价分页数据
 * @param {Number} id 商品id
 * @param {Object} query 筛选参数
 */
export function _findGoodsCommentData({ id, params }) {
	// return request(`/goods/${id}/evaluate/page`, 'get', params)
	return request(`https://mock.boxuegu.com/mock/1175/goods/${id}/evaluate/page`, 'get', params)
}
