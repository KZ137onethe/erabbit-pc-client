<script lang="jsx">
import { ref, defineComponent, reactive } from 'vue'
import { Divider, Button } from 'ant-design-vue'
import { QuestionCircleOutlined } from '@ant-design/icons-vue'

const modifier = '--wrapper'
const addMessage = (array, modifier, ...attrs) => {
	const copyArray = Object.assign([], array)
	return copyArray.map((item) => {
		const message = attrs.map((attr) => item[attr])
		item.message = function () {
			return message.join(modifier)
		}
		return item
	})
}
const Option = (props, { attrs, slots }) => {
	return (
		<div className={attrs.class}>
			<Divider>{props.title}</Divider>
			<div className={attrs.class + modifier} wrap="false">
				{slots.content()}
			</div>
		</div>
	)
}

// 订单页面那块
export const DeliveryTime = defineComponent({
	setup() {
		const deliveryForm = ref([
			{
				time: '周一至周日',
				method: '不限送货时间',
			},
			{
				time: '周一至周五',
				method: '工作日送货',
			},
			{
				time: '周六至周日',
				method: '双休日、假日送货',
			},
		])
		const copyArr = addMessage(deliveryForm.value, ': ', 'method', 'time')
		return () => (
			<Option class="delivery-time bold" title="配送时间">
				{{
					content: () => (
						<div class="main">
							{copyArr.map((item, index) => (
								<a-button size="large" key={index}>
									{item.message()}
								</a-button>
							))}
						</div>
					),
				}}
			</Option>
		)
	},
	components: {
		AButton: Button,
	},
})

export const PayMethod = defineComponent({
	setup() {
		const payMethod = ref([
			{
				method: '在线支付',
				tips: {},
			},
			{
				method: '货到付款',
				tips: {
					icon: <QuestionCircleOutlined style={{ color: 'gray' }} />,
					message: '货到付款需付5元手续费',
				},
			},
		])
		return () => (
			<Option class="delivery-time bold" title="支付方式">
				{{
					content: () => (
						<div class="main inline-block">
							{payMethod.value.map((item, index) => (
								<a-button size="large" key={index}>
									{item.method}
									{Object.keys(item.tips).length ? item.tips.icon : undefined}
								</a-button>
							))}
						</div>
					),
				}}
			</Option>
		)
	},
})

// 支付页面那块
export const PaymentPlatform = defineComponent({
	setup() {
		const platform = ref([
			{
				picture: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/c66f98cff8649bd5ba722c2e8067c6ca.jpg',
				message: '微信支付',
			},
			{
				picture: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/7b6b02396368c9314528c0bbd85a2e06.png',
				message: '支付宝支付',
			},
		])
		return () => (
			<Option class="payment-platform bold" title="支付平台">
				{{
					content: () => (
						<div class="main">
							{platform.value.map((item, index) => (
								<a-button size="large" key={index}>
									<img src={item.picture} title={item.message} />
								</a-button>
							))}
						</div>
					),
				}}
			</Option>
		)
	},
})

export const PlatformMethods = defineComponent({
	setup() {
		const methods = ref(['工商银行', '招商银行', '建设银行', '农业银行', '交通银行'])
		return () => (
			<Option class="payment-methods bold" title="支付方式">
				{{
					content: () => (
						<div class="main">
							{methods.value.map((item, index) => (
								<a-button size="large" key={index}>
									{item}
								</a-button>
							))}
						</div>
					),
				}}
			</Option>
		)
	},
})
export default Option
</script>

<style lang="less" scoped>
.bold {
	.ant-divider {
		font-size: 18px;
		font-weight: bold;
	}
}

:deep(button.ant-btn) {
	margin: 0 8px;
}
:deep(.main) {
	&.inline-block {
		display: inline-block;
	}
}
</style>
