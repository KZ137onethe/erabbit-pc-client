<template>
	<LoginLayout class="login-callback">
		<template #headTitle> 联合登录 </template>
		<template #body>
			<div v-if="loading" class="loading container">
				<div class="loading-wrapper">
					<a-spin :indicator="indicator" />
					<span>加载中...</span>
				</div>
			</div>
			<a-tabs v-else class="tab-card container" v-model:activeKey="activeKey" centered>
				<a-tab-pane v-for="[key, value] of Object.entries(QQLoginTabs)" :key="key">
					<template #tab>
						<component :is="value.prevIcon" />
						{{ value.message }}
					</template>
					<div class="pane-content">
						<component :is="value.components" :unionId="unionId" />
					</div>
				</a-tab-pane>
			</a-tabs>
		</template>
	</LoginLayout>
</template>

<script>
import LoginLayout from '@/layout/login/Layout.vue'
import CallbackBind from './components/callback-bind'
import CallbackPatch from './components/callback-patch'

import { ref, reactive, h, onMounted } from 'vue'
import { useState, useMutations } from '@/hooks'
import { useRouter } from 'vue-router'
import { userApi } from '@/api'
import { NodeIndexOutlined, FormOutlined, LoadingOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import 'ant-design-vue/es/message/style/css'

const { _userQQLogin } = userApi
export default {
	setup() {
		const loading = ref(true)
		const indicator = h(LoadingOutlined, {
			style: {
				fontSize: '40px',
			},
			spin: true,
		})
		const QQLoginTabs = reactive({
			already: { message: '已有小兔鲜账号，请绑定手机', prevIcon: NodeIndexOutlined, components: CallbackBind },
			nothing: { message: '没有小兔鲜账号，请完善资料', prevIcon: FormOutlined, components: CallbackPatch },
		})
		const activeKey = ref(Object.keys(QQLoginTabs)[0])
		// QQ登录后账号的唯一标识
		const unionId = ref(null)
		// vuex的user仓库数据
		const storeUserMutations = useMutations('user', ['setUser'])
		const storeUserState = useState('user', ['redirectUrl'])
		// 渲染完后
		onMounted(() => {
			const router = useRouter()
			// 检查qq是否登录 => 获取唯一标识 => QQ登录
			if (QC.Login.check()) {
				QC.Login.getMe((openId) => {
					unionId.value = openId
					_userQQLogin({ unionId: openId })
						.then((data) => {
							// 存用户数据 => 重定向 => 登录提示
							const userData = data.result
							const redirectUrl = storeUserState.redirectUrl.value
							storeUserMutations.setUser(userData)
							router.push(redirectUrl)
							message.success('登录成功')
						})
						.catch((e) => {
							//  去除loading效果,进入tab页面 => 未绑定提示
							loading.value = false
							message.info(e.response.data.message)
						})
				})
			}
		})
		return {
			indicator,
			loading,
			QQLoginTabs,
			activeKey,
		}
	},
	components: {
		LoginLayout,
		NodeIndexOutlined,
		FormOutlined,
		LoadingOutlined,
		CallbackBind,
		CallbackPatch,
	},
}
</script>

<style lang="less" scoped>
.container {
	height: 70vh;
	background-color: white;
	&.loading {
		margin: 20px auto;
		position: relative;
		.loading-wrapper {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			.ant-spin {
				display: block;
				padding: 10px;
			}
			> span {
				display: block;
				text-align: center;
			}
		}
	}
	&.tab-card {
		margin: 20px auto;

		.pane-content {
			width: 500px;
			margin: 0 auto;
		}
	}
}
</style>
