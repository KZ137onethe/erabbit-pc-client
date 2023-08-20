import memberApi from "@/api/member"
import { reciprocalTime } from "@/utils/time"

const blankSpace = "\xa0\xa0\xa0\xa0\xa0\xa0\xa0"
export const orderStates = new Map([
  ["AllOrder", 0],
  ["PaymentOrder", 1],
  ["DeliveryOrder", 2],
  ["ReceiptOrder", 3],
  ["EvaluationOrder", 4],
  ["CompletedOrder", 5],
  ["CanceledOrder", 6],
])

export async function sendOrderRequest({ page, pageSize, orderState = 0 }) {
  const data = []
  const { result } = await memberApi._getOrderList({ page, pageSize, orderState })
  for (const item of result.items) {
    const realItem = { ...item }
    realItem.message = `下单时间：${realItem.payLatestTime}${blankSpace}订单编号：${realItem.id}`
    realItem.orderState = orderState
    // 付款的截止时间的时间戳
    realItem.timeStamp = new Date(realItem.payLatestTime)
    if (Number.isInteger(realItem.countdown) && realItem.countdown > 0) {
      const { start } = reciprocalTime(realItem.countdown, (value) => {
        start()
        realItem.payTime = value
      })
    } else {
      realItem.payTime = "订单超时"
    }
    data.push(realItem)
  }
  console.log("订单列表: ", data)
  return data
}
