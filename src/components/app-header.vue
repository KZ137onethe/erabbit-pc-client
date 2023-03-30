<template>
	<header class="app-header">
		<div class="container">
			<RouterLink to="/">
				<a-image :width="200" :height="132" :src="logoImg" :preview="false" class="logo" />
			</RouterLink>
			<AppHeaderNav></AppHeaderNav>
			<a-input-group size="large" :style="{ width: 172 + 'px' }" compact>
				<a-input v-model:value="value" :style="{ width: 95 + '%' }" placeholder="搜一搜" @search="onSearch">
					<template #prefix>
						<SearchOutlined />
					</template>
				</a-input>
			</a-input-group>
			<!-- 购物车 -->
			<AppHeaderCart></AppHeaderCart>
		</div>
	</header>
</template>

<script>
import AppHeaderNav from './app-header-nav'
import AppHeaderCart from './app-header-cart'
import { SearchOutlined } from '@ant-design/icons-vue'
import logoImg from '@/assets/images/logo.png'
export default {
	components: {
		AppHeaderNav,
		AppHeaderCart,
		SearchOutlined,
	},
	setup() {
		return {
			logoImg,
		}
	},
}
</script>

<style lang="less" scoped>
.app-header {
	height: 132px;
	background: #fff;
	.container {
		display: flex;
		align-items: center;
		// logo图片的样式
		&:deep(.logo) {
			width: 200px;
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
		}
	}
}
</style>
