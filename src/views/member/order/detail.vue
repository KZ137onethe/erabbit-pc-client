<template>
	<a-layout class="member-order_detail" v-if="orderDetail">
		<MemberOrderDetailHeader :order="orderDetail" />
		<MemberOrderDetailContent :order="orderDetail" />
		<MemberOrderDetailFooter :order="orderDetail" />
	</a-layout>
</template>

<script>
import MemberOrderDetailHeader from './components/member-order-detail-header.vue'
import MemberOrderDetailContent from './components/member-order-detail-content.vue'
import MemberOrderDetailFooter from './components/member-order-detail-footer.vue'

import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { memberApi } from '@/api'

const { _getOrderDetail } = memberApi
export default {
	setup() {
		const route = useRoute()
		const orderId = computed(() => route.params?.id)
		const orderDetail = ref(null)
		_getOrderDetail(orderId.value).then((res) => {
			console.log('res:', res)
			orderDetail.value = res.result
		})
		return {
			orderDetail,
		}
	},
	components: {
		MemberOrderDetailHeader,
		MemberOrderDetailContent,
		MemberOrderDetailFooter,
	},
}
</script>

<style lang="less" scoped>
.member-order_detail {
	background-color: var(--xtx-bg-color-1);
}
</style>
