import request from "@/utils/request.js"
// ? 获取首页头部的分类数据
function _findAllCategory() {
  return request({
    url: "/home/category/head",
    method: "get",
  })
}

// ? 获取顶级分类的类目信息
function _findTopCategory(topCategoryId) {
  return request({
    url: "/category",
    method: "get",
    params: {
      id: topCategoryId,
    },
  })
}

// ? 获取二级分类下的类目数据
function _findSubCategoryFilter(subCategoryId) {
  return request({
    url: "/category/sub/filter",
    method: "get",
    params: {
      id: subCategoryId,
    },
  })
}

/**
 * 获取分类下的商品（带筛选条件）
 * @param {Object} params - 可参考接口文档 /temporary
 */
function _findSubCategoryGoods(data) {
  return request({
    url: "/category/goods/temporary",
    method: "post",
    data,
  })
}

export default {
  _findAllCategory,
  _findTopCategory,
  _findSubCategoryFilter,
  _findSubCategoryGoods,
}
