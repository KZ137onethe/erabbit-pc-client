<template>
	<div ref="target" class="cart-sku">
		<div class="attrs" @click="toggle()">
			<span class="text ellipsis">{{ attrsText }}</span>
			<DownOutlined class="icon"></DownOutlined>
		</div>
		<div class="layer" v-if="visible">
			<a-spin v-if="layerLoading" :indicator="indicator" />
			<div v-else class="result">
				<GoodsSku @amend="changeSku($event)" :skuId="skuId" :goods="skuData"></GoodsSku>
				<XtxButton type="primary" :disabled="false" size="mini" @click="submit">确认</XtxButton>
			</div>
		</div>
	</div>
</template>
<script>
import GoodsSku from '@/views/goods/components/goods-sku.vue'
import { DownOutlined, LoadingOutlined } from '@ant-design/icons-vue'

import { h, ref, computed } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { cartApi } from '@/api'
const { _getCartSku } = cartApi
export default {
	name: 'CartSku',
	props: {
		attrsText: {
			type: String,
			required: true,
		},
		skuId: {
			type: String,
			required: true,
		},
	},
	setup(props, { emit }) {
		const attrsText = computed(() => props.attrsText)
		const skuId = computed(() => props.skuId)
		const target = ref(null)
		const visible = ref(false)
		const layerLoading = ref(false)

		const skuData = ref(null)
		const open = () => {
			visible.value = true
			layerLoading.value = true

			// 获取sku数据
			_getCartSku(skuId.value).then((res) => {
				skuData.value = res.result
				layerLoading.value = false
			})
		}
		const close = () => {
			visible.value = false
			skuData.value = null
		}

		// 切换
		const toggle = () => {
			visible.value ? close() : open()
		}

		// 点击其他区域关闭模态框
		onClickOutside(target, () => {
			close()
		})

		const indicator = h(LoadingOutlined, {
			style: {
				fontSize: '24px',
			},
			spin: true,
		})

		const CurrentSku = ref(null)
		const changeSku = (event) => {
			CurrentSku.value = event
		}

		const submit = () => {
			if (CurrentSku.value?.skuId !== skuId.value) {
				emit('amend', CurrentSku.value)
				close()
			}
		}

		return {
			attrsText,
			skuId,
			target,
			visible,
			layerLoading,
			skuData,
			toggle,
			indicator,
			CurrentSku,
			changeSku,
			submit,
		}
	},
	components: { DownOutlined, GoodsSku },
}
</script>
<style scoped lang="less">
.cart-sku {
	height: 28px;
	border: 1px solid #f5f5f5;
	padding: 0 6px;
	position: relative;
	margin-top: 10px;
	display: inline-block;
	.attrs {
		line-height: 24px;
		display: flex;
		> span {
			color: #999;
			&.text {
				max-width: 230px;
				font-size: 14px;
			}
			&.icon {
				padding-left: 5px;
				&:deep(svg) {
					line-height: 100%;
					height: 24px;
				}
			}
		}
	}
	.layer {
		position: absolute;
		left: -1px;
		top: 40px;
		z-index: 10;
		width: 400px;
		border: 1px solid @xtxColor;
		box-shadow: 2px 2px 4px lighten(@xtxColor, 50%);
		background: #fff;
		border-radius: 4px;
		font-size: 14px;
		padding: 20px;
		&::before {
			content: '';
			width: 12px;
			height: 12px;
			border-left: 1px solid @xtxColor;
			border-top: 1px solid @xtxColor;
			position: absolute;
			left: 12px;
			top: -8px;
			background: #fff;
			transform: scale(0.8, 1) rotate(45deg);
		}
	}
}
</style>
