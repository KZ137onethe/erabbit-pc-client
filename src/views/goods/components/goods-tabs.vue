<template>
	<div class="goods-tabs">
		<a-tabs v-model:activeKey="activeKey">
			<a-tab-pane v-for="item in components" :key="item.key" :tab="item.tab">
				<component :is="item.component"></component>
			</a-tab-pane>
		</a-tabs>
	</div>
</template>

<script>
import { ref, reactive } from 'vue'
import GoodsTabsComment from './goods-tabs-comment'
import GoodsTabsDetail from './goods-tabs-detail'
export default {
	props: {
		goods: {
			type: Object,
			default: () => ({}),
		},
	},
	setup() {
		const components = reactive([
			{ key: 'detail', tab: '商品详情', component: GoodsTabsDetail },
			{ key: 'commit', tab: '商品评价', component: GoodsTabsComment },
		])
		const activeKey = ref(components[0].key)
		return {
			activeKey,
			components,
		}
	},
	components: {
		GoodsTabsComment,
		GoodsTabsDetail,
	},
}
</script>

<style lang="less" scoped>
.goods-tabs {
	min-height: 600px;
	background: #fff;
	.ant-tabs {
		// tab nav
		&:deep(.ant-tabs-tab) {
			height: 70px;
			line-height: 70px;
			border-bottom: 1px solid var(--xtx-font-color-2);
			margin-left: 32px;
		}
		// tab content
		&:deep(.ant-tabs-content-holder) {
			padding-left: 32px;
		}
	}
}
</style>
