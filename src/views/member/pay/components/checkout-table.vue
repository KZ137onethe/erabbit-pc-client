<template>
	<div class="checkout-table">
		<a-divider>商品明细</a-divider>
		<a-table :columns="columns" :data-source="goods" :scroll="{ y: 1000 }" bordered :pagination="false">
			<template #bodyCell="{ column, record }">
				<template v-if="column.dataIndex === 'goodsInfo'">
					<a-row class="goods-info" type="flex" justify="start" :wrap="false">
						<a-col class="goods-info--img"><img :src="record.picture" alt="" /></a-col>
						<a-col class="goods-info--details">
							<p>{{ record.name }}</p>
							<p>{{ record.attrsText }}</p>
						</a-col>
					</a-row>
				</template>
			</template>
			<template #summary>
				<a-table-summary :fixed="bottom">
					<a-table-summary-row>
						<a-table-summary-cell class="summary-cell--1" :col-span="6">
							<!-- 商品件数: 5 商品总价: 500 运费: 10  -->
							<a-row type="flex" justify="start">
								<a-col :span="4">商品件数: {{ summary?.goodsCount }}</a-col>
								<a-col :span="4">运费: {{ summary?.postFee }}</a-col>
								<a-col :span="4">商品总价: {{ summary?.totalPrice }}</a-col>
							</a-row>
						</a-table-summary-cell>
					</a-table-summary-row>
					<a-table-summary-row :bordered="false">
						<a-table-summary-cell class="summary-cell--2" :col-span="6">
							<span>应付总额: {{ summary?.totalPayPrice }}</span>
						</a-table-summary-cell>
					</a-table-summary-row>
				</a-table-summary>
			</template>
		</a-table>
	</div>
</template>

<script>
import { ref, computed } from 'vue'

import { columns } from './checkout-table.js'

export default {
	props: {
		data: {
			type: Object || null,
			default: () => ({}),
		},
	},
	setup(props) {
		const goods = computed(() => props.data?.goods)
		const summary = computed(() => props.data?.summary)

		return {
			columns,
			goods,
			summary,
		}
	},
}
</script>

<style lang="less" scoped>
.checkout-table {
	.ant-divider {
		font-size: 18px;
		font-weight: bold;
	}
	.goods-info {
		&--img {
			> img {
				width: 100px;
				height: 100px;
			}
		}
		&--details {
			display: flex;
			flex-flow: column nowrap;
			justify-content: space-around;
			padding: 15px;
			> p {
				margin: 0;
			}
		}
	}
	// 结算栏
	tfoot.ant-table-summary {
		> tr {
			background-color: #fafafa;
			.summary-cell {
				&--1 {
					color: blue;
				}
				&--2 {
					color: red;
				}
			}
		}
	}
}
</style>
