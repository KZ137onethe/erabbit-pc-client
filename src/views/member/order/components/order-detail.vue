<template>
	<OperationButton title="查看详情" @btnClick="click" class="order-detail"></OperationButton>
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
