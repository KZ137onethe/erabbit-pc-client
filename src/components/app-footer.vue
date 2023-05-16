<template>
	<footer class="app-footer">
		<!-- 联系我们 -->
		<div class="container contact">
			<a-row type="flex" :gutter="16" justify="center" align="middle">
				<a-col flex="1">
					<span>客户服务</span>
					<div class="main">
						<div class="box"><MessageOutlined :style="iconStyle" /><small>在线客服</small></div>
						<div class="box"><QuestionOutlined :style="iconStyle" /><small>问题反馈</small></div>
					</div>
				</a-col>
				<a-col flex="1">
					<span>关注我们</span>
					<div class="main">
						<div class="box"><WechatOutlined :style="iconStyle" /><small>公众号</small></div>
						<div class="box"><WeiboOutlined :style="iconStyle" /><small>微博</small></div>
					</div>
				</a-col>
				<a-col flex="1">
					<span>下载APP</span>
					<div class="main">
						<div class="box"><img src="@/assets/images/qrcode.jpg" /></div>
						<div class="content">
							<small>扫描二维码</small><small>立即下载APP</small>
							<a-button>下载页面</a-button>
						</div>
					</div>
				</a-col>
				<a-col flex="1">
					<span>服务热线</span>
					<div class="main service"><span class="phone">400-0000-000</span><small>周一至周日 8:00 - 18:00</small></div>
				</a-col>
			</a-row>
		</div>
		<!-- 其它 -->
		<div class="extra">
			<div class="container">
				<!-- 优点 -->
				<div class="slogan">
					<a-row type="flex" :gutter="16">
						<a-col flex="1">
							<a href="javascript:;">
								<svg-icon name="dropbox" size="50" class="footer-icon"></svg-icon>
								&nbsp;
								<span>价格亲民</span>
							</a>
						</a-col>
						<a-col flex="1">
							<a href="javascript:;">
								<svg-icon name="thumbs-up" size="50" class="footer-icon"></svg-icon>
								&nbsp;
								<span>物流快捷</span>
							</a>
						</a-col>
						<a-col flex="1">
							<a href="javascript:;">
								<svg-icon name="truck" size="50" class="footer-icon"></svg-icon>
								&nbsp;<span>品质新鲜</span>
							</a>
						</a-col>
					</a-row>
				</div>
				<!-- 版权信息 -->
				<div class="copyright">
					<a-row justify="center" align="middle">
						<a-col>
							<a href="javascript:;">关于我们</a>
						</a-col>
						<a-divider type="vertical" style="height: 18px; border-color: gray" />
						<a-col>
							<a href="javascript:;">帮助中心</a>
						</a-col>
						<a-divider type="vertical" style="height: 18px; border-color: gray" />
						<a-col>
							<a href="javascript:;">售后服务</a>
						</a-col>
						<a-divider type="vertical" style="height: 18px; border-color: gray" />
						<a-col>
							<a href="javascript:;">配送与验收</a>
						</a-col>
						<a-divider type="vertical" style="height: 18px; border-color: gray" />
						<a-col>
							<a href="javascript:;">商务合作</a>
						</a-col>
						<a-divider type="vertical" style="height: 18px; border-color: gray" />
						<a-col>
							<a href="javascript:;">搜索推荐</a>
						</a-col>
						<a-divider type="vertical" style="height: 18px; border-color: gray" />
						<a-col>
							<a href="javascript:;">友情链接</a>
						</a-col>
					</a-row>
					<p>CopyRight © 小兔鲜儿</p>
				</div>
			</div>
		</div>
	</footer>
</template>

<script>
import { MessageOutlined, QuestionOutlined, WechatOutlined, WeiboOutlined } from '@ant-design/icons-vue'
const iconStyle = { fontSize: 35 + 'px', paddingTop: 10 + 'px', ':hover': { color: '#27BA9B' } }
export default {
	name: 'AppFooter',
	components: {
		MessageOutlined,
		QuestionOutlined,
		WechatOutlined,
		WeiboOutlined,
	},
	setup() {
		return {
			iconStyle,
		}
	},
}
</script>

<style scoped lang="less">
.app-footer {
	padding-top: 20px;
	.contact {
		height: 290px;
		padding: 60px 25px 40px;
		&:deep(small) {
			display: block;
			font-size: 14px;
			color: #999;
		}
		&:deep(.ant-row) {
			.ant-col {
				width: 196px;
				height: 190px;
				display: flex;
				align-items: center;
				justify-content: space-around;
				flex-flow: column nowrap;
				> span {
					font-size: 18px;
					color: #999;
				}
				.main {
					display: flex;
					height: 90px;
					.box {
						display: inline-block;
						width: 90px;
						height: 90px;
						text-align: center;
						border: 1px solid #ededed;
						small {
							line-height: 45px;
						}
						~ .box {
							margin-left: 5px;
						}
					}
					.content {
						display: flex;
						flex-flow: column nowrap;
						align-items: center;
						justify-content: flex-end;
					}
					&.service {
						flex-flow: column nowrap;
						align-items: center;
						justify-content: center;
						.phone {
							font-size: 22px;
						}
						small {
							font-size: 15px;
						}
					}
				}
			}
		}
	}
	.extra {
		background-color: #333;
		color: #fff;
		.slogan {
			height: 178px;
			padding: 60px 100px;
			border-bottom: 1px solid #434343;
			.ant-row {
				.ant-col {
					a {
						display: flex;
						align-items: center;
						justify-content: center;
						line-height: 58px;
						span {
							vertical-align: middle;
							font-size: 28px;
							color: #fff;
						}
						.i-icon {
							display: flex;
							align-items: center;
							justify-content: center;
							vertical-align: middle;
							width: 50px;
							height: 50px;
							border: 2px solid #fff;
							border-radius: 50%;
						}
					}
				}
			}
		}
		.copyright {
			height: 170px;
			padding-top: 40px;
			text-align: center;
			color: #999;
			font-size: 15px;
			.ant-col {
				a {
					color: #999;
					line-height: 1;
					padding: 0 10px;
					&:last-child {
						border-right: none;
					}
				}
			}
		}
	}
}
svg.footer-icon {
	border: 2px solid white;
	border-radius: 50%;
	fill: white;
}
</style>
