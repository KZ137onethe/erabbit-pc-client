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
