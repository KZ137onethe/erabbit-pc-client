<template>
	<OperationButton title="再次购买" @btnClick="click" class="order-repurchase"></OperationButton>
</template>

<script>
import OperationButton from './operation-btn.vue'
import { message } from 'ant-design-vue'
import 'ant-design-vue/es/message/style/css'

export default {
	setup() {
		const click = () => {
			message.warn('未开放')
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
