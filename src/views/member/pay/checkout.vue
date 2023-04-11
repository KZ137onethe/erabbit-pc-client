<template>
	<div class="checkout-order container">
		<!-- 面包屑 -->
		<a-breadcrumb separator=">" class="order-breadcrumb">
			<a-breadcrumb-item>首页</a-breadcrumb-item>
			<a-breadcrumb-item>购物车</a-breadcrumb-item>
			<a-breadcrumb-item>填写订单</a-breadcrumb-item>
		</a-breadcrumb>
		<!-- 主体 -->
		<div class="order-wrapper">
			<a-space direction="vertical" size="middle">
				<!-- 收货地址 -->
				<CheckoutAddress :address="order?.userAddresses"></CheckoutAddress>
				<!-- 配送时间 -->
				<DeliveryTime></DeliveryTime>
				<!-- 支付方式 -->
				<PayMethod></PayMethod>
				<!-- 商品明细，结算(表格总览) -->
				<CheckoutTable :data="order"></CheckoutTable>
			</a-space>
		</div>
	</div>
</template>

<script>
import CheckoutAddress from './components/checkout-address.vue'
import { DeliveryTime, PayMethod } from './components/checkout-option.vue'
import CheckoutTable from './components/checkout-table.vue'

import { ref } from 'vue'
import { orderApi } from '@/api'

const { _getCheckoutInfo } = orderApi
export default {
	setup() {
		const order = ref(null)
		_getCheckoutInfo().then((res) => {
			order.value = res.result
		})
		return {
			order,
		}
	},
	components: {
		CheckoutAddress,
		DeliveryTime,
		PayMethod,
		CheckoutTable,
	},
}
</script>

<style lang="less" scoped>
.checkout-order {
	.order-breadcrumb {
		height: 40px;
		line-height: 40px;
	}
	.order-wrapper {
		width: 100%;
		background-color: var(--xtx-bg-color-1);
		padding: 15px;
	}
}
</style>
