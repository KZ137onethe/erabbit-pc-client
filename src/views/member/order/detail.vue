<template>
  <a-layout v-if="orderDetail" class="member-order_detail">
    <member-order-detail-header :order="orderDetail" />
    <member-order-detail-content :order="orderDetail" />
    <member-order-detail-footer :order="orderDetail" />
  </a-layout>
</template>

<script>
import { ref, computed } from "vue"
import { useRoute } from "vue-router"
import MemberOrderDetailHeader from "./components/member-order-detail-header.vue"
import MemberOrderDetailContent from "./components/member-order-detail-content.vue"
import MemberOrderDetailFooter from "./components/member-order-detail-footer.vue"

import memberApi from "@/api/member"

export default {
  components: {
    MemberOrderDetailHeader,
    MemberOrderDetailContent,
    MemberOrderDetailFooter,
  },
  setup() {
    const route = useRoute()
    const orderId = computed(() => route.params?.id)
    const orderDetail = ref(null)
    memberApi._getOrderDetail(orderId.value).then((res) => {
      console.log("res:", res)
      orderDetail.value = res.result
    })
    return {
      orderDetail,
    }
  },
}
</script>

<style lang="less" scoped>
.member-order_detail {
  background-color: var(--xtx-bg-color-1);
}
</style>
