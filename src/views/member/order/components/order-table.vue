<script lang="jsx">
import { reactive, computed, defineComponent } from 'vue'

const OrderGoodsTable = defineComponent({
	name: 'order-goods-table',
	props: {
		orderList: {
			type: Array,
			required: true,
		},
	},
	setup(props) {
		const orderList = computed(() => props.orderList)

		return () => (
			<div class="order-table">
				{orderList.value.map((goods) => {
					return (
						<table>
							<tbody>
								<tr align="justify">
									<td class="view-image">
										<img src={goods.image} alt="" />
									</td>
									<td class="view-info">
										<p class="view-info--title">{goods.name}</p>
										<p class="view-info--subTitle">{goods.attrsText}</p>
									</td>
									<td class="view-price">
										<span>&yen; {goods.curPrice}</span>
									</td>
									<td class="view-count">
										<span>x {goods.quantity}</span>
									</td>
								</tr>
							</tbody>
						</table>
					)
				})}
			</div>
		)
	},
})

export const columns = [
	{
		title: '商品',
		dataIndex: 'skus',
		width: 500,
	},
	{
		title: '当前订单状态',
		className: 'orderState',
		dataIndex: 'orderState',
	},
	{
		title: '订单金额',
		dataIndex: 'payMoney',
	},
	{
		title: '订单操作',
		dataIndex: 'orderOption',
	},
]

export default OrderGoodsTable
</script>

<style lang="less" scoped>
// 订单商品表格
.order-table {
	height: 100%;
	tr {
		padding: 5px 0;
		display: flex;
		flex-flow: row nowrap;
		border-bottom: 1px solid var(--xtx-borderColor-1);
		&:last-child {
			border-bottom: 0;
		}
		td.view-image {
			flex: 1;
		}
		td.view-info {
			display: flex;
			flex-flow: column nowrap;
			justify-content: space-around;
			flex: 3;
			padding-left: 8px;
			> p {
				display: inline-block;
				margin: 0;
				&.view-info--subTitle {
					color: var(--xtx-font-color-3);
				}
			}
		}
		td.view-price {
			flex: 1;
			> span {
				display: inline-block;
				width: 100%;
				height: 100%;
				margin: auto 0;
				text-align: center;
			}
		}
		td.view-count {
			flex: 1;
			> span {
				display: inline-block;
				height: 100%;
				width: 100%;
				line-height: 100%;
				text-align: center;
			}
		}
	}
}
</style>
