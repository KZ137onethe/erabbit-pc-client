<template>
	<OperationButton title="确认收货" @btnClick="showModal" class="order-receipt">
		<a-modal v-model:visible="visible" title="确认收货" @ok="handleOk">
			<p class="description">您确认收到货吗？确认后货款将会打给卖家。</p>
		</a-modal>
	</OperationButton>
</template>

<script>
import { ref } from 'vue'
import { memberApi } from '@/api'

import OperationButton from './operation-btn.vue'
import { message } from 'ant-design-vue'
import 'ant-design-vue/es/message/style/css'

const { _receiptOrder } = memberApi
export default {
	props: {
		orderId: {
			type: String,
			required: true,
		},
	},
	setup(props, { emit }) {
		const visible = ref(false)
		const showModal = () => {
			visible.value = true
		}
		const handleOk = () => {
			_receiptOrder(props.orderId).then(() => {
				message('确认收货成功!')
				visible.value = false
				emit('refresh')
			})
		}
		return {
			visible,
			showModal,
			handleOk,
		}
	},
	components: {
		OperationButton,
	},
}
</script>

<style lang="less" scoped></style>
