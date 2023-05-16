<template>
	<ul class="goods-sales">
		<li>
			<p>销量人气</p>
			<p>200+</p>
			<p>
				<svg-icon name="flag" size="16" color="#27BA9B"></svg-icon>
				<span>销量人气</span>
			</p>
		</li>
		<li>
			<p>商品评价</p>
			<p>400+</p>
			<p>
				<svg-icon name="comment" size="16" color="#27BA9B"></svg-icon>
				<span>查看评价</span>
			</p>
		</li>
		<li>
			<p>收藏人气</p>
			<p>600+</p>
			<p>
				<svg-icon name="star" size="16" color="#27BA9B"></svg-icon>
				<span>收藏商品</span>
			</p>
		</li>
		<li>
			<p>品牌信息</p>
			<p>苏宁电器</p>
			<p>
				<svg-icon name="brand" size="16" color="#27BA9B"></svg-icon>
				<span>品牌主页</span>
			</p>
		</li>
	</ul>
</template>

<script>
export default {
	setup() {
		return {}
	},
}
</script>

<style lang="less" scoped>
.goods-sales {
	display: flex;
	width: 400px;
	align-items: center;
	text-align: center;
	height: 140px;
	li {
		flex: 1;
		position: relative;
		~ li::after {
			position: absolute;
			top: 10px;
			left: 0;
			height: 60px;
			border-left: 1px solid #e4e4e4;
			content: '';
		}
		p {
			&:first-child {
				color: #999;
			}
			&:nth-child(2) {
				color: @priceColor;
				margin-top: 10px;
			}
			&:last-child {
				color: #666;
				margin-top: 10px;
				span {
					vertical-align: text-top;
					margin-left: 3px;
				}
				&:hover {
					color: @xtxColor;
					cursor: pointer;
				}
			}
		}
	}
}
</style>
