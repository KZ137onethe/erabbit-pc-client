<template>
	<a-layout-footer class="order_detail-footer">
		<!-- 总计 -->
		<div class="detail-content--total">
			<div class="card">
				<a-descriptions :column="1" :labelStyle="{ width: 50 + '%' }" :contentStyle="{ width: 50 + '%' }" bordered>
					<a-descriptions-item label="商品件数">{{ orderData.totalNum }}件</a-descriptions-item>
					<a-descriptions-item label="商品总价">&yen; {{ orderData.totalMoney }}</a-descriptions-item>
					<a-descriptions-item label="运费">&yen; {{ orderData.postFee }}</a-descriptions-item>
					<a-descriptions-item label="应付总额">&yen; {{ orderData.payMoney }}</a-descriptions-item>
				</a-descriptions>
			</div>
		</div>
	</a-layout-footer>
</template>

<script>
import { ref, computed } from 'vue'
export default {
	props: {
		order: {
			type: Object,
			required: true,
		},
	},
	setup(props) {
		const orderData = computed(() => props.order)
		return {
			orderData,
		}
	},
}
</script>

<style lang="less" scoped>
.order_detail-footer {
	background-color: var(--xtx-bg-color-1);
	.detail-content--total {
		width: 300px;
	}
}
</style>
