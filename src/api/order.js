import { request } from "@/utils/request.js"

/**
 * 获取结算信息
 * @returns
 */
export function _getCheckoutInfo() {
  return request("/member/order/pre", "get")
}

/**
 * 添加收货地址
 * @param {Object} address -- 地址信息（下面是他的字段）
 * @param {String} receiver -- 收货人姓名
 * @param {String} contact -- 联系方式
 * @param {String} provinceCode -- 所在省份编码
 * @param {String} cityCode -- 所在城市编码
 * @param {String} countyCode -- 所在区/县编码
 * @param {String} address -- 详细地址
 * @param {String} postalCode -- 	邮政编码
 * @param {String} addressTags -- 地址标签,以英文逗号分割
 * @param {	Number} isDefault -- 是否为默认地址，0为是，1为否
 * @returns
 */
export function _appendAddress(address) {
  return request("/member/address", "post", address)
}

/**
 * 修改收货地址
 * @param {String} addressId -- 收货地址id
 * @param {*} address 同上
 * @returns
 */
export function _modifyAddress({ addressId, address }) {
  return request(`/member/address/${addressId}`, "put", address)
}

/**
 * 删除收货地址
 * @param {String} addressId -- 收货地址id
 * @returns
 */
export function _removeAddress(addressId) {
  return request(`/member/address/${addressId}`, "delete")
}

/**
 * 提交订单
 * @param {*} goods -- 商品集合(对象数组) skuId， count
 * @param {*} addressId -- 所选地址Id
 * @param {*} deliveryTimeType -- 配送时间类型，1为不限，2为工作日，3为双休或假日
 * @param {*} payType -- 支付方式，1为在线支付，2为货到付款
 * @param {*} payChannel -- 支付渠道：支付渠道，1支付宝、2微信--支付方式为在线支付时，传值，为货到付款时，不传值
 * @param {*} buyerMessage -- 买家留言
 */
export function _submitOrder({
  goods,
  addressId,
  deliveryTimeType,
  payType,
  payChannel,
  buyerMessage,
}) {
  return request(`/member/order`, "post", {
    goods,
    addressId,
    deliveryTimeType,
    payType,
    payChannel,
    buyerMessage,
  })
}

/**
 * 获取我的订单详情
 * @param {String} orderId -- 订单ID
 * @returns
 */
export function _getOrderDetail(orderId) {
  return request(`/member/order/${orderId}`, "get")
}
