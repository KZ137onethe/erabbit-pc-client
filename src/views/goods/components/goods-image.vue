<template>
	<div class="goods-image">
		<div class="preview" ref="target">
			<a-image :preview="false" :src="pictures[imgIndex]" />
			<div v-show="show" class="mask" :style="maskPos" />
		</div>
		<div v-show="show" class="enlarge" :style="{ ...enlargeStyle }"></div>
		<ul class="indicator">
			<li v-for="(address, index) in pictures" :key="index">
				<a-image :preview="false" :src="address" @click="curIndex(index)" />
			</li>
		</ul>
	</div>
</template>

<script>
import { ref, reactive, watch } from 'vue'
import { useMouseInElement } from '@vueuse/core'
export default {
	props: {
		images: {
			type: Array,
			default: () => [],
		},
	},
	setup(props) {
		// 切换图片
		const pictures = ref([])
		const imgIndex = ref(0)
		pictures.value = props.images.filter((item) => {
			return !!item
		})

		const curIndex = (index) => {
			imgIndex.value = index
		}

		// 放大镜的效果
		const target = ref(null)
		const show = ref(false)
		const maskPos = reactive({
			left: 0,
			top: 0,
		})
		const bgImage = ref(`url(${pictures.value[0]})`)
		watch(
			() => imgIndex.value,
			(newVal) => {
				bgImage.value = `url(${pictures.value[newVal]})`
			}
		)
		const enlargeStyle = reactive({
			backgroundImage: bgImage,
			backgroundPositionX: 0,
			backgroundPositionY: 0,
		})
		const { elementX: elX, elementY: elY, isOutside } = useMouseInElement(target)
		watch([elX, elY, isOutside], () => {
			// 遮罩层的处理

			elX.value < 100 ? (maskPos.left = 0) : elX.value > 300 ? (maskPos.left = 200) : (maskPos.left = elX.value - 100)

			elY.value < 100 ? (maskPos.top = 0) : elY.value > 300 ? (maskPos.top = 200) : (maskPos.top = elY.value - 100)

			maskPos.left += 'px'
			maskPos.top += 'px'
			// 放大图片的处理
			show.value = !isOutside.value
			enlargeStyle.backgroundPositionX = -2 * parseInt(maskPos.left) + 'px'
			enlargeStyle.backgroundPositionY = -2 * parseInt(maskPos.top) + 'px'
		})
		return {
			pictures,
			imgIndex,
			curIndex,
			target,
			show,
			maskPos,
			enlargeStyle,
		}
	},
}
</script>

<style lang="less" scoped>
.goods-image {
	width: 480px;
	height: 400px;
	position: relative;
	display: flex;
	.preview {
		position: relative;
		width: 400px;
		height: 400px;
		background: var(--xtx-font-color-2);
		.mask {
			position: absolute;
			top: 0;
			left: 0;
			width: 200px;
			height: 200px;
			background: rgba(0, 0, 0, 0.2);
		}
	}
	.enlarge {
		z-index: 100;
		position: absolute;
		top: 0;
		left: 412px;
		width: 400px;
		height: 400px;
		background-color: #fff;
		background-size: 800px 800px;
		background-repeat: no-repeat;
	}
	.indicator {
		width: 80px;
		li {
			width: 68px;
			height: 68px;
			margin-left: 12px;
			margin-bottom: 15px;
			cursor: pointer;
			&:hover,
			&.active {
				border: 2px solid @xtxColor;
			}
		}
	}
}
</style>
