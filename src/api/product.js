import request from "@/utils/request.js"

// 定义获得商品详情的接口
function _findGoodsDetail(id) {
  return request({
    url: "/goods",
    method: "get",
    params: {
      id,
    },
  })
}

/**
 *定义获取同类商品推荐的接口 | 猜你好物的接口
 * @param {Object} {id, limit}
 * @returns {Object}
 */
function _findGoodsRelevant({ id, limit }) {
  return request({
    url: "/goods/relevant",
    method: "get",
    params: {
      id,
      limit,
    },
  })
}

/**
 * 定义商品热销榜数据的接口
 * @param {*} id 商品id
 * @param {*} limit 数量限制
 * @param {*} type 热销类型，1为24小时，2为周榜，3为总榜，默认为1
 * @returns {Object}
 */
function _findGoodsHot({ id, limit, type }) {
  return request({
    url: "/goods/hot",
    method: "get",
    params: {
      id,
      limit,
      type,
    },
  })
}

/**
 * 定义商品评价信息的接口
 * @param {Number} id 商品id
 */
function _findGoodsCommentInfo({ id }) {
  return request({
    url: `/goods/${id}/evaluate`,
    method: "get",
  })
}

/**
 * 定义商品评价分页数据
 * @param {Number} id 商品id
 * @param {Object} query 筛选参数
 */
function _findGoodsCommentData({ id, params }) {
  return request({
    url: `https://mock.boxuegu.com/mock/1175/goods/${id}/evaluate/page`,
    method: "get",
    params,
  })
}

export default {
  _findGoodsDetail,
  _findGoodsRelevant,
  _findGoodsHot,
  _findGoodsCommentInfo,
  _findGoodsCommentData,
}
