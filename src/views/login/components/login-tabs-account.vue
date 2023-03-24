<template>
	<div class="login-tabs-account">
		<!--登录方式-->
		<div class="login-mode">
			<a-tag color="default" @click="modeToggle">
				<template v-for="[key, value] in Object.entries(accountMode)" :key="key">
					<template v-if="value.status">
						<component :is="value.icon" /> <span>{{ value.message }}</span>
					</template>
				</template>
			</a-tag>
		</div>
		<a-form
			v-bind="layout"
			:model="formState"
			:rules="ruleSchema"
			ref="formRef"
			name="normal_login"
			class="login-form"
			@finish="onFinish"
			@finishFailed="onFinishFailed"
		>
			<!--账号 或者 手机号-->
			<a-form-item has-feedback v-if="accountMode.account.status" class="submit-data" name="account">
				<a-input v-model:value="formState.account" autocomplete="off">
					<template #prefix>
						<UserOutlined class="site-form-item-icon" />
					</template>
				</a-input>
			</a-form-item>
			<a-form-item has-feedback v-if="accountMode.SMS.status" class="submit-data" name="phone">
				<a-input v-model:value="formState.phone" autocomplete="off">
					<template #prefix>
						<PhoneOutlined class="site-form-item-icon" />
					</template>
				</a-input>
			</a-form-item>
			<!--密码 或者 验证码-->
			<a-form-item v-if="accountMode.account.status" name="password" class="submit-data">
				<a-input-password v-model:value="formState.password" autocomplete="off">
					<template #prefix>
						<LockOutlined class="site-form-item-icon" />
					</template>
				</a-input-password>
			</a-form-item>
			<a-form-item v-if="accountMode.SMS.status" name="verificationCode" class="submit-data">
				<a-input v-model:value="formState.verificationCode" autocomplete="off">
					<template #prefix>
						<SafetyOutlined class="site-form-item-icon" />
					</template>
					<template #suffix>
						<a-button :disabled="timer > 0" type="primary" @click="sendVerificationCode()">
							{{ timer <= 0 ? '发送验证码' : `${timer}秒` }}
						</a-button>
					</template>
				</a-input>
			</a-form-item>
			<!--网站条款-->
			<a-form-item class="term" style="margin-bottom: 5px">
				<a-form-item name="remember" no-style>
					<a-checkbox v-model:checked="formState.termReading" />
					我已同意
					<router-link to="/" class="term">《隐私条款》</router-link>
					和
					<router-link to="/" class="term">《服务条款》</router-link>
				</a-form-item>
			</a-form-item>
			<!--登录按钮-->
			<a-form-item style="margin-bottom: 5px">
				<a-button size="large" :block="true" :disabled="disabled" type="primary" html-type="submit" class="login-form-button"> 登录 </a-button>
			</a-form-item>
		</a-form>
		<!--其他-->
		<a-row type="flex" justify="space-between" class="other">
			<a-col class="mode-QQ">
				<a :href="QQ_sdk_callback_url">
					<img :src="imageQQURL" alt="" />
				</a>
			</a-col>
			<a-col class="login-front">
				<router-link to="/">忘记密码</router-link>
				<a-divider type="vertical" />
				<router-link to="/register">免费注册</router-link>
			</a-col>
		</a-row>
	</div>
</template>

<script>
import { UserOutlined, PhoneOutlined, MailOutlined, LockOutlined, SafetyOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import 'ant-design-vue/es/message/style/css'
import { ref, reactive, computed } from 'vue'

import { validateAccount, validatePhone, schemaPhone, validatePassword, validateVerificationCode } from './schema-rule/login-account-validate.js'
import { _userAccountLogin, _userGetVerificationCode, _userSMSLogin } from '@/api'
import { useMutations } from '@/hooks'
import { useRoute, useRouter } from 'vue-router'
import { useIntervalFn } from '@vueuse/core'

const imageQQURL = 'https://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_7.png'
const QQ_sdk_callback_url =
	'https://graph.qq.com/oauth2.0/authorize?client_id=100556005&response_type=token&scope=all&redirect_uri=http%3A%2F%2Fwww.corho.com%3A8080%2F%23%2Flogin%2Fcallback'
export default {
	name: 'login-tabs-account',
	setup() {
		const formRef = ref(null)
		const accountMode = reactive({
			account: { status: true, message: '使用密码登录', icon: UserOutlined, useMode: { name: 'account', uniqueKey: 'password' } },
			SMS: { status: false, message: '使用短信登录', icon: MailOutlined, useMode: { name: 'phone', uniqueKey: 'verificationCode' } },
		})
		// 当前的登录模式
		const currentLoginMode = computed(() => {
			const mode = ref(null)
			for (const [key, value] of Object.entries(accountMode)) {
				if (value.status === true) {
					mode.value = accountMode[key]
					break
				}
			}
			return mode.value
		})
		const formState = reactive({
			account: 'zhousg',
			password: '123456',
			phone: '13241051259',
			verificationCode: '',
			termReading: false,
		})
		// 登录方式切换
		const modeToggle = () => {
			// 修改 accountMode
			const objArr = ref(Object.keys(accountMode))
			for (const key of objArr.value) {
				if (accountMode[key].status) {
					const index = objArr.value.indexOf(key)
					const posKey = objArr.value[(index + 1) % objArr.value.length]
					// 交换
					;[accountMode[key].status, accountMode[posKey].status] = [accountMode[posKey].status, accountMode[key].status]
					break
				}
			}
			// 修改 formState
			for (const [key, value] of Object.entries(formState)) {
				// 如果类型是布尔值对象则跳过
				if (typeof value === 'boolean') {
					continue
				} else {
					formState[key] = ''
				}
			}
			// 重置表单
			resetForm()
		}

		// 表单校验规则
		const ruleSchema = {
			account: [
				{
					required: true,
					validator: validateAccount,
					trigger: 'change',
				},
			],
			phone: [
				{
					required: true,
					validator: validatePhone,
					trigger: 'change',
				},
			],
			password: [
				{
					require: true,
					validator: validatePassword,
					trigger: 'change',
				},
			],
			verificationCode: [
				{
					required: true,
					validator: validateVerificationCode,
					trigger: 'change',
				},
			],
		}
		// 表单布局
		const layout = {
			labelCol: {
				span: 0,
			},
			wrapperCol: {
				span: 22,
			},
		}

		const router = useRouter()
		const route = useRoute()
		// 冷却计时
		const timer = ref(0)
		// 用于验证码冷却计时函数
		const { pause, resume } = useIntervalFn(
			() => {
				timer.value--
				if (timer.value <= 0) {
					pause()
				}
			},
			1000,
			false
		)
		// 发送验证码
		const sendVerificationCode = async () => {
			// 校验手机号
			const phone = parseInt(formState.phone)
			const valid = schemaPhone(phone)
			if (valid) {
				try {
					await _userGetVerificationCode({ phone: phone })
					message.success('短信发送成功！')
					timer.value = 60
				} catch (e) {
					message.error(e.response.data.message)
					timer.value = 3
				} finally {
					resume()
				}
			} else {
				// 手机校验失败，提示用户
				message.error('手机号格式不对，发送失败！')
			}
		}
		const userMutations = useMutations('user', ['setUser'])
		// 表单检验成功的回调
		const onFinish = (values) => {
			// message.success('登录成功!')
			// ? 账号密码登录
			if (currentLoginMode.value.useMode === accountMode.account.useMode) {
				const { account, password } = values
				_userAccountLogin({ account, password })
					.then((res) => {
						console.log(res)
						const userData = { ...res.result }
						/** 登录流程
						 * 1. 将 userData 数据存入 Vuex
						 * 2. 反馈给用户 ”登陆成功“
						 * 3、登录跳转（重定向）到首页
						 */
						userMutations.setUser(userData)
						message.success('登录成功')
						router.push(route.query.redirectUrl ?? '/')
					})
					.catch((e) => {
						console.log(e)
						message.error(e.response.data.message)
					})
			}
			// ? 短信验证码登录
			else if (currentLoginMode.value.useMode === accountMode.SMS.useMode) {
				const { phone, verificationCode } = values
				_userSMSLogin({ phone, verificationCode })
					.then((res) => {
						const userData = { ...res.result }
						userMutations.setUser(userData)
						message.success('登录成功')
						router.push(route.query.redirectUrl ?? '/')
					})
					.catch((e) => {
						console.log(e)
						message.error('登录失败')
					})
			}
		}
		// 表单检验失败的回调
		const onFinishFailed = (errorInfo) => {
			message.error('表单验证失败')
			// console.log('Failed:', errorInfo)
		}
		// 重置表单
		const resetForm = () => {
			formRef.value.resetFields()
		}
		const disabled = computed(() => {
			for (let value of Object.values(currentLoginMode.value.useMode)) {
				const key = value
				if (Boolean(formState[key]) === false) {
					return true
				}
			}
			return false
		})

		return {
			imageQQURL,
			QQ_sdk_callback_url,
			accountMode,
			currentLoginMode,
			modeToggle,
			formState,
			ruleSchema,
			layout,
			timer,
			sendVerificationCode,
			onFinish,
			onFinishFailed,
			disabled,
		}
	},
	components: { UserOutlined, PhoneOutlined, MailOutlined, LockOutlined, SafetyOutlined },
}
</script>

<style scoped lang="less">
.login-tabs-account {
	padding: 10px 0;
	text-align: center;

	.login-mode {
		display: flex;
		justify-content: flex-end;
		margin-bottom: 10px;

		> .ant-tag {
			display: inline-block;
			height: 25px;
			.hoverLink(blue);

			> span.anticon {
				line-height: 25px;
				margin-right: 5px;
			}
		}
	}

	> form {
		.ant-form-item {
			display: flex;
			flex-flow: row nowrap;
			justify-content: center;
			width: 100%;

			&.submit-data {
				.ant-form-item-control {
					// 表单大小
					span.ant-input-affix-wrapper {
						height: 45px;
					}
				}
			}

			// 网站条款
			&.term {
				a {
					color: @xtxColor;
				}
			}
		}
	}

	.other {
		margin-top: 20px;
	}
}
</style>
