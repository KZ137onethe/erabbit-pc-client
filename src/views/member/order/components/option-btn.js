// 权限管理
import CancelBtn from './order-cancel.vue' // 取消订单
import ReceiptBtn from './order-receipt.vue' // 确认收货
import DetailBtn from './order-detail.vue' // 查看详情
import RepurchaseBtn from './order-repurchase.vue' // 再次购买
import AfterSalesBtn from './order-aftersales.vue' // 申请售后

/** 这里的集合元素索引代表
 * 0 代表 全部订单
 * 1 代表 待付款
 * 2 代表 待发货
 * 3 代表 待收货
 * 4 代表 待评价
 * 5 代表 已完成
 * 6 代表 已取消
 */
const OptionMap = new Set([
	null,
	[DetailBtn, CancelBtn], // ['查看详情', '取消订单']
	[ReceiptBtn, DetailBtn, RepurchaseBtn], // ['确认收货', '查看详情', '取消订单', '再次购买']
	[ReceiptBtn, DetailBtn, RepurchaseBtn], // ['确认收货', '查看详情', '再次购买']
	[DetailBtn, RepurchaseBtn, AfterSalesBtn], // ['查看详情', '再次购买', '申请售后']
	[DetailBtn, RepurchaseBtn, AfterSalesBtn], // ['查看详情', '再次购买', '申请售后']
	[DetailBtn, RepurchaseBtn], // ['查看详情', '再次购买']
])
export { OptionMap }