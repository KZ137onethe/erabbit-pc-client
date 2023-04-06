import { ref } from 'vue'

// 首先这个布局不分页， 要固定底部的summary栏目

// 选择器选项
export const options = ref([
	{
		value: 'all',
		label: '全部',
	},
	{
		value: 'valid',
		label: '有效商品',
	},
	{
		value: 'invalid',
		label: '无效商品',
	},
])

// 表格的列布局
export const columns = ref([
	{
		name: 'Selected',
		dataIndex: 'name',
		key: 'Selected',
		checked: false,
		align: 'center',
		width: 120,
	},
	{
		title: '商品信息',
		dataIndex: 'age',
		key: 'Name',
		width: 500,
	},
	{
		title: '单价',
		dataIndex: 'address',
		key: 'Price',
		width: 80,
	},
	{
		title: '数量',
		dataIndex: 'tags',
		key: 'Count',
		width: 100,
	},
	{
		title: '小计',
		key: 'Amount',
		width: 120,
	},
	{
		title: '操作',
		key: 'Action',
		width: 300,
	},
])
