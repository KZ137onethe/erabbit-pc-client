<template>
	<OperationButton title="申请售后" @btnClick="click" class="order-aftersales"></OperationButton>
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
