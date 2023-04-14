<template>
	<div class="member-pay container">
		<!-- 面包屑 -->
		<a-breadcrumb separator=">" class="pay-breadcrumb">
			<a-breadcrumb-item>首页</a-breadcrumb-item>
			<a-breadcrumb-item>购物车</a-breadcrumb-item>
			<a-breadcrumb-item>支付订单</a-breadcrumb-item>
		</a-breadcrumb>
		<div class="pay-status">
			<a-row class="pay-status--wrapper" :wrap="false" align="middle" justify="space-between">
				<a-col class="time">
					<a-row :wrap="false">
						<a-col>
							<icon>
								<template #component>
									<svg
										t="1681463573174"
										class="icon"
										viewBox="0 0 1024 1024"
										version="1.1"
										xmlns="http://www.w3.org/2000/svg"
										p-id="1468"
										width="64"
										height="64"
									>
										<path
											d="M512.186242 6.139837c-278.100856 0-504.362043 226.261187-504.362043 504.362043S234.085386 1014.863922 512.186242 1014.863922s504.362043-226.261187 504.362043-504.362043S790.287097 6.139837 512.186242 6.139837zM794.409998 413.799444 466.418872 750.040465c-7.838525 8.023744-18.590404 12.579503-29.816073 12.642948l-0.227174 0c-11.141758 0-21.834284-4.433986-29.715789-12.314467L230.289943 574.038962c-16.420995-16.396435-16.420995-43.013653 0-59.430554 16.416901-16.420995 43.013653-16.420995 59.430554 0l146.32767 146.281621 298.275337-305.866223c16.253172-16.58063 42.891879-16.891715 59.430554-0.655939C810.356179 370.600573 810.646797 397.21779 794.409998 413.799444z"
											fill="#1afa29"
											p-id="1469"
										></path>
									</svg>
								</template>
							</icon>
						</a-col>
						<a-col>
							<p>订单提交成功！请尽快完成支付。</p>
							<p>支付还剩29分58秒，超时后将取消订单。</p>
						</a-col>
					</a-row>
				</a-col>
				<a-col class="total" :wrap="false">
					<span>应付总额：</span>
					<span class="total-amount">&yen; 296</span>
				</a-col>
			</a-row>
		</div>
		<div class="pay-type">
			<PaymentPlatform />
			<PlatformMethods />
		</div>
	</div>
</template>

<script>
import Icon, { CheckCircleOutlined } from '@ant-design/icons-vue'
import { PaymentPlatform, PlatformMethods } from './components/public-option.vue'
export default {
	setup() {
		return {}
	},
	components: {
		Icon,
		CheckCircleOutlined,
		PaymentPlatform,
		PlatformMethods,
	},
}
</script>

<style lang="less" scoped>
.background-layout {
	background-color: var(--xtx-bg-color-1);
	margin: 10px 0;
}
.pay-breadcrumb {
	height: 40px;
	line-height: 40px;
}
.pay-status {
	.background-layout();
	padding: 20px 50px;
}

.pay-type {
	.background-layout();
	padding: 20px 30px;
}
</style>
