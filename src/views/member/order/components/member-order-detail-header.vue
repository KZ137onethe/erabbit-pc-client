<template>
	<a-layout-header class="order_detail-header">
		<a-row class="detail-header--wrapper" :wrap="false" type="flex" justify="space-around" align-items="center">
			<a-col class="header-status" flex="1">
				<template v-if="orderData.orderState === 1">
					<svg-icon name="order-payment" size="80"></svg-icon>
					<b>待支付</b>
				</template>
				<template v-if="orderData.orderState === 2">
					<svg-icon name="order-transport" size="80"></svg-icon>
					<b>待发货</b>
				</template>
				<template v-if="orderData.orderState === 3">
					<svg-icon name="order-receipt" size="80"></svg-icon>
					<b>待收货</b>
				</template>
				<template v-if="orderData.orderState === 4">
					<svg-icon name="order-evaluate" size="80"></svg-icon>
					<b>待评价</b>
				</template>
				<template v-if="orderData.orderState === 5">
					<svg-icon name="order-complete" size="80"></svg-icon>
					<b>已完成</b>
				</template>
				<template v-if="orderData.orderState === 6">
					<svg-icon name="order-cancel" size="80"></svg-icon>
					<b>已取消</b>
				</template>
			</a-col>
			<a-col class="header-info" flex="2">
				<a-descriptions :column="1">
					<a-descriptions-item label="订单编号">{{ orderData.id }}</a-descriptions-item>
					<a-descriptions-item label="下单时间">{{ orderData.payLatestTime }}</a-descriptions-item>
				</a-descriptions>
			</a-col>
			<a-col class="header-btn" flex="2">
				<a-row :wrap="false" type="flex" justify="space-around" align-items="center">
					<a-col>
						<XtxButton type="primary" size="small">评价商品</XtxButton>
					</a-col>
					<a-col>
						<XtxButton type="plain" size="small">再次购买</XtxButton>
					</a-col>
					<a-col>
						<XtxButton type="gray" size="small">申请售后</XtxButton>
					</a-col>
				</a-row>
			</a-col>
		</a-row>
	</a-layout-header>
</template>

<script>
import { computed } from 'vue'
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
.order_detail-header {
	width: 100%;
	height: 120px;
	background-color: var(--xtx-bg-color-1);
	> .ant-row > .ant-col {
		display: flex;
		height: 120px;
		flex-flow: row nowrap;
		align-items: center;
		justify-content: center;
		&.header-status {
			flex-flow: column nowrap;
			justify-content: flex-end;
			> b {
				height: 24px;
				line-height: 24px;
			}
		}
		&.header-info {
			align-items: flex-end;
			justify-content: flex-start;
		}
		&.header-btn {
			display: block;
			line-height: 120px;
		}
	}
}

.xtx-button {
	&.small {
		line-height: 32px;
	}
}
</style>
