<template>
	<div class="checkout-address">
		<a-divider>收货地址</a-divider>
		<div class="address-box">
			<a-row class="address-box--wrapper" align="middle" :wrap="false">
				<a-col :span="18" class="now">
					<a-row v-if="addressNow?.length" type="flex" justify="space-between" class="now-content">
						<a-col class="now-info">
							<p>收货人: {{ addressNow.receiver }}</p>
							<p>联系方式: {{ addressNow.contact }}</p>
							<p>收货地址: {{ addressNow.fullLocation + addressNow.address }}</p>
						</a-col>
						<a-col class="now-modify">
							<a-button type="link">修改地址</a-button>
						</a-col>
					</a-row>
					<a-row v-else class="empty" type="flex" justify="center" align="center">
						<span>你需要添加收货地址才可提交订单 </span>
					</a-row>
				</a-col>
				<a-divider type="vertical" style="height: 100%" />
				<a-col :span="5" class="option">
					<a-row type="flex" align="middle" justify="space-around">
						<a-button>切换地址</a-button>
						<a-button>添加地址</a-button>
					</a-row>
				</a-col>
			</a-row>
		</div>
	</div>
</template>

<script>
import { computed } from 'vue'
export default {
	props: {
		address: {
			type: Array,
			required: true,
		},
	},
	setup(props) {
		const addressNow = computed(() => {
			if (props.address === undefined) {
				return []
			} else {
				const addressIndex = props.address.indexOf((item) => item?.isDefault === 1)
				return addressIndex === -1 ? props.address[0] : props.address[addressIndex]
			}
		})
		return {
			addressNow,
		}
	},
}
</script>

<style lang="less" scoped>
.checkout-address {
	.ant-divider {
		font-size: 18px;
		font-weight: bold;
	}
}

.address-box {
	padding: 10px;
	border: 1px solid var(--xtx-borderColor-1);
	.address-box--wrapper {
		height: 100px;
		.now {
			.now-info {
				> p {
					margin: 0;
					padding: 5px 0;
				}
			}
			.now-modify {
				display: flex;
				flex-flow: column nowrap;
				justify-content: center;
			}
		}
		.empty {
			> span {
				color: var(--xtx-font-color-3);
			}
		}
		.option {
			.ant-row {
				height: inherit;
			}
		}
	}
}
</style>
