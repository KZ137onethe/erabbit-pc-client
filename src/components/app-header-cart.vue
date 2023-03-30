<template>
	<a-popover placement="bottomRight" v-model:visible="visible" class="app-header-cart">
		<!-- 主体的弹层 -->
		<template #content>
			<div class="layer">
				<div class="list">
					<div class="item" v-for="goods in storeCartGetters.validateList.value" :key="goods">
						<router-link to="">
							<img :src="goods.picture" alt="" />
							<div class="center">
								<p class="name ellipsis-2">{{ goods.name }}</p>
								<p class="attr ellipsis">{{ goods.attrText }}</p>
							</div>
							<div class="right">
								<p class="price">&yen;{{ goods.nowPrice }}</p>
								<p class="count">{{ `X ${goods.count}` }}</p>
							</div>
						</router-link>
						<a-button @click="hide()" shape="circle" size="small"><CloseOutlined /></a-button>
					</div>
				</div>
				<div class="foot">
					<div class="total">
						<p>共 {{ storeCartGetters.validateTotal }} 件商品</p>
						<p>&yen;{{ storeCartGetters.validateAmount }}</p>
					</div>
					<XtxButton type="plain">去购物车结算</XtxButton>
				</div>
			</div>
		</template>
		<!-- 购物车图标按钮 -->
		<a-badge :count="storeCartGetters.validateTotal" class="cart-btn">
			<a-button type="dashed" shape="circle" size="large">
				<template #icon>
					<ShoppingCartOutlined />
				</template>
			</a-button>
		</a-badge>
	</a-popover>
</template>

<script>
import { ShoppingCartOutlined, CloseOutlined } from '@ant-design/icons-vue'

import { ref, onMounted } from 'vue'
import { useGetters, useActions } from '@/hooks'
import { message } from 'ant-design-vue'
export default {
	setup() {
		const visible = ref(true)
		const storeCartGetters = useGetters('cart', ['validateList', 'validateTotal', 'validateAmount'])

		const hide = () => {
			visible.value = false
		}

		const storeCartActions = useActions('cart', ['getCartList'])
		onMounted(() => {
			storeCartActions.getCartList().then(() => message.success('更新本地购物车成功！'))
		})

		return {
			visible,
			storeCartGetters,
			hide,
		}
	},
	components: { ShoppingCartOutlined, CloseOutlined },
}
</script>

<style lang="less" scoped>
.layer {
	width: 400px;
	height: 400px;
	.list {
		height: 340px;
		overflow: auto;
		// 滚动条的样式
		&::-webkit-scrollbar {
			width: 10px;
			height: 10px;
		}
		&::-webkit-scrollbar-track {
			background: #f8f8f8;
			border-radius: 2px;
		}
		&::-webkit-scrollbar-thumb {
			background: #eee;
			border-radius: 10px;
		}
		&::-webkit-scrollbar-thumb:hover {
			background: #ccc;
		}
		// 商品列表
		.item {
			border-bottom: 1px solid #f5f5f5;
			padding: 10px 0;
			position: relative;
			// 图标button
			> button.ant-btn {
				position: absolute;
				top: 50%;
				right: 5px;
				transform: translateY(-50%);
				opacity: 0;
				color: #666;
				transition: all 0.5s;
			}
			&:hover {
				> button.ant-btn {
					opacity: 1;
					cursor: pointer;
				}
			}
			// 商品
			a {
				display: flex;
				align-items: center;
				width: 100%;
				img {
					height: 80px;
					width: 80px;
				}
				.center {
					margin: 0 10px;
					width: 200px;
					> p {
						margin: 5px 0;
						&.name {
							font-size: 16px;
						}
						&.attr {
							color: #999;
							padding-top: 5px;
						}
					}
				}
				.right {
					width: 100px;
					margin-right: 20px;
					text-align: center;
					> p {
						margin: 5px 0;
						&.price {
							font-size: 16px;
							color: @priceColor;
						}
						&.count {
							color: #999;
							margin-top: 5px;
							font-size: 16px;
						}
					}
				}
			}
		}
	}
	.foot {
		position: absolute;
		left: 0;
		bottom: 0;
		height: 70px;
		width: 100%;
		padding: 10px;
		display: flex;
		justify-content: space-between;
		background: #f8f8f8;
		align-items: center;
		.total {
			padding-left: 10px;
			color: #999;
			display: flex;
			flex-flow: column nowrap;
			justify-content: center;
			align-items: center;
			p {
				display: block;
				margin: 0;
				&:last-child {
					font-size: 18px;
					color: @priceColor;
				}
			}
		}
	}
}
</style>
