<template>
	<svg :class="svgClass" :style="svgSize" aria-hidden="true">
		<use :xlink:href="iconName" :fill="color" />
	</svg>
</template>

<script>
import { defineComponent, computed } from 'vue'

export default defineComponent({
	name: 'SvgIcon',
	props: {
		name: {
			type: String,
			required: true,
		},
		className: {
			type: String,
			default: '',
		},
		size: {
			type: Number,
			required: true,
		},
		color: {
			type: String,
			default: '',
		},
	},
	setup(props) {
		const svgClass = computed(() => {
			if (props.className) {
				return `svg-icon ${props.className}`
			}
			return 'svg-icon'
		})
		const svgSize = computed(() => {
			return {
				width: `${props.size}px`,
				height: `${props.size}px`,
			}
		})
		const iconName = computed(() => `#icon-${props.name}`)
		const color = computed(() => props.color)
		return { svgClass, svgSize, iconName, color }
	},
})
</script>

<style lang="scss" scoped></style>
