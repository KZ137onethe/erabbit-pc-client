<template>
	<OperationButton class="order-cancel" title="取消订单" @btnClick="showModal">
		<a-modal v-model:visible="visible" title="取消订单" :confirm-loading="confirmLoading" @ok="handleOk">
			<p class="description">取消订单后，本单享有的优惠可能会一并取消，是否继续？</p>
			<a-row :wrap="true" class="option">
				<a-col class="option_title" :span="24">
					<p>请选择取消订单的原因（必选）:</p>
				</a-col>
				<a-col class="option_btn" :span="12" v-for="(obj, index) of cancelArr" :key="obj.reason">
					<XtxButton :class="{ selected: obj.selected }" @click="selectedReason(index)">
						{{ obj.reason }}
					</XtxButton>
				</a-col>
			</a-row>
		</a-modal>
	</OperationButton>
</template>
<script>
import OperationButton from './operation-btn.vue'
import { message } from 'ant-design-vue'
import 'ant-design-vue/es/message/style/css'

import { ref, reactive, computed, defineComponent } from 'vue'

import { cancelReason, memberApi } from '@/api'
const { _cancelOrder } = memberApi
export default defineComponent({
	props: {
		orderId: {
			type: String,
			required: true,
		},
	},
	setup(props, { emit }) {
		const visible = ref(false)
		const cancelArr = reactive(
			cancelReason.map((reason) => {
				return {
					reason,
					selected: false,
				}
			})
		)
		const nowReason = computed(() => {
			const current = cancelArr.filter((reason) => {
				return reason.selected
			})
			return current[0]?.reason
		})
		const confirmLoading = ref(false)
		const showModal = () => {
			visible.value = true
		}
		const handleOk = () => {
			const cancelReasonLen = cancelReason.length
			for (let reason of cancelReason) {
				if (reason === nowReason.value) {
					break
				}
				if (reason === cancelReason[cancelReasonLen - 1]) {
					message.warn('没有选择取消订单原因！')
					return
				}
			}
			confirmLoading.value = true
			console.log('orderId:', props.orderId)
			_cancelOrder({ orderId: props.orderId, cancelReason: nowReason.value }).then(() => {
				confirmLoading.value = false
				visible.value = false
				// 提醒父组件重新发一次请求获得最新的数据
				emit('refresh')
				message.success('取消订单成功！')
			})
		}
		const selectedReason = (index) => {
			cancelArr.forEach((obj) => (obj.selected = false))
			cancelArr[index].selected = true
		}
		return {
			visible,
			cancelArr,
			nowReason,
			confirmLoading,
			showModal,
			handleOk,
			selectedReason,
		}
	},
	components: {
		OperationButton,
	},
})
</script>

<style lang="less" scoped>
.option_title {
	color: var(--xtx-font-color-3);
}
.option_btn {
	text-align: center;
	margin: 5px 0;
	button.xtx-button {
		width: 220px;
		&.selected {
			border-color: @xtxColor;
			color: @xtxColor;
			background: lighten(@xtxColor, 50%);
		}
	}
}
</style>
