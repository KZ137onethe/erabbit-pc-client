<template>
  <div class="pay-result container">
    <!-- 面包屑 -->
    <a-breadcrumb separator=">" class="pay-breadcrumb">
      <a-breadcrumb-item>首页</a-breadcrumb-item>
      <a-breadcrumb-item>购物车</a-breadcrumb-item>
      <a-breadcrumb-item>支付订单</a-breadcrumb-item>
      <a-breadcrumb-item>支付结果</a-breadcrumb-item>
    </a-breadcrumb>
    <a-result
      class="main"
      status="success"
      title="订单支付成功"
      sub-title="我们将尽快为您发货，收货期间请保持手机畅通"
    >
      <template #extra>
        <p>支付方式：在线支付</p>
        <p>
          支付金额：
          <b>&yen;{{ order?.payMoney }}</b>
        </p>
        <XtxButton key="view" type="primary">查看订单</XtxButton>
        <XtxButton key="home" @click="$router.push('/')">进入首页</XtxButton>
        <span style="display: block; font-size: 14px; padding-top: 15px; color: gray">
          温馨提示：小兔仙儿不会以订单异常，系统升级为由要求您点击任何网址链接进行退款操作，保护资产，谨慎操作。
        </span>
      </template>
    </a-result>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue"
import { useRoute } from "vue-router"
import { orderApi } from "@/api"

const { _getOrderDetail } = orderApi
export default {
  setup() {
    const route = useRoute()
    const orderId = computed(() => route.query.orderId)
    const order = ref(null)
    onMounted(() => {
      _getOrderDetail(orderId.value).then((res) => {
        const { result } = res
        order.value = result
        console.log("order:", order.value)
      })
    })
    return {
      order,
    }
  },
}
</script>

<style lang="less" scoped>
.pay-breadcrumb {
  height: 40px;
  line-height: 40px;
}

.main {
  background-color: var(--xtx-bg-color-1);
  min-height: 600px;
  height: 100%;
  line-height: 100%;
  p {
    > b {
      color: @priceColor;
      font-size: 16px;
    }
  }
}
</style>
