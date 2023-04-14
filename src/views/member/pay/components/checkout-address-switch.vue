<template>
	<a-modal class="checkout-address-switch" title="切换收货地址" @ok="onFinish" @cancel="onClose" v-model:visible="visible">
		<div
			class="address-item"
			v-for="(address, index) in addressList"
			:key="address.id"
			@click="selected(address)"
			:class="{ selected: address.selected }"
		>
			<a-row align="middle" :wrap="false">
				<a-col :span="20">
					<a-descriptions size="small" :column="1">
						<a-descriptions-item label="收货人">{{ address.receiver }}</a-descriptions-item>
						<a-descriptions-item label="联系方式">{{ address.contact }}</a-descriptions-item>
						<a-descriptions-item label="收货地址">{{ address.fullLocation + address.address }}</a-descriptions-item>
					</a-descriptions>
				</a-col>
				<a-col :span="4">
					<a-popover v-model:visible="popoverVisible[index]" trigger="click" placement="bottomRight">
						<template #title>
							<span style="color: blue">你确认删除该地址吗?</span>
						</template>
						<template #content>
							<a-space :size="8">
								<a-button size="small" type="text" @click="popoverControl(index, false)">取消</a-button>
								<a-button size="small" danger @click="deleteAddress(address.id)">确认</a-button>
							</a-space>
						</template>
						<a-button type="dashed" @click="popoverControl(index, true)">删除</a-button>
					</a-popover>
				</a-col>
			</a-row>
		</div>
	</a-modal>
</template>

<script>
import { computed, ref, reactive, nextTick } from 'vue'
import { orderApi } from '@/api'

const { _removeAddress } = orderApi
export default {
	props: {
		open: {
			type: Boolean,
			default: false,
		},
		addressGroup: {
			type: Array,
			required: true,
		},
	},
	setup(props, { emit }) {
		const visible = computed(() => props.open)
		const addressList = computed(() => {
			// 这里不能用解构赋值和Object.assign, 因为数组中的元素是对象会进行引用
			// 进行深拷贝
			const copy = JSON.parse(JSON.stringify(props.addressGroup))
			copy.forEach((item) => {
				item.selected = !Boolean(item.isDefault)
			})
			return copy
		})
		const popoverVisible = ref([])
		nextTick().then(() => {
			// DOM更新后
			popoverVisible.value = new Array(addressList.value.length).fill(false)
		})
		const currentAddress = ref({})

		const onFinish = () => {
			const copy = Object.assign({}, currentAddress.value)
			delete copy.selected
			console.log('copy:', copy)
			emit('change', copy)
			onClose()
		}
		const onClose = () => {
			emit('close', false)
		}

		const popoverControl = (index, status) => {
			popoverVisible.value[index] = status
		}

		// 这里只需控制isDefault
		const selected = (address) => {
			for (let i = 0; i < addressList.value.length; i++) {
				addressList.value[i].isDefault = 1
			}
			console.log(
				addressList.value.map((item) => {
					return item?.isDefault
				})
			)
			const index = addressList.value.findIndex((item) => item.id === address.id)
			addressList.value[index].isDefault = 0
			const outAddress = Object.assign({}, addressList.value[index])
			console.log(outAddress)
			currentAddress.value = outAddress
		}

		const deleteAddress = (addressId) => {
			const id = addressId ?? false
			if (id) {
				_removeAddress(id).then(() => {
					emit('delete', id)
				})
			}
		}
		return {
			visible,
			popoverVisible,
			addressList,
			currentAddress,
			onFinish,
			onClose,
			popoverControl,
			selected,
			deleteAddress,
		}
	},
}
</script>

<style lang="less" scoped>
.address--active {
	border-color: @xtxColor;
	background-color: var(--xtx-bg-success);
	cursor: pointer;
}
div.address-item {
	box-sizing: content-box;
	padding: 10px;
	border: 1px solid var(--xtx-borderColor-1);
	margin: 5px 0;
	&:hover {
		.address--active();
	}
	&.selected {
		.address--active();
	}
}
</style>
