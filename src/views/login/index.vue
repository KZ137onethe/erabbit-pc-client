<template>
	<div class="page-login">
		<LoginHeader>
			<template #subTitle>请先登录</template>
		</LoginHeader>
		<LoginBody></LoginBody>
		<LoginFooter></LoginFooter>
	</div>
</template>

<script>
import LoginHeader from './components/login-header.vue'
import LoginBody from './components/login-body.vue'
import LoginFooter from './components/login-footer.vue'

import { useMutations } from '@/hooks'
import { useRoute } from 'vue-router'

export default {
	name: 'pageLogin',
	setup() {
		const route = useRoute()
		const storeUserMutations = useMutations('user', ['setRedirectUrl'])
		storeUserMutations.setRedirectUrl(route.fullPath)
	},
	components: { LoginHeader, LoginFooter, LoginBody },
}
</script>

<style scoped></style>
