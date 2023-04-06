<template>
	<button class="xtx-button ellipsis" :class="[size, type, disable]">
		<slot></slot>
	</button>
</template>

<script>
import { computed } from 'vue'
export default {
	name: 'XtxButton',
	props: {
		size: {
			type: String,
			default: 'middle',
		},
		type: {
			type: String,
			default: 'default',
		},
		disabled: {
			type: Boolean,
			default: true,
		},
	},
	setup(props) {
		const disable = computed(() => (props?.disabled ? 'disabled' : ''))
		// TODO: 新增一个功能：深度禁用，即传入一个指令，可以开启button的禁用，防止click事件触发
		return {
			disable,
		}
	},
}
</script>

<style lang="less" scoped>
.xtx-button {
	appearance: none;
	border: none;
	background: #fff;
	text-align: center;
	border: 1px solid transparent;
	border-radius: 4px;
	cursor: pointer;
}
// 大小
.large {
	width: 240px;
	height: 50px;
	font-size: 16px;
}
.middle {
	width: 180px;
	height: 50px;
	font-size: 16px;
}
.small {
	width: 100px;
	height: 32px;
	font-size: 14px;
}
.mini {
	width: 60px;
	height: 32px;
	font-size: 14px;
}
// 按钮类型
.default {
	border-color: #e4e4e4;
	color: #666;
	background-color: transparent;
}
.primary {
	border-color: @xtxColor;
	background: @xtxColor;
	color: #fff;
}
.plain {
	border-color: @xtxColor;
	color: @xtxColor;
	background: lighten(@xtxColor, 50%);
}
.gray {
	border-color: #ccc;
	background: #ccc;
	color: #fff;
}
.disabled {
	.default();
	color: #bbb;
	background-color: #eee;
	cursor: not-allowed;
}
</style>
