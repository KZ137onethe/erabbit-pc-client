import { request } from './request.js'

/**
 * 获取最新的商品信息
 * @param {String} skuId -- 商品信息
 * return Promise
 */

export const _getGoodsInfoNewest = (skuId) => {
	return request(`/goods/stock/${skuId}`, 'get')
}
