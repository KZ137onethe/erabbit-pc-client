<template>
	<div class="app-header-sticky" :class="{ show: show }">
		<div class="container" v-show="show">
			<RouterLink to="/">
				<a-image :width="200" :height="132" :src="logoImg" :preview="false" class="logo" />
			</RouterLink>
			<AppHeaderNav :layer-show="show" />
			<a-row type="flex" justify="space-around" align="middle">
				<a-col :flex="1">
					<RouterLink to="/">品牌</RouterLink>
				</a-col>
				<a-col :flex="1">
					<RouterLink to="/">专题</RouterLink>
				</a-col>
			</a-row>
		</div>
	</div>
</template>

<script>
import AppHeaderNav from './app-header-nav.vue'

import { computed, toRefs } from 'vue'
import { useWindowScroll } from '@vueuse/core'
import logoImg from '@/assets/images/logo.png'
export default {
	name: 'app-header-sticky',
	components: {
		AppHeaderNav,
	},
	props: {
		// 其实传递过来的是 computed 的数据
		isShow: {
			type: String,
			default: true,
		},
	},
	setup(props) {
		const { y } = useWindowScroll()
		const isShow = computed(() => props.isShow?.value)
		const show = computed(() => {
			return Boolean(y.value >= 100 && isShow.value)
		})
		return {
			scrollY: y,
			logoImg,
			isShow,
			show,
		}
	},
}
</script>

<style scoped lang="less">
.app-header-sticky {
	width: 100%;
	height: 80px;
	position: fixed;
	left: 0;
	top: 0;
	z-index: 999;
	background-color: #fff;
	border-bottom: 1px solid #e4e4e4;
	transform: translateY(-100%);
	display: none;
	&.show {
		transition: all 0.2s linear;
		transform: none;
		display: block;
	}
	.container {
		display: flex;
		align-items: center;
		height: 100%;
		// logo图片的样式
		&:deep(.logo) {
			width: 200px;
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
		}
		.ant-row {
			width: 220px;
			height: 100%;
			.ant-col {
				&:first-child {
					> a {
						border-left: 2px solid @xtxColor;
					}
				}
				a {
					width: 100%;
					height: 32px;
					display: inline-block;
					text-align: center;
					font-size: 16px;
					line-height: 32px;
					&:hover {
						color: @xtxColor;
					}
				}
			}
		}
	}
}
</style>
