<template>
	<OperationButton title="查看详情" @btnClick="click" class="order-detail"></OperationButton>
</template>

<script>
import OperationButton from './operation-btn.vue'

import { useRouter } from 'vue-router'
export default {
	props: {
		orderId: {
			type: String,
			required: true,
		},
	},
	setup(props) {
		const router = useRouter()
		const click = () => {
			router.push({ path: `/member/order/${props.orderId}` })
		}
		return {
			click,
		}
	},
	components: {
		OperationButton,
	},
}
</script>

<style lang="less" scoped></style>
