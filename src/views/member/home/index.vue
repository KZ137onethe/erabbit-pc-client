<template>
	<a-layout class="member-home">
		<MemberHomeHeader></MemberHomeHeader>
		<a-layout-content>
			<MemberHomeCollect></MemberHomeCollect>
			<MemberHomeHistory></MemberHomeHistory>
		</a-layout-content>
	</a-layout>
</template>

<script>
import MemberHomeHeader from './components/member-home-header.vue'
import MemberHomeCollect from './components/member-home-collect.vue'
import MemberHomeHistory from './components/member-home-history.vue'

export default {
	setup() {
		return {}
	},
	components: {
		MemberHomeHeader,
		MemberHomeCollect,
		MemberHomeHistory,
	},
}
</script>

<style lang="less" scoped>
.member-home {
	background-color: var(--xtx-bg-color-1);
}
</style>
