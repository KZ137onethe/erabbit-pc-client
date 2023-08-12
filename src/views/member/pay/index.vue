<template>
  <div class="member-pay container">
    <!-- 面包屑 -->
    <a-breadcrumb separator=">" class="pay-breadcrumb">
      <a-breadcrumb-item>首页</a-breadcrumb-item>
      <a-breadcrumb-item>购物车</a-breadcrumb-item>
      <a-breadcrumb-item>支付订单</a-breadcrumb-item>
    </a-breadcrumb>
    <div v-if="order" class="pay-status">
      <a-row class="pay-status--wrapper" :wrap="false" align="middle" justify="space-between">
        <a-col class="time">
          <a-row :wrap="false">
            <a-col>
              <!-- 完成图标 -->
              <icon>
                <template #component>
                  <svg
                    t="1681463573174"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="1468"
                    width="64"
                    height="64"
                  >
                    <path
                      d="M512.186242 6.139837c-278.100856 0-504.362043 226.261187-504.362043 504.362043S234.085386 1014.863922 512.186242 1014.863922s504.362043-226.261187 504.362043-504.362043S790.287097 6.139837 512.186242 6.139837zM794.409998 413.799444 466.418872 750.040465c-7.838525 8.023744-18.590404 12.579503-29.816073 12.642948l-0.227174 0c-11.141758 0-21.834284-4.433986-29.715789-12.314467L230.289943 574.038962c-16.420995-16.396435-16.420995-43.013653 0-59.430554 16.416901-16.420995 43.013653-16.420995 59.430554 0l146.32767 146.281621 298.275337-305.866223c16.253172-16.58063 42.891879-16.891715 59.430554-0.655939C810.356179 370.600573 810.646797 397.21779 794.409998 413.799444z"
                      fill="#1afa29"
                      p-id="1469"
                    ></path>
                  </svg>
                </template>
              </icon>
            </a-col>
            <a-col class="time-description">
              <p>订单提交成功！请尽快完成支付。</p>
              <p>
                <span v-if="order.countdown >= 0">
                  支付还剩
                  <b>{{ payTime?.zh_time }}</b>
                  ， 超时将取消订单
                </span>
                <b v-else>订单已超时!</b>
              </p>
            </a-col>
          </a-row>
        </a-col>
        <a-col class="total" :wrap="false">
          <span>应付总额：</span>
          <span class="total-amount">&yen; {{ order.payMoney }}</span>
        </a-col>
      </a-row>
    </div>
    <div class="pay-type">
      <a-space direction="vertical" size="large">
        <header class="pay-type--description">选择以下支付方式付款</header>
        <pay-platform />
        <pay-methods />
      </a-space>
    </div>
  </div>
</template>

<script>
import Icon from "@ant-design/icons-vue"
import { ref, computed, onMounted } from "vue"
import { useRoute } from "vue-router"
import PayPlatform from "./components/pay-platform.vue"
import PayMethods from "./components/pay-methods.vue"

import { orderApi } from "@/api"
import { useReciprocalTime } from "@/hooks"

const { _getOrderDetail } = orderApi
export default {
  components: {
    Icon,
    PayPlatform,
    PayMethods,
  },
  setup() {
    const route = useRoute()
    const order = ref(null)
    const orderId = computed(() => route.query.id)

    const payTime = ref(null)
    onMounted(() => {
      _getOrderDetail(orderId.value).then((res) => {
        const { result } = res
        order.value = result
        if (result.countdown >= 0) {
          payTime.value = useReciprocalTime(result.countdown)
          payTime.value.start()
        }
      })
    })

    return {
      order,
      payTime,
    }
  },
}
</script>

<style lang="less" scoped>
.background-layout {
  background-color: var(--xtx-bg-color-1);
  margin: 10px 0;
}
.pay-breadcrumb {
  height: 40px;
  line-height: 40px;
}
.pay-status {
  .background-layout();
  padding: 20px 50px;
  .time {
    .time-description {
      display: flex;
      flex-flow: column nowrap;
      justify-content: space-around;
      > p {
        margin: 0;
        margin-left: 10px;
        span b {
          color: @xtxColor;
        }
        > b {
          color: @priceColor;
        }
      }
    }
  }
  .total {
    .total-amount {
      color: @priceColor;
      font-size: 18px;
    }
  }
}

.pay-type {
  .background-layout();
  padding: 20px 30px;
  :deep(.ant-space-vertical) {
    width: 100%;
  }
  &--description {
    font-size: 16px;
    font-weight: 700;
  }
}
</style>
