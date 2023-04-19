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
				<CheckoutAddress :address="order?.userAddresses" @change="toggleAddress" />
				<!-- 配送时间 -->
				<DeliveryTime></DeliveryTime>
				<!-- 支付方式 -->
				<PayMethod></PayMethod>
				<!-- 商品明细，结算(表格总览) -->
				<CheckoutTable :data="order"></CheckoutTable>
				<div class="order-submit">
					<XtxButton v-model:disabled="checkBtn" type="primary" @click="submitOrder">提交订单</XtxButton>
				</div>
			</a-space>
		</div>
	</div>
</template>

<script>
import CheckoutAddress from './components/checkout-address.vue'
import { DeliveryTime, PayMethod } from './components/public-option.vue'
import CheckoutTable from './components/checkout-table.vue'
import { message } from 'ant-design-vue'
import 'ant-design-vue/es/message/style/css'

import { ref, reactive, computed, onMounted } from 'vue'
import { orderApi } from '@/api'
import { useRouter } from 'vue-router'

const { _getCheckoutInfo, _submitOrder } = orderApi

export default {
	setup() {
		const order = ref(null)

		const submitParams = reactive({
			addressId: undefined,
			deliveryTimeType: 1,
			payType: 1,
			goods: null,
			buyerMessage: '',
		})

		const toggleAddress = (addressId) => {
			console.log('addressId:', addressId)
			submitParams.addressId = addressId
		}

		const submitOrder = () => {
			const addressId = submitParams.addressId ?? false
			if (addressId) {
				_submitOrder({ ...submitParams }).then((data) => {
					router.push({
						path: '/member/pay',
						query: {
							id: data.result.id,
						},
					})
				})
			} else {
				message.warn('您的订单必选项尚未选择完整，完善必选项才能提交!')
			}
		}

		const checkBtn = computed(() => {
			for (let [key, value] of Object.entries(submitParams)) {
				if (Boolean(value) === false && key !== 'buyerMessage') {
					return true
				}
			}
			return false
		})

		const router = useRouter()
		onMounted(() => {
			_getCheckoutInfo().then((res) => {
				order.value = res.result
				submitParams.goods = order.value.goods.map((item) => {
					return {
						skuId: item.skuId,
						count: item.count,
					}
				})
			})
		})
		return {
			order,
			submitParams,
			toggleAddress,
			submitOrder,
			checkBtn,
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
		.order-submit {
			width: 100%;
			text-align: center;
		}
	}
}
</style>
