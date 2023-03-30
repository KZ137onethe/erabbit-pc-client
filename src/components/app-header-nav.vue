<template>
	<div class="app-header-nav">
		<a-row type="flex" justify="space-around" align="middle">
			<a-col :flex="1"><RouterLink to="/">首页</RouterLink></a-col>
			<a-col
				:flex="1"
				v-for="item in categoryList.result"
				:key="item.id"
				@mousemove="showSubCategory(item.id)"
				@mouseleave="hideSubCategory(item.id)"
			>
				<RouterLink :to="`/category/${item.id}`" @click="hideSubCategory(item.id)">
					{{ item.name }}
				</RouterLink>
				<div class="layer" :class="{ open: item.open }">
					<ul>
						<li v-for="sub in item.children" :key="sub.id">
							<RouterLink :to="`/category/sub/${sub.id}`" @click="hideSubCategory(item.id)">
								<img :src="sub.picture" alt="" />
								<p>{{ sub.name }}</p>
							</RouterLink>
						</li>
					</ul>
				</div>
			</a-col>
		</a-row>
	</div>
</template>

<script>
import { useState } from '@/hooks'
import { mapMutations } from 'vuex'
export default {
	name: 'app-header-nav',
	setup() {
		const storeCategoryState = useState('category', {
			categoryList: (state) => state.list,
		})
		/**
		 * ? 1.鼠标进入一级分类展示对应的二级分类弹窗
		 * ? 2.点击一级分类，二级分类，隐藏二级分类弹窗
		 * ? 3.离开一级分类，二级分类，隐藏二级分类弹窗
		 */
		const storeCategoryMutation = mapMutations('category', {
			showSubCategory: 'show',
			hideSubCategory: 'hide',
		})
		// console.log('storeCategoryMutation:', storeCategoryMutation)
		return {
			...storeCategoryState,
			...storeCategoryMutation,
		}
	},
}
</script>

<style lang="less" scoped>
.app-header-nav {
	width: 820px;
	padding-left: 40px;
	position: relative;
	z-index: 998;
	.ant-row {
		height: 100%;
		.ant-col {
			> a {
				display: inline-block;
				height: 32px;
				line-height: 32px;
				font-size: 16px;
			}
			&:hover {
				> a {
					color: @xtxColor;
					border-bottom: 1px solid @xtxColor;
				}
			}

			.layer {
				&.open {
					height: 132px;
					opacity: 1;
				}
				width: 1240px;
				background-color: #fff;
				position: absolute;
				left: -200px;
				top: 56px;
				height: 0;
				overflow: hidden;
				opacity: 0;
				box-shadow: 0 0 5px #ccc;
				transition: all 0.2s 0.1s;
				ul {
					display: flex;
					flex-wrap: wrap;
					padding: 0 70px;
					align-items: center;
					height: 132px;
					li {
						width: 110px;
						text-align: center;
						img {
							width: 60px;
							height: 60px;
						}
						p {
							padding-top: 10px;
						}
						&:hover {
							p {
								color: @xtxColor;
							}
						}
					}
				}
			}
		}
	}
}
</style>
