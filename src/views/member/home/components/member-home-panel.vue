<template>
	<div class="member-home-panel">
		<!-- 头部信息 -->
		<header class="panel--header">
			<span class="panel--header__title">{{ title }}</span>
			<router-link :to="jumpData.path">
				<span class="panel--header__entrance">{{ jumpData.info }}</span>
			</router-link>
		</header>
		<a-divider />
		<!-- 主体信息 -->
		<article class="panel--main">
			<a-row :gutter="16" type="flex" :justify="start" :wrap="false">
				<a-col flex="1" v-for="item in goods" :key="item.id">
					<a-card hoverable>
						<template #cover>
							<img alt="example" :src="item.picture" />
						</template>
						<a-card-meta>
							<template #title>{{ item.name }}</template>
							<template #description> &yen; {{ item.price }}</template>
						</a-card-meta>
					</a-card>
				</a-col>
			</a-row>
		</article>
	</div>
</template>

<script>
import { computed } from 'vue'
export default {
	props: {
		title: {
			type: String,
			required: true,
		},
		goods: {
			type: Array,
			required: true,
		},
		jumpData: {
			type: Object,
			required: true,
			validate: (obj) => {
				const keys = ['path', 'info']
				for (let key of keys) {
					if (!(key in obj)) {
						return false
					}
				}
				return true
			},
		},
	},
	setup(props) {
		const title = computed(() => props.title)
		const goods = computed(() => props.goods)
		const jumpData = computed(() => props.jumpData)
		return {
			title,
			goods,
			jumpData,
		}
	},
}
</script>

<style lang="less" scoped>
.member-home-panel {
	padding: 20px;
}
.panel--header {
	box-sizing: content-box;
	padding: 12px 0;
	width: 100%;
	height: 30px;
	// 清除浮动
	overflow: hidden;
	> span {
		display: inline-block;
	}
	&__title {
		float: left;
		font-size: 24px;
		height: 100%;
		line-height: 100%;
	}
	&__entrance {
		float: right;
		font-size: 14px;
		height: 18px;
		line-height: 18px;
		margin: 6px auto;
	}
}
.ant-divider {
	margin-top: 0;
}
.panel--main {
	.ant-row {
		padding: 0 10px;
	}
	&:deep(.ant-card-hoverable) {
		.hoverShadow();
	}
	&:deep(.ant-card-meta) {
		&-detail {
			text-align: center;
		}
		&-description {
			color: @priceColor;
			font-weight: bold;
		}
	}
}
</style>
