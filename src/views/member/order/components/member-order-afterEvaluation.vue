<template>
	<template v-if="Array.isArray(orderList) && orderList.length !== 0">
		<a-table size="small" :pagination="false" :columns="columns" v-for="order of orderList" :data-source="[order]" bordered>
			<template #bodyCell="{ column, record }">
				<!-- 订单中的商品 -->
				<template v-if="column.dataIndex === 'skus'">
					<!-- 这里写一个多行表格（原生的） -->
					<OrderGoodsTable :orderList="record.skus"></OrderGoodsTable>
				</template>
				<template v-if="column.dataIndex === 'orderState'">
					<b>{{ record.orderState }}</b>
				</template>
				<template v-if="column.dataIndex === 'payMoney'">
					<b>&yen; {{ record.payMoney }}</b>
					<span style="display: block">(含运费：&yen;{{ record.postFee }})</span>
					<span style="display: block"> 在线支付 </span>
				</template>
				<!-- 订单操作 -->
				<template v-if="column.dataIndex === 'orderOption'">
					<div class="option">
						<XtxButton size="mini" type="primary">确认收货</XtxButton>
						<a-button size="small" type="link">查看详情</a-button>
						<a-button size="small" type="link">再次购买</a-button>
						<a-button size="small" type="link">申请售后</a-button>
					</div>
				</template>
			</template>
			<template #title>
				<a-row :wrap="false" type="flex" justify="space-between">
					<a-col>{{ order.message }}</a-col>
					<a-col>{{ order.payTime ?? '已取消' }}</a-col>
				</a-row>
			</template>
		</a-table>
	</template>
	<template v-else-if="Array.isArray(orderList)">
		<div class="loading">
			<XtxLoading :size="50"></XtxLoading>
		</div>
	</template>
	<template v-else>
		<div class="empty">
			<a-empty :image="simpleImage" />
		</div>
	</template>
	<a-pagination v-model:current="currentPageNumber" :total="500" />
</template>
<script>
import { Empty } from 'ant-design-vue'

import { ref, watch, computed } from 'vue'

import OrderGoodsTable, { columns } from './order-table.vue'

export default {
	props: {
		orderMap: {
			type: Map,
			default: new Map([['afterEvaluation', []]]),
		},
	},
	setup(props, { emit }) {
		const orderList = computed(() => props.orderMap.get('afterEvaluation'))
		const currentPageNumber = ref(1)

		watch(currentPageNumber, (newValue) => {
			emit('changePage', newValue)
		})

		return {
			orderList,
			columns,
			currentPageNumber,
			simpleImage: Empty.PRESENTED_IMAGE_SIMPLE,
		}
	},
	components: {
		OrderGoodsTable,
	},
}
</script>
<style lang="less" scoped>
.ant-table-wrapper {
	margin: 8px 0;
}
.option {
	display: flex;
	flex-flow: column nowrap;
	justify-content: center;
	align-items: center;
}

:deep(.ant-table-title) {
	background: lighten(@xtxColor, 40%);
}
.ant-pagination {
	text-align: center;
}
.loading,
.empty {
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
