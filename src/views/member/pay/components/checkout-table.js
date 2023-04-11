import { ref } from 'vue'

export const columns = ref([
	{
		title: 'id',
		width: 100,
		dataIndex: 'id',
		align: 'center',
	},
	{
		title: '商品信息',
		width: 500,
		dataIndex: 'goodsInfo',
		align: 'left',
	},
	{
		title: '单价(¥)',
		width: 100,
		dataIndex: 'price',
		align: 'center',
	},
	{
		title: '数量',
		width: 100,
		dataIndex: 'count',
		align: 'center',
	},
	{
		title: '小计(¥)',
		width: 100,
		dataIndex: 'totalPrice',
		align: 'center',
	},
	{
		title: '实付(¥)',
		width: 120,
		dataIndex: 'totalPayPrice',
		align: 'center',
	},
])
