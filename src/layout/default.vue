<template>
	<div class="default-layout">
		<!-- 顶部组件 -->
		<AppNavbar />
		<!-- 头部组件 -->
		<AppHeader />
		<!-- 头部吸顶组件 -->
		<AppHeaderSticky v-model:isShow="headSticky" />
		<div class="main">
			<!-- 二级页面 -->
			<slot name="childBody"></slot>
		</div>
		<AppFooter />
	</div>
</template>

<script>
import { computed, inject } from 'vue'
export default {
	setup() {
		const headSticky = computed(() => {
			return inject('headSticky', true)
		})

		return {
			headSticky,
		}
	},
}
</script>

<style lang="scss" scoped></style>
