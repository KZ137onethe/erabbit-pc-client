<template>
  <a-layout class="member-order">
    <a-layout-content class="tabs-page">
      <a-tabs
        v-model:activeKey="order.activeKey"
        size="large"
        type="card"
        :tab-bar-gutter="8"
        :destroy-inactive-tab-pane="true"
        @tab-click="handleTabClick"
      >
        <a-tab-pane
          v-for="[msg, component] of Array.from(orderComponents)"
          :key="component.name"
          :tab="msg"
        >
          <component
            :is="component"
            class="order-panel-container"
            :state="componentNames.indexOf(component.name)"
            :order-components="orderComponents"
          ></component>
        </a-tab-pane>
      </a-tabs>
    </a-layout-content>
  </a-layout>
</template>

<script>
import { reactive, watch, getCurrentInstance, onUpdated } from "vue"
import { useRouter, useRoute } from "vue-router"

import {
  orderComponents,
  AllOrder,
  PaymentOrder,
  DeliveryOrder,
  ReceiptOrder,
  EvaluationOrder,
  CompletedOrder,
  CanceledOrder,
} from "./order-page/export"

export default {
  components: {
    AllOrder,
    PaymentOrder,
    DeliveryOrder,
    ReceiptOrder,
    EvaluationOrder,
    CompletedOrder,
    CanceledOrder,
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const { proxy } = getCurrentInstance()
    const componentNames = Array.from(orderComponents.values()).map((component) => component.name)
    const order = reactive({
      activeKey: "",
      state: "",
    })

    const redirectUrl = (state) => {
      router.push({
        path: "/member/order",
        query: {
          orderState: state,
        },
      })
    }

    const handleTabClick = (key) => {
      if (componentNames.includes(key)) {
        const state = componentNames.findIndex((name) => name === key)
        proxy.$cache.session.set("orderState", state)
        redirectUrl(state)
      }
    }

    function init() {
      const state = Number(proxy.$cache.session.get("orderState"))
      if (Number.isInteger(state) && state >= 0) {
        order.state = state
        order.activeKey = componentNames[state]
      }
    }

    watch(
      () => route.query.orderState,
      (newState) => {
        proxy.$cache.session.set("orderState", newState)
        init()
        redirectUrl(newState)
      },
      { immediate: true },
    )

    onUpdated(() => {
      init()
    })

    return {
      order,
      orderComponents,
      componentNames,
      handleTabClick,
    }
  },
}
</script>

<style lang="less" scoped>
.member-order {
  background-color: var(--xtx-bg-color-1);
}

.tabs-page {
  padding: 10px 10px;
}
</style>
