<template>
  <a-layout v-if="orderDetail" class="member-order_detail">
    <detail-header :order="orderDetail" />
    <detail-content :order="orderDetail" />
    <detail-footer :order="orderDetail" />
  </a-layout>
</template>

<script>
import { ref, computed } from "vue"
import { useRoute } from "vue-router"
import DetailHeader from "./header.vue"
import DetailContent from "./content.vue"
import DetailFooter from "./footer.vue"

import memberApi from "@/api/member"

export default {
  components: {
    DetailHeader,
    DetailContent,
    DetailFooter,
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
