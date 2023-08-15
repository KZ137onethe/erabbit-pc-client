import request from "@/utils/request.js"

/**
 * 获取最新的商品信息
 * @param {String} skuId -- 商品规格唯一id
 * return Promise
 */
function _getGoodsInfoNewest(skuId) {
  return request({
    url: `/goods/stock/${skuId}`,
    method: "get",
  })
}

/**
 * 获取购物车中的规格数据
 * @param {String} skuId -- 商品规格唯一id
 * @returns
 */
function _getCartSku(skuId) {
  return request({
    url: `/goods/sku/${skuId}`,
    method: "get",
  })
}

/**
 * 登录后，合并本地购物车
 * @param {Array<object>} localCartList -- 本地购物车数组（集合）
 * object 必须包含 skuId, selected, count 这三个字段
 * @returns
 */
function _mergeLocalCart(localCartList) {
  return request({
    url: `/member/cart/merge`,
    method: "post",
    data: {
      localCartList,
    },
  })
}

/**
 * 登录状态下，获取购物车列表
 */
function _getCartList() {
  return request({
    url: "/member/cart",
    method: "get",
  })
}

/**
 * 登录状态下，添加商品至购物车
 * @param {String} skuId -- 商品规格唯一id
 * @param {Number} count -- 商品数量
 * @returns
 */
function _addCart({ skuId, count }) {
  return request({
    url: "/member/cart",
    method: "post",
    data: {
      skuId,
      count,
    },
  })
}

/**
 * 登录状态下，删除购物车商品
 * @param {Array<string>} ids -- skuId数组集合
 * @returns
 */
function _deleteCart(ids) {
  return request({
    url: "/member/cart",
    method: "delete",
    params: {
      ids,
    },
  })
}

/**
 * 登录状态下，修改购物车商品的数量
 * @param {String} skuId -- 商品规格唯一id
 * @param {Boolean} selected -- 商品选择状态
 * @param {Number} count -- 商品数量
 * @returns
 */
function _modifyCart({ skuId, selected, count }) {
  return request({
    url: `/member/cart/${skuId}`,
    method: "put",
    data: {
      selected,
      count,
    },
  })
}

/**
 * 登录状态下，全选和反选操作
 * @param {Boolean} selected -- 商品选择状态
 * @param {Array<string>} ids -- skuId数组集合
 * @returns
 */
function _checkCartAllSelected({ selected, ids }) {
  return request({
    url: `/member/cart/selected`,
    method: "put",
    data: {
      selected,
      ids,
    },
  })
}

export default {
  _getGoodsInfoNewest,
  _getCartSku,
  _mergeLocalCart,
  _getCartList,
  _addCart,
  _deleteCart,
  _modifyCart,
  _checkCartAllSelected,
}
