<template>
	<div class="member-home-history">
		<MemberHomePanel title="我的足迹" :goods="history?.items" :jump-data="{ path: '/', info: '查看全部 >' }" />
	</div>
</template>

<script>
import MemberHomePanel from './member-home-panel.vue'

import { ref, onMounted } from 'vue'

import { memberApi } from '@/api'
const { _getHistory } = memberApi
export default {
	setup() {
		const history = ref([])
		onMounted(() => {
			_getHistory({ page: 1, pageSize: 4 }).then((data) => {
				history.value = data.result
				console.log('history:', history.value)
			})
		})
		return {
			history,
		}
	},
	components: {
		MemberHomePanel,
	},
}
</script>

<style lang="less" scoped></style>
