<template>
	<div class="home-product" ref="target">
		<HomePanel v-for="item in goods" :key="item.id" :title="item.name" subTitle="">
			<template #head-right>
				<a-row align="middle" justify="space-around">
					<a-space>
						<a-col v-for="child in item.children" :key="child.id">
							<RouterLink to="/">{{ child.name }}</RouterLink>
						</a-col>
					</a-space>
				</a-row>
				<XtxMore />
			</template>
			<template #main>
				<a-row type="flex" :gutter="16">
					<a-col flex="240px" class="cover">
						<router-link to="/">
							<img alt="" v-lazy="item.picture" />
						</router-link>
					</a-col>
					<a-col flex="1000px" class="goods">
						<a-row :gutter="5" style="width: 1000px">
							<a-col v-for="ware in item.goods" :key="ware.id" :style="{ width: 240 + 'px', height: 300 + 'px' }">
								<HomeGoods :ware="ware" />
							</a-col>
						</a-row>
					</a-col>
				</a-row>
			</template>
		</HomePanel>
	</div>
</template>

<script>
import HomePanel from './home-panel'
import HomeGoods from './home-goods'
import { useLazyData } from '@/hooks'
import { homeApi } from '@/api'

const { _findGoodsColumn } = homeApi
export default {
	components: {
		HomePanel,
		HomeGoods,
	},
	setup() {
		// TODO: 添加左侧图片的两个说明
		const { target, res } = useLazyData(_findGoodsColumn)
		return {
			goods: res,
			target,
		}
	},
}
</script>

<style lang="less" scoped>
.home-product {
	background: #fff;
	height: 2952px;
	.head {
		.ant-row {
			height: 32px;
			margin-right: 80px;
			.ant-col {
				a {
					padding: 2px 12px;
					border-radius: 2px;
					font-size: 16px;
					&:hover {
						background: @xtxColor;
						color: #fff;
					}
				}
			}
		}
		.xtx-more {
			height: 32px;
			line-height: 32px;
			margin: 0;
		}
	}
	.main {
		height: 610px;
		.cover {
			width: 100%;
			height: 100%;
			&:deep(img) {
				width: 240px;
				height: 610px;
				object-fit: cover;
			}
		}
	}
}
</style>
