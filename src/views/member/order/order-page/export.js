/* eslint-disable import/no-named-default */
import { default as AllOrder } from "./all.vue"
import { default as PaymentOrder } from "./payment.vue"
import { default as DeliveryOrder } from "./delivery.vue"
import { default as ReceiptOrder } from "./receipt.vue"
import { default as EvaluationOrder } from "./evaluation.vue"
import { default as CompletedOrder } from "./completed.vue"
import { default as CanceledOrder } from "./canceled.vue"

export const orderComponents = new Map([
  ["全部订单", AllOrder],
  ["待付款", PaymentOrder],
  ["待发货", DeliveryOrder],
  ["待收货", ReceiptOrder],
  ["待评价", EvaluationOrder],
  ["已完成", CompletedOrder],
  ["已取消", CanceledOrder],
])

export {
  AllOrder,
  PaymentOrder,
  DeliveryOrder,
  ReceiptOrder,
  EvaluationOrder,
  CompletedOrder,
  CanceledOrder,
}
