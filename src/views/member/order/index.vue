<template>
  <a-layout class="member-order">
    <a-layout-content class="tabs-page">
      <a-tabs v-model:activeKey="activeKey" size="large" type="card" :tab-bar-gutter="8">
        <a-tab-pane v-for="[key, tab] of Array.from(orderStatus)" :key="key" :tab="tab">
          <component
            :is="'MemberOrder' + key.slice(0, 1).toUpperCase() + key.slice(1)"
            :order-map="orderMap"
            @changePage="changeParamsPage"
            @refresh="enforceRequest(queryParams)"
          ></component>
        </a-tab-pane>
      </a-tabs>
    </a-layout-content>
  </a-layout>
</template>

<script>
import { ref, reactive, computed, watch, readonly } from "vue"
import { useReciprocalTime } from "@/hooks"

import MemberOrderAllOrder from "./components/member-order-allOrder.vue"
import MemberOrderAfterPayment from "./components/member-order-afterPayment.vue"
import MemberOrderAfterDelivery from "./components/member-order-afterDelivery.vue"
import MemberOrderAfterReceipt from "./components/member-order-afterReceipt.vue"
import MemberOrderAfterEvaluation from "./components/member-order-afterEvaluation.vue"
import MemberOrderCompleted from "./components/member-order-completed.vue"
import MemberOrderCanceled from "./components/member-order-canceled.vue"

const orderStatus = new Map([
  ["allOrder", "全部订单"],
  ["afterPayment", "待付款"],
  ["afterDelivery", "待发货"],
  ["afterReceipt", "待收货"],
  ["afterEvaluation", "待评价"],
  ["completed", "已完成"],
  ["canceled", "已取消"],
])

// 请求的超时时间
const timeout = 3000

export default {
  components: {
    MemberOrderAllOrder,
    MemberOrderAfterPayment,
    MemberOrderAfterDelivery,
    MemberOrderAfterReceipt,
    MemberOrderAfterEvaluation,
    MemberOrderCompleted,
    MemberOrderCanceled,
  },
  setup() {
    const orderMap = ref(new Map())
    const queryParams = reactive({
      page: 1,
      pageSize: 5,
      orderState: 0,
    })
    const activeKey = ref("allOrder")
    watch(activeKey, (newValue) => {
      const tabArr = Array.from(orderStatus).map((item) => {
        return item[0]
      })
      const index = tabArr.findIndex((x) => x === newValue)
      if (index !== -1) {
        queryParams.page = 1
        queryParams.orderState = index
      }
    })

    const changeParamsPage = (page) => {
      queryParams.page = page
    }

    const enforceRequest = (params) => {
      sendOrderRequest(params).then((res) => {
        const message = Array.from(orderStatus).map((item) => {
          return item[0]
        })[params.orderState]
        orderMap.value.set(message, readonly(res))
        setTimeout(() => {
          if (res.length === 0) {
            orderMap.value.set(message, readonly(null))
          }
        }, timeout)
      })
    }

    watch(
      () => {
        return { ...queryParams }
      },
      (newValue) => {
        enforceRequest(newValue)
      },
      {
        immediate: true,
      },
    )
    return {
      orderMap,
      queryParams,
      activeKey,
      changeParamsPage,
      enforceRequest,
      orderStatus,
    }
  },
}

const blankSpace = "\xa0\xa0\xa0\xa0\xa0\xa0\xa0"
import { memberApi } from "@/api"

const { _getOrderList } = memberApi
export async function sendOrderRequest({ page, pageSize, orderState = 0 }) {
  const result = ref([])
  _getOrderList({ page, pageSize, orderState }).then((res) => {
    for (const item of res.result.items) {
      const realItem = { ...item }
      realItem.message = `下单时间：${item.payLatestTime}${blankSpace}订单编号：${item.id}`
      realItem.orderState = Array.from(orderStatus.values())
      // 付款的截止时间的时间戳
      realItem.timeStamp = new Date(item.payLatestTime)
      const timer = ref(null)
      if (item.countdown > 0) {
        timer.value = useReciprocalTime(item.countdown)
        timer.value.start()
      }
      realItem.payTime = computed(() => timer.value?.zh_time)
      result.value.push(realItem)
    }
  })
  console.log(result.value)
  return result.value
}

export { orderStatus }
</script>

<style lang="less" scoped>
.member-order {
  background-color: var(--xtx-bg-color-1);
}

.tabs-page {
  padding: 10px 10px;
}
</style>
