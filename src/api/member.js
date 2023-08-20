import request from "@/utils/request.js"

/**
 * 获取我的收藏
 * @param {*} page -- 页码
 * @param {*} pageSize -- 页码条数
 * @param {*} collectType -- 收藏类型 1为商品，2为专题，3为品牌
 */
function _getCollect({ page = 1, pageSize = 10, collectType = 1 }) {
  return request(
    {
      url: "/member/collect",
      method: "get",
      params: {
        page,
        pageSize,
        collectType,
      },
    },
    true,
  )
}

/**
 * 获取我的足迹
 * @param {*} page -- 页码
 * @param {*} pageSize -- 页码条数
 */
function _getHistory({ page, pageSize }) {
  return request(
    {
      url: "/member/browseHistory",
      method: "get",
      params: {
        page,
        pageSize,
      },
    },
    true,
  )
}

/**
 * 获取我的订单列表
 * @param {*} page -- 页码
 * @param {*} pageSize -- 页码条数
 * @param {*} orderState -- 订单状态，1为待付款、2为待发货、3为待收货、4为待评价、5为已完成、6为已取消，未传该参数或0为全部
 */
function _getOrderList({ page, pageSize, orderState = 0 }) {
  return request({
    url: "/member/order",
    method: "get",
    params: {
      page,
      pageSize,
      orderState,
    },
  })
}

/**
 * 取消订单
 * @param {*} orderId 订单Id
 * @param {*} cancelReason 取消订单原因
 * @returns
 */
function _cancelOrder({ orderId, cancelReason }) {
  return request({
    url: `/member/order/${orderId}/cancel`,
    method: "put",
    data: {
      cancelReason,
    },
  })
}

/**
 * 删除订单
 * @param {Array} ids 删除订单id的数组
 */
function _deleteOrder(ids) {
  return request({
    url: "/member/order",
    method: "delete",
    data: {
      ids,
    },
  })
}

/**
 * 确认收货
 * @param {*} id 订单id
 * @returns
 */
function _receiptOrder(id) {
  return request({
    url: `/member/order/${id}/receipt`,
    method: "put",
  })
}

/**
 * 获取订单的物流信息
 * @param {*} id 订单id
 * @returns
 */
function _getOrderLogistics(id) {
  return request({
    url: `/member/order/${id}/logistics`,
    method: "get",
  })
}

/**
 * 获取订单详情
 * @param {*} id 订单id
 * @returns
 */
function _getOrderDetail(id) {
  return request({
    url: `/member/order/${id}`,
    method: "get",
  })
}

export default {
  _getCollect,
  _getHistory,
  _getOrderList,
  _cancelOrder,
  _deleteOrder,
  _receiptOrder,
  _getOrderLogistics,
  _getOrderDetail,
}
