<template>
	<div class="login-register">
		<LoginHeader>
			<template #subTitle>账号注册</template>
		</LoginHeader>
		<RegisterPanel></RegisterPanel>
		<LoginFooter></LoginFooter>
	</div>
</template>

<script>
import LoginHeader from './components/login-header.vue'
import LoginFooter from './components/login-footer.vue'
import RegisterPanel from './components/register-panel.vue'

export default {
	setup() {
		return {}
	},
	components: { LoginHeader, RegisterPanel, LoginFooter },
}
</script>

<style lang="less" scoped></style>
