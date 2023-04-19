<template>
	<div class="shopping-cart">
		<div class="container">
			<!-- 面包屑 -->
			<a-breadcrumb separator=">" class="breadcrumb">
				<a-breadcrumb-item>首页</a-breadcrumb-item>
				<a-breadcrumb-item>购物车</a-breadcrumb-item>
			</a-breadcrumb>
			<!-- 购物车面板 -->
			<a-table sticky :columns="columns" v-model:data-source="currentData" :pagination="false">
				<template #headerCell="{ column }">
					<template v-if="column.key === 'Selected'">
						<a-select ref="select" v-model:value="selectValue" :options="options" style="width: 100px" @change="selectChange($event)"> </a-select>
					</template>
				</template>

				<template #bodyCell="{ column, record }" align="right">
					<template v-if="column.key === 'Selected'">
						<a-checkbox v-model:checked="record.selected" @change="modifySelected($event, record)" />
					</template>
					<template v-else-if="column.key === 'Name'">
						<div class="preview">
							<img :src="record.picture" alt="" />
							<div class="describe">
								<router-link :to="`/product/${record.id}`">{{ record.name }}</router-link>
								<CartSku @amend="updateCartSku($event, record.skuId)" :skuId="record.skuId" v-model:attrsText="record.attrsText"></CartSku>
							</div>
						</div>
					</template>
					<template v-else-if="column.key === 'Price'">
						<span>&yen;{{ record.price }}</span>
					</template>
					<template v-else-if="column.key === 'Count'">
						<a-input-number
							v-model:value="record.count"
							@change="modifyCount($event, record)"
							size="large"
							style="width: 80px"
							:min="1"
							:max="record.stock"
						/>
					</template>
					<template v-else-if="column.key === 'Amount'">
						<!-- {{ record.amount() }} -->
						<span class="price">&yen;{{ record.amount() }}</span>
					</template>
					<template v-else-if="column.key === 'Action'">
						<span>
							<a-button type="link" style="padding: 3px 0">移入收藏夹</a-button>
							<a-divider type="vertical" />
							<a-button type="link" style="padding: 3px 0" @click="deleteCartGoods(record)">删除</a-button>
							<a-divider type="vertical" />
							<a-button type="link" style="padding: 3px 0">找类似</a-button>
						</span>
					</template>
				</template>

				<template #summary>
					<a-table-summary :fixed="fixedTop ? 'top' : 'bottom'">
						<a-table-summary-row>
							<a-table-summary-cell :index="0" :col-span="1">
								<a-checkbox v-model:checked="columns[0].checked" @change="modifyAllSelected($event, currentData)">全选</a-checkbox>
							</a-table-summary-cell>
							<a-table-summary-cell class="action" :index="2" :col-span="1">
								<a-button type="link">移入收藏夹</a-button>
								<a-divider type="vertical" />
								<a-button type="link" @click="deleteSelectedCartGoods(currentData)">删除</a-button>
							</a-table-summary-cell>
							<a-table-summary-cell class="overview" :index="3" :col-span="3">
								<span class="description">{{ dataSummary.description }}</span>
								<span class="total">共计 ¥{{ dataSummary.selectedAmount }}</span>
							</a-table-summary-cell>
							<a-table-summary-cell class="overview" :index="4" :col-span="1">
								<XtxButton v-model:disabled="checkBtn" type="primary" size="middle" @click="checkout">下单结算</XtxButton>
							</a-table-summary-cell>
						</a-table-summary-row>
					</a-table-summary>
				</template>
			</a-table>
		</div>
		<a-row></a-row>
	</div>
</template>

<script>
import CartSku from './components/cart-sku.vue'
import { message, Modal } from 'ant-design-vue'
import 'ant-design-vue/es/message/style/css'
import 'ant-design-vue/es/modal/style/css'
import { WarningOutlined } from '@ant-design/icons-vue'

import { ref, reactive, computed, createVNode, defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useState, useGetters, useActions } from '@/hooks'
import Big from 'big.js'
import { options, columns } from './index.js'

export default defineComponent({
	setup() {
		const { cartList } = useState('cart', {
			cartList: (state) => state.list,
		})
		const { validateList, invalidateList, selectedTotal, selectedAmount } = useGetters('cart', [
			'validateList',
			'invalidateList',
			'selectedTotal',
			'selectedAmount',
		])
		const { removeCart, modifyCart, modifyAllCart, removeCartSelected, updateCartGoodsSku } = useActions('cart', [
			'removeCart',
			'modifyCart',
			'modifyAllCart',
			'removeCartSelected',
			'updateCartGoodsSku',
		])
		const selectValue = ref('all')
		// 有效数据
		const validData = computed(() => {
			const res = ref([])
			console.log('validData：', validateList.value)
			validateList.value.forEach((item) => {
				res.value.push({
					id: item.id,
					skuId: item.skuId,
					picture: item.picture,
					attrsText: item.attrsText ?? item.attrText,
					selected: item.selected,
					name: item.name,
					price: item.nowPrice,
					count: item.count,
					stock: item.stock,
					amount() {
						return computed(() => Number(new Big(this.price).mul(this.count).valueOf()))
					},
				})
			})
			return res.value
		})
		// 无效数据
		const invalidData = computed(() => {
			const res = ref([])
			invalidateList.value.forEach((item) => {
				res.value.push({
					id: item.id,
					skuId: item.skuId,
					picture: item.picture,
					attrsText: item.attrsText ?? item.attrText,
					selected: item.selected,
					name: item.name,
					price: item.nowPrice,
					count: item.count,
					stock: item.stock,
					amount() {
						return computed(() => Number(new Big(this.price).mul(this.count))).value
					},
				})
			})
			return res.value
		})
		// 全部数据
		const data = computed(() => [...validData.value, ...invalidData.value])

		const currentData = computed(() => {
			const res = ref([])
			if (selectValue.value === 'all') {
				res.value = data.value
			}
			if (selectValue.value === 'valid') {
				res.value = validData.value
			}
			if (selectValue.value === 'invalid') {
				res.value = invalidData.value
			}
			return res.value
		})

		// 选择器value值改变回调
		const selectChange = (event) => {}

		// 数据汇总
		const dataSummary = computed(() => {
			const res = reactive({})
			res.totalCount = cartList.value.reduce((pre, next) => {
				pre += next.count
				return pre
			}, 0)
			res.selectedCount = selectedTotal.value
			res.selectedAmount = selectedAmount.value
			res.description = `共 ${res.totalCount} 件商品，已选择 ${res.selectedCount} 件，`
			return res
		})

		const modifySelected = (event, record) => {
			modifyCart({ selected: event.target.checked, skuId: record.skuId })
		}

		const modifyAllSelected = (event, dataSource) => {
			modifyAllCart({ selected: event.target.checked, dataSource: dataSource })
			for (let [key, values] of Object.entries(columns.value)) {
				if (values.key === 'Selected') {
					columns.value[key].selected = event.target.checked
					break
				}
			}
		}

		const modifyCount = (number, record) => {
			modifyCart({ count: number, skuId: record.skuId })
		}

		const deleteCartGoods = (record) => {
			Modal.confirm({
				title: '温馨提示',
				icon: createVNode(WarningOutlined),
				content: createVNode('div', { style: 'color:red;' }, '你确认删除该商品吗?'),
				okText: '确认',
				cancelText: '取消',
				okType: 'danger',
				onOk() {
					removeCart(record).catch((e) => {
						throw new Error(e)
					})
				},
				centered: true,
				class: 'delete-cartGoods',
			})
		}

		const deleteSelectedCartGoods = (dataSource) => {
			console.log(dataSource)
			Modal.confirm({
				title: '温馨提示',
				icon: createVNode(WarningOutlined),
				content: createVNode('div', { style: 'color:red;' }, '你确认批量删除这些商品吗?'),
				okText: '确认',
				cancelText: '取消',
				okType: 'danger',
				onOk() {
					removeCartSelected(dataSource).catch((e) => {
						throw new Error(e)
					})
				},
				centered: true,
				class: 'delete-selected-cartGoods',
			})
		}

		const updateCartSku = (newValue, old) => {
			updateCartGoodsSku({ newValue, old })
		}

		// 结算
		const { isLogin } = useGetters('user', ['isLogin'])
		const { selectedList } = useGetters('cart', ['selectedList'])
		const router = useRouter()
		const checkout = () => {
			// 判断 有无商品 或者 有无勾选的商品 => 判断是否登录
			if (validateList.value.length === 0) {
				message.error('当前购物车没有商品!')
				return
			}
			if (selectedList.value.length === 0) {
				message.warn('请选择至少一件商品!')
				return
			}

			if (isLogin.value) {
				router.push('/member/checkout')
			} else {
				// 提示去登录
				Modal.confirm({
					title: '提示',
					content: createVNode('div', { style: 'color: orange;' }, '结算需要登录，你确认登录吗？'),
					okText: '确认',
					cancelText: '取消',
					centered: true,
					onOk() {
						router.push('/member/checkout')
					},
				})
			}
		}

		const checkBtn = computed(() => !Boolean(validateList.value.length && selectedList.value.length))

		return {
			options,
			columns,
			selectValue,
			currentData,
			invalidData,
			selectChange,
			dataSummary,
			modifySelected,
			modifyAllSelected,
			modifyCount,
			deleteCartGoods,
			deleteSelectedCartGoods,
			updateCartSku,
			checkout,
			checkBtn,
		}
	},
	components: {
		CartSku,
	},
})
</script>

<style lang="less" scoped>
.breadcrumb {
	height: 40px;
	line-height: 40px;
}
.preview {
	display: flex;
	flex-flow: row nowrap;
	img {
		width: 80px;
		height: 80px;
	}
	.describe {
		display: flex;
		flex-flow: column nowrap;
		justify-content: space-evenly;
		align-items: flex-start;
		padding-left: 5%;
		> a {
			list-style: none;
			display: block;
			max-width: 350px;
			font-size: 16px;
			margin: 0;
			color: black;
			.ellipsis();
			&:hover {
				text-decoration: underline;
				color: @xtxColor;
				cursor: pointer;
			}
		}
	}
}
.price {
	color: @priceColor;
}
.action {
	line-height: 50px;
	height: 100%;
}
.overview {
	> span {
		font-size: 14px;
		&.total {
			margin-right: 20px;
			font-size: 16px;
			color: @priceColor;
		}
	}
}
</style>
