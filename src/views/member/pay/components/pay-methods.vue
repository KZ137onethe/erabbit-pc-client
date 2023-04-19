<template>
	<div class="pay-methods">
		<Option title="支付方式">
			<template #content>
				<div class="main">
					<a-space size="middle">
						<a-button size="large">工商银行</a-button>
						<a-button size="large">招商银行</a-button>
						<a-button size="large">建设银行</a-button>
						<a-button size="large">农业银行</a-button>
						<a-button size="large" disabled>交通银行</a-button>
					</a-space>
				</div>
			</template>
		</Option>
	</div>
</template>

<script>
import Option from './public-option.vue'
export default {
	setup() {
		return {}
	},
	components: {
		Option,
	},
}
</script>

<style lang="less" scoped></style>
