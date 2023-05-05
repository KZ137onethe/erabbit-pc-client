<script lang="jsx">
const OperationButton = (props, { attrs, slots, emit }) => {
	const btnClick = () => {
		emit('btnClick')
	}
	return (
		<div className={attrs.class + '-operation'}>
			<XtxButton size="mini" onClick={() => btnClick()}>
				{props.title}
			</XtxButton>
			<div className={attrs.class + '--wrapper'}>{Object.entries(slots).length !== 0 ? slots.default() : undefined}</div>
		</div>
	)
}

import { defineComponent, reactive } from 'vue'
import { Descriptions, DescriptionsItem } from 'ant-design-vue'
import 'ant-design-vue/es/descriptions/style/css'
// 购买的商品可能不止一个
const OrderCard = defineComponent({
	name: 'order-card',
	props: {
		order: Array || Object,
		required: true,
	},
	setup(props, { attrs }) {
		const data = reactive(props.order)

		return () => (
			<div class="plugin-order-card">
				<div className={['card-picture', attrs.class + '--picture'].join(' ')}>
					<img src={data?.picture} alt=""></img>
				</div>
				<Descriptions className={['card-description', attrs.class + '--info'].join(' ')} column={1}>
					<DescriptionsItem label={'配送企业'}>{data?.company.name}</DescriptionsItem>
					<DescriptionsItem label={'快递单号'}>{data?.company.number}</DescriptionsItem>
					<DescriptionsItem label={'联系电话'}>{data?.company.tel}</DescriptionsItem>
				</Descriptions>
				<div className={'card-count'}>共{data?.count}件商品</div>
			</div>
		)
	},
})
export { OrderCard }

export default OperationButton
</script>

<style lang="less" scoped>
button.xtx-button {
	margin: 1px 0;
	&:hover {
		border-color: @xtxColor;
		background: @xtxColor;
		color: #fff;
	}
}
</style>

<style lang="less">
div.plugin-order-card {
	width: 100%;
	height: 80px;
	padding: 0 10px;
	margin: 8px 0;
	border: 1px solid var(--xtx-borderColor-1);
	display: flex;
	flex-flow: row nowrap;
	align-items: center;
	&:hover {
		background-color: var(--xtx-bg-color-2);
	}
	.card-picture {
		width: 60px;
		img {
			width: 60px;
			height: 60px;
		}
	}
	.card-description {
		flex: 1;
		margin-left: 10px;
		.ant-descriptions-view {
			tr > td {
				padding-bottom: 1px;
			}
		}
	}
	.card-count {
		width: 60px;
		text-align: center;
	}
}
</style>
