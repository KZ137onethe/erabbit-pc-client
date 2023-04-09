import { request } from './request'
// ? 获取首页头部的分类数据
export function _findAllCategory() {
	return request('/home/category/head', 'get')
}

// ? 获取顶级分类的类目信息
export function _findTopCategory(topCategoryId) {
	return request('/category', 'get', { id: topCategoryId })
}

// ? 获取二级分类下的类目数据
export function _findSubCategoryFilter(subCategoryId) {
	return request('/category/sub/filter', 'get', { id: subCategoryId })
}

/**
 * 获取分类下的商品（带筛选条件）
 * @param {Object} params - 可参考接口文档 /temporary
 */
export function _findSubCategoryGoods(params) {
	return request('/category/goods/temporary', 'post', params)
}
