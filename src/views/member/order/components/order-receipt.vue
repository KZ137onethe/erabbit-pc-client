<template>
	<OperationButton title="确认收货" @btnClick="click" class="order-receipt"></OperationButton>
</template>

<script>
import OperationButton from './operation-btn.vue'

export default {
	setup() {
		const click = () => console.log('hhh')
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
