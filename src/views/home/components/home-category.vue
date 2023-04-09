<template>
	<div class="home-category" @mouseleave="categoryId = null">
		<ul class="menu">
			<li v-for="item in leftCategoryList" :key="item.id" @mouseenter="categoryId = item.id" :class="{ active: categoryId === item.id }">
				<RouterLink :to="`/category/${item.id}`">{{ item.name }}</RouterLink>
				<template v-if="item.children">
					<RouterLink v-for="sub in item.children" :key="sub.id" :to="`/category/sub/${sub.id}`">
						{{ sub.name }}
					</RouterLink>
				</template>
				<template v-else>
					<XtxSkeleton width="60px" height="18px" style="margin-right: 5px" bg="rgba(255,255,255,0.2)" />
					<XtxSkeleton width="50px" height="18px" bg="rgba(255,255,255,0.2)" />
				</template>
			</li>
		</ul>
		<!-- 弹层 -->
		<div class="layer">
			<h4>分类推荐 <small>根据您的购买或浏览记录推荐</small></h4>
			<!-- 常用分类下的商品 -->
			<ul v-if="currentCategory?.goods?.length">
				<li v-for="item in currentCategory.goods" :key="item.id">
					<RouterLink to="/">
						<img :src="item.picture" alt="" />
						<div class="info">
							<p class="name ellipsis-2">{{ item.name }}</p>
							<p class="desc ellipsis">{{ item.desc }}</p>
							<p class="price"><i>¥</i>{{ item.price }}</p>
						</div>
					</RouterLink>
				</li>
			</ul>
			<!-- 品牌推荐的商品 -->
			<ul v-if="currentCategory && currentCategory.brands && currentCategory.brands.length">
				<li class="brand" v-for="item in currentCategory.brands" :key="item.id">
					<RouterLink to="/">
						<img :src="item.picture" alt="" />
						<div class="info">
							<p class="place">{{ item.place }}</p>
							<p class="name ellipsis">{{ item.name }}</p>
							<p class="desc ellipsis-2">{{ item.desc }}</p>
						</div>
					</RouterLink>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import { useState } from '@/hooks'
import { homeApi } from '@/api'
import { ref, reactive, computed } from 'vue'

const { _findBrand } = homeApi
export default {
	name: 'home-category',
	setup() {
		/**
		 * 1. 获取vuex的一级分类，并且只需要两个二级分类
		 * 2. 需要在组件内部，定义一个品牌数据
		 * 3. 根据vuex的分类数据和组件中定义品牌数据，得到左侧分类完整数据(9分类+1品牌)数组
		 * 4. 进行渲染即可
		 */
		const brand = reactive({
			id: 'brand',
			name: '品牌',
			children: [{ id: 'brand-children', name: '品牌推荐' }],
			brands: [],
		})
		const storeCategoryState = useState('category', {
			categoryList: 'list',
		})
		// TODO: 下面函数中map有时候在首次网站的时候，白屏；控制台报错
		const leftCategoryList = computed(() => {
			const list = storeCategoryState.categoryList.value.result.map((item) => {
				return {
					id: item.id,
					name: item.name,
					children: item.children && item.children.slice(0, 2),
					goods: item.goods,
				}
			})
			list.push(brand)
			return list
		})
		// console.log(leftCategoryList)
		// ? 定义一个数据记录当前鼠标经过分类的ID，使用计算属性得到当前的分类推荐商品数据
		const categoryId = ref(null)
		const currentCategory = computed(() => {
			return leftCategoryList.value.find((item) => item.id === categoryId.value)
		})
		// ? 获取品牌的数据
		_findBrand().then((data) => {
			brand.brands = data.result
		})
		return {
			leftCategoryList,
			categoryId,
			currentCategory,
		}
	},
}
</script>

<style scoped lang="less">
.home-category {
	width: 250px;
	height: 500px;
	background: rgba(0, 0, 0, 0.8);
	position: relative;
	z-index: 99;
	.menu {
		li {
			padding-left: 40px;
			height: 50px;
			line-height: 50px;
			&:hover,
			&.active {
				background: @xtxColor;
			}
			a {
				margin-right: 4px;
				color: #fff;
				&:first-child {
					font-size: 16px;
				}
			}
		}
	}
	.layer {
		width: 990px;
		height: 500px;
		background: rgba(255, 255, 255, 0.8);
		position: absolute;
		left: 250px;
		top: 0;
		display: none;
		padding: 0 15px;
		h4 {
			font-size: 20px;
			font-weight: normal;
			line-height: 80px;
			small {
				font-size: 16px;
				color: #666;
			}
		}
		ul {
			display: flex;
			flex-wrap: wrap;
			li {
				width: 310px;
				height: 120px;
				margin-right: 15px;
				margin-bottom: 15px;
				border: 1px solid #eee;
				border-radius: 4px;
				background: #fff;
				&:nth-child(3n) {
					margin-right: 0;
				}
				a {
					display: flex;
					width: 100%;
					height: 100%;
					align-items: center;
					padding: 10px;
					&:hover {
						background: #e3f9f4;
					}
					img {
						width: 95px;
						height: 95px;
					}
					.info {
						padding-left: 10px;
						line-height: 24px;
						width: 190px;
						p {
							margin: 0;
							padding: 0;
						}
						.name {
							font-size: 16px;
							color: #666;
						}
						.desc {
							color: #999;
						}
						.price {
							font-size: 22px;
							color: @priceColor;
							i {
								font-size: 16px;
							}
						}
					}
				}
			}
		}
		li.brand {
			height: 180px;
			a {
				align-items: flex-start;
				img {
					width: 120px;
					height: 160px;
				}
				.info {
					p {
						margin-top: 8px;
					}
					.place {
						color: #999;
					}
				}
			}
		}
	}
	&:hover {
		.layer {
			display: block;
		}
	}
}

.xtx-skeleton {
	animation: fade 1s linear infinite alternate;
}
@keyframes fade {
	from {
		opacity: 0.2;
	}
	to {
		opacity: 1;
	}
}
</style>
