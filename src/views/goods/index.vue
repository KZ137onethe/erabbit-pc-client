<template>
	<div class="goods-index" v-if="goods">
		<div class="container">
			<!-- 面包屑 -->
			<a-breadcrumb separator=">" class="breadcrumb">
				<a-breadcrumb-item>首页</a-breadcrumb-item>
				<a-breadcrumb-item>
					<RouterLink :to="'/category/' + goods.categories[0].id">
						{{ goods.categories[0].name }}
					</RouterLink>
				</a-breadcrumb-item>
				<a-breadcrumb-item>
					<RouterLink :to="'/category/sub/' + goods.categories[1].id">
						{{ goods.categories[1].name }}
					</RouterLink>
				</a-breadcrumb-item>
				<a-breadcrumb-item>{{ goods.name }}</a-breadcrumb-item>
			</a-breadcrumb>
			<!-- 商品信息 -->
			<div class="goods-info">
				<div class="media">
					<GoodsImage :images="goods.mainPictures"></GoodsImage>
					<GoodsSale />
				</div>
				<div class="spec">
					<a-space direction="vertical">
						<!-- 商品名称，配送信息 -->
						<GoodsName :goods="goods" />
						<!-- 商品规格 -->
						<GoodsSku :goods="goods" @amend="amendSKU" />
						<!-- 数量选择组件 -->
						<GoodsNumbox :modelValue="buySet" />
						<!-- 购买按钮 -->
						<XtxButton @click="addCart()" type="primary" v-model:disabled="checkBtn">加入购物车</XtxButton>
					</a-space>
				</div>
			</div>
			<!-- 商品推荐 -->
			<GoodsRelevant :goodsId="goods.id" />
			<!-- 商品详情 -->
			<div class="goods-footer">
				<div class="goods-article">
					<!-- 商品+评价 -->
					<GoodsTabs :goods="goods" />
					<!-- 注意事项 -->
					<GoodsWarn />
				</div>
				<!-- 热榜+专题推荐 -->
				<aside>
					<GoodsHotItem :type="1" :id="goods.id" />
					<GoodsHotItem :type="2" :id="goods.id" />
					<GoodsHotItem :type="3" :id="goods.id" />
				</aside>
			</div>
		</div>
	</div>
</template>

<script>
import { useGoods } from './'
import { useRoute } from 'vue-router'
import GoodsRelevant from './components/goods-relevant'
import GoodsImage from './components/goods-image'
import GoodsSale from './components/goods-sales'
import GoodsName from './components/goods-name'
import GoodsSku from './components/goods-sku'
import GoodsNumbox from './components/goods-numbox'
import GoodsTabs from './components/goods-tabs'
import GoodsHotItem from './components/goods-hot-item'
import GoodsWarn from './components/goods-warn'
import { message } from 'ant-design-vue'
import 'ant-design-vue/es/message/style/css'

import { ref, reactive, provide, computed } from 'vue'
import { useActions } from '@/hooks'

export default {
	name: 'XtxGoodsPage',
	components: { GoodsNumbox, GoodsRelevant, GoodsImage, GoodsSale, GoodsName, GoodsSku, GoodsTabs, GoodsHotItem, GoodsWarn },
	setup() {
		const route = useRoute()
		const goods = useGoods(route)
		const currentSKU = ref(null)
		const checkBtn = computed(() => !Boolean(currentSKU.value))

		// 购买数量
		const buySet = reactive({
			currentVal: 1,
			min: 1,
			max: 1,
		})

		// 改变SKU
		const amendSKU = (sku) => {
			if (Boolean(sku)) {
				goods.value.price = sku.price
				goods.value.oldPrice = sku.oldPrice
				goods.value.inventory = sku.inventory
				currentSKU.value = sku
				buySet.max = goods.value.inventory
			} else {
				currentSKU.value = null
				buySet.max = 1
			}
		}

		// 添加购物车 (字段：skuId name attrsText picture price nowPrice selected count isEffective	)
		const storeCartActions = useActions('cart', ['addCart'])
		const addCart = () => {
			const isSKU = !!currentSKU.value
			if (isSKU) {
				const { id, name, mainPictures } = goods.value
				const { skuId, price, specsText, inventory } = currentSKU.value
				console.log(1121)
				storeCartActions
					.addCart({
						id,
						name,
						picture: mainPictures[0],
						skuId,
						price,
						nowPrice: price,
						attrText: specsText,
						stock: inventory,
						count: buySet.currentVal,
						selected: true,
						isEffective: true,
					})
					.then(() => {
						message.success('加入购物车成功!')
					})
			} else {
				message.info('商品规格请选择完整!')
			}
		}

		// 父组件提供商品数据
		provide('goods', goods)

		return {
			goods,
			checkBtn,
			amendSKU,
			buySet,
			addCart,
			currentSKU,
		}
	},
}
</script>

<style lang="less" scoped>
.goods-index {
	.container {
		.breadcrumb {
			height: 40px;
			line-height: 40px;
		}
		.goods-info {
			min-height: 600px;
			background: #fff;
			display: flex;
			.media {
				width: 580px;
				height: 600px;
				padding: 30px 50px;
			}
			.spec {
				flex: 1;
				padding: 30px 30px 30px 0;
			}
		}
		.goods-footer {
			display: flex;
			margin-top: 20px;
			.goods-article {
				width: 940px;
				margin-right: 20px;
			}
			aside {
				width: 280px;
				min-height: 1000px;
			}
		}
	}
}
</style>
