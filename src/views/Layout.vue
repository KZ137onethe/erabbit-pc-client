<template>
	<DefaultLayout class="app-layout">
		<template #childBody>
			<router-view></router-view>
		</template>
	</DefaultLayout>
</template>

<script>
import DefaultLayout from '@/layout/default.vue'

import { useRoute } from 'vue-router'
import { computed, provide } from 'vue'
import { useState, useActions } from '@/hooks'

export default {
	name: 'Layout-default',
	components: {
		DefaultLayout,
	},
	setup() {
		const route = useRoute()
		const control = computed(() => {
			if (route.path === '/cart' || route.fullPath.search(/\/member[\/\w*]*/) !== -1) {
				return false
			} else {
				return true
			}
		})
		const storeCategoryActions = useActions('category', {
			getCategoryList: 'getList',
		})
		storeCategoryActions.getCategoryList()
		const storeCategoryState = useState('category', ['list'])
		provide('headSticky', control)
		return {
			control,
			...storeCategoryActions,
			...storeCategoryState,
		}
	},
}
</script>

<style lang="less" scoped></style>
