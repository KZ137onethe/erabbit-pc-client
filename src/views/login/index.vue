<template>
	<LoginLayout class="page-login">
		<template #headTitle> 请先登录 </template>
		<template #body>
			<LoginBody></LoginBody>
		</template>
	</LoginLayout>
</template>

<script>
import LoginLayout from '@/layout/login/Layout.vue'
import LoginBody from './components/login-body.vue'

import { useMutations } from '@/hooks'
import { useRoute } from 'vue-router'

export default {
	name: 'pageLogin',
	setup() {
		const route = useRoute()
		const storeUserMutations = useMutations('user', ['setRedirectUrl'])
		storeUserMutations.setRedirectUrl(route.fullPath)
	},
	components: { LoginLayout, LoginBody },
}
</script>

<style scoped></style>
