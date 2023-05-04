<template>
	<OperationButton title="再次购买" @btnClick="click" class="order-repurchase"></OperationButton>
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
