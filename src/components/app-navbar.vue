<template>
	<nav class="app-topnav">
		<div class="container">
			<a-row justify="end" align="middle">
				<a-col :flex="30"></a-col>
				<template v-if="profile.token">
					<a-col :flex="2">
						<a-avatar>
							<template #icon>
								<UserOutlined />
							</template>
						</a-avatar>
						&emsp;
						<a href="javascript:;">{{ profile.account }}</a>
					</a-col>
					<a-col :flex="2"><a @click="logout" href="javascript:;">退出登录</a></a-col>
				</template>
				<template v-else>
					<a-col :flex="2">
						<router-link to="/login">请先登录</router-link>
					</a-col>
					<a-col :flex="2"><a href="javascript:;">免费注册</a></a-col>
				</template>
				<a-col :flex="2"><a href="javascript:;">我的订单</a></a-col>
				<a-col :flex="2"><a href="javascript:;">会员中心</a></a-col>
				<a-col :flex="2"><a href="javascript:;">帮助中心</a></a-col>
				<a-col :flex="2"><a href="javascript:;">关于我们</a></a-col>
				<a-col :flex="2">
					<MobileTwoTone style="fontsize: 20px" />
					&nbsp;
					<a href="javascript:;">手机版</a>
				</a-col>
			</a-row>
		</div>
	</nav>
</template>

<script>
import { UserOutlined, MobileTwoTone } from '@ant-design/icons-vue'

import { useState } from '@/hooks'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
export default {
	components: {
		UserOutlined,
		MobileTwoTone,
	},
	setup() {
		const storeUserState = useState('user', {
		    profile: (state) => state.profile,
		})
		const store = useStore()
    const router = useRouter()
		const logout = () => {
			store.commit('user/setUser', {})
      router.push('/login')
		}
		return {
			...storeUserState,
      logout
		}
	},
}
</script>

<style lang="less" scoped>
.app-topnav {
	background: #333;
	.container {
		height: 53px;
		.ant-row {
			height: 100%;
			.ant-col {
				display: flex;
				justify-content: center;
				align-items: center;
				vertical-align: middle;
				a {
					display: inline-block;
					text-align: center;
					color: #cdcdcd;
					&:hover {
						color: @xtxColor;
					}
				}
				~ .ant-col {
					border-right: 2px solid #666;
					// a {
					// border-right: 2px solid #666;
					// }
				}
			}
		}
	}
}
</style>
