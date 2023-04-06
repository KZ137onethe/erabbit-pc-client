<template>
	<LoginLayout class="login-register">
		<template #headTitle> 账号注册 </template>
		<template #body>
			<RegisterPanel />
		</template>
	</LoginLayout>
</template>

<script>
import LoginLayout from '@/layout/login/Layout.vue'
import RegisterPanel from './components/register-panel.vue'

export default {
	setup() {
		return {}
	},
	components: { LoginLayout, RegisterPanel },
}
</script>

<style lang="less" scoped></style>
