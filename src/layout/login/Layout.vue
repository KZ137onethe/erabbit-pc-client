<template>
	<div class="login-layout">
		<LoginHeader>
			<template #subTitle>
				<slot name="headTitle"></slot>
			</template>
		</LoginHeader>
		<slot name="body"></slot>
		<LoginFooter></LoginFooter>
	</div>
</template>

<script>
import LoginHeader from './login-header.vue'
import LoginFooter from './login-footer.vue'
export default {
	setup() {
		return {}
	},
	components: {
		LoginHeader,
		LoginFooter,
	},
}
</script>

<style lang="less" scoped></style>
