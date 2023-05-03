import { request } from '@/utils/request.js'

/**
 * 获取最新的商品信息
 * @param {String} skuId -- 商品规格唯一id
 * return Promise
 */
export function _getGoodsInfoNewest(skuId) {
	return request(`/goods/stock/${skuId}`, 'get')
}

/**
 * 获取购物车中的规格数据
 * @param {String} skuId -- 商品规格唯一id
 * @returns
 */
export function _getCartSku(skuId) {
	return request(`/goods/sku/${skuId}`, 'get')
}

/**
 * 登录后，合并本地购物车
 * @param {Array<object>} localCartList -- 本地购物车数组（集合）
 * object 必须包含 skuId, selected, count 这三个字段
 * @returns
 */
export function _mergeLocalCart(localCartList) {
	return request(`/member/cart/merge`, 'post', localCartList)
}

/**
 * 登录状态下，获取购物车列表
 */
export function _getCartList() {
	return request('/member/cart', 'get')
}

/**
 * 登录状态下，添加商品至购物车
 * @param {String} skuId -- 商品规格唯一id
 * @param {Number} count -- 商品数量
 * @returns
 */
export function _addCart({ skuId, count }) {
	return request('/member/cart', 'post', { skuId, count })
}

/**
 * 登录状态下，删除购物车商品
 * @param {Array<string>} ids -- skuId数组集合
 * @returns
 */
export function _deleteCart(ids) {
	return request('/member/cart', 'delete', { ids: ids })
}

/**
 * 登录状态下，修改购物车商品的数量
 * @param {String} skuId -- 商品规格唯一id
 * @param {Boolean} selected -- 商品选择状态
 * @param {Number} count -- 商品数量
 * @returns
 */
export function _modifyCart({ skuId, selected, count }) {
	return request(`/member/cart/${skuId}`, 'put', { selected, count })
}

/**
 * 登录状态下，全选和反选操作
 * @param {Boolean} selected -- 商品选择状态
 * @param {Array<string>} ids -- skuId数组集合
 * @returns
 */
export function _checkCartAllSelected({ selected, ids }) {
	return request(`/member/cart/selected`, 'put', { selected, ids: ids })
}
