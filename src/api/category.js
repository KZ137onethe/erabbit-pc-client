import { request } from "@/utils/request.js"
// ? 获取首页头部的分类数据
function _findAllCategory() {
  return request("/home/category/head", "get")
}

// ? 获取顶级分类的类目信息
function _findTopCategory(topCategoryId) {
  return request("/category", "get", { id: topCategoryId })
}

// ? 获取二级分类下的类目数据
function _findSubCategoryFilter(subCategoryId) {
  return request("/category/sub/filter", "get", { id: subCategoryId })
}

/**
 * 获取分类下的商品（带筛选条件）
 * @param {Object} params - 可参考接口文档 /temporary
 */
function _findSubCategoryGoods(params) {
  return request("/category/goods/temporary", "post", params)
}

export default {
  _findAllCategory,
  _findTopCategory,
  _findSubCategoryFilter,
  _findSubCategoryGoods,
}
