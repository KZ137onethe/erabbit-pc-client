<template>
	<div class="order-delete">
		<a-button type="link" size="small" @click="showDeleteConfirm">删除订单</a-button>
	</div>
</template>

<script>
import { memberApi } from '@/api'

import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
import { createVNode } from 'vue'
import { Modal, message } from 'ant-design-vue'
import 'ant-design-vue/es/message/style/css'
import 'ant-design-vue/es/modal/style/css'
const { _deleteOrder } = memberApi
export default {
	props: {
		orderId: {
			type: String,
			required: true,
		},
	},
	setup(props, { emit }) {
		const showDeleteConfirm = () => {
			Modal.confirm({
				title: '是否删除该订单?',
				icon: createVNode(ExclamationCircleOutlined),
				content: `订单编号：${props.orderId}`,
				okText: '删除',
				okType: 'danger',
				cancelText: '返回',
				onOk() {
					_deleteOrder([props.orderId]).then(() => {
						message.success('删除成功!')
						emit('refresh')
					})
				},
			})
		}
		return {
			showDeleteConfirm,
		}
	},
}
</script>

<style lang="less" scoped></style>
