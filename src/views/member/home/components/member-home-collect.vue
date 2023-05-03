<template>
	<div class="member-home-collect">
		<MemberHomePanel title="我的收藏" :goods="collect?.items" :jump-data="{ path: '/', info: '查看全部 >' }" />
	</div>
</template>

<script>
import MemberHomePanel from './member-home-panel.vue'

import { memberApi } from '@/api'
import { ref, onMounted } from 'vue'

const { _getCollect } = memberApi
export default {
	setup() {
		const collect = ref([])
		onMounted(() => {
			_getCollect({ page: 1, pageSize: 4 }).then((data) => {
				collect.value = data.result
				console.log(collect)
			})
		})

		return {
			collect,
		}
	},
	components: {
		MemberHomePanel,
	},
}
</script>

<style lang="less" scoped></style>
