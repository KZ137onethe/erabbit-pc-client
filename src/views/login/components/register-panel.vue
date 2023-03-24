<template>
	<div class="register-panel container">
		<div class="page-content">
			<a-divider class="register-header">账号注册</a-divider>
			<!-- 表单 -->
			<a-form
				class="callback-bind-form"
				ref="callbackForm"
				:rules="registerRule"
				:model="formState"
				@finish="handleFinish"
				@finishFailed="handleFinishFailed"
			>
				<a-form-item name="account">
					<a-input v-model:value="formState.account" placeholder="请输入用户名">
						<template #prefix><UserOutlined /></template>
					</a-input>
				</a-form-item>
				<a-form-item name="phone">
					<a-input v-model:value="formState.phone" placeholder="请输入手机号">
						<template #prefix><MobileOutlined /></template>
					</a-input>
				</a-form-item>
				<a-form-item name="verificationCode" class="bind-data">
					<a-input v-model:value="formState.verificationCode" placeholder="短信验证码">
						<template #prefix>
							<SafetyOutlined />
						</template>
						<template #suffix>
							<a-button :disabled="timer > 0" type="link" @click="sendVerificationCode()">{{ timer <= 0 ? '发送验证码' : `${timer}秒` }}</a-button>
						</template>
					</a-input>
				</a-form-item>
				<a-form-item name="password">
					<a-input v-model:value="formState.password" type="password" placeholder="请输入密码">
						<template #prefix><LockOutlined /></template>
					</a-input>
				</a-form-item>
				<a-form-item name="confirmPassword">
					<a-input v-model:value="formState.confirmPassword" type="password" placeholder="请再次确认密码">
						<template #prefix><LockOutlined /></template>
					</a-input>
				</a-form-item>
				<a-form-item>
					<a-button type="primary" size="large" html-type="submit" :disabled="buttonCheck">立即注册</a-button>
				</a-form-item>
			</a-form>
		</div>
	</div>
</template>

<script>
import { UserOutlined, MobileOutlined, SafetyOutlined, LockOutlined } from '@ant-design/icons-vue'

import { ref, reactive, computed } from 'vue'
import { validateAccount, validatePhone, validateVerificationCode, validatePassword, schemaPhone } from './schema-rule/register-validate.js'
import { useIntervalFn } from '@vueuse/core'
import { _userPCRegisterVerificationCode, _userPCRegister } from '@/api'
import { message } from 'ant-design-vue'
import 'ant-design-vue/es/message/style/css'
import { useState } from '@/hooks'
import { useRouter } from 'vue-router'
export default {
	setup() {
		const router = useRouter()
		const formState = reactive({
			account: '',
			phone: '',
			verificationCode: '',
			password: '',
			confirmPassword: '',
		})
		// 绑定规则
		const registerRule = {
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
			verificationCode: [
				{
					required: true,
					validator: validateVerificationCode,
					trigger: 'change',
				},
			],
			password: [
				{
					required: true,
					validator: validatePassword,
					trigger: 'change',
				},
			],
			// TODO:这个需要写的更严谨一些
			confirmPassword: [
				{
					required: true,
					validator: (rule, value) => {
						return new Promise((resolve, reject) => {
							if (value !== formState.password) {
								reject('与输入密码不符！')
							} else {
								resolve()
							}
						})
					},
					trigger: 'change',
				},
			],
		}
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
					await _userPCRegisterVerificationCode(phone)
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
		// 绑定框状态
		const buttonCheck = computed(() => {
			for (let value of Object.values(formState)) {
				if (Boolean(value) === false) return true
			}
			return false
		})
		const userState = useState('user', ['redirectUrl'])
		const handleFinish = (values) => {
			const { account, phone, verificationCode, password } = values
			// 注册成功提示 => 重定向
			_userPCRegister({ account, phone, verificationCode, password })
				.then(() => {
					message.success('注册成功')
					setTimeout(() => {
						const redirectUrl = userState.redirectUrl.value
						router.push(redirectUrl)
					}, 1000)
				})
				.catch((e) => {
					message.error(e.response.data.message)
				})
		}
		const handleFinishFailed = (errors) => {
			console.log(errors)
		}
		return {
			formState,
			registerRule,
			buttonCheck,
			timer,
			sendVerificationCode,
			handleFinish,
			handleFinishFailed,
		}
	},
	components: {
		UserOutlined,
		MobileOutlined,
		SafetyOutlined,
		LockOutlined,
	},
}
</script>

<style lang="less" scoped>
@iconColor: rgba(0, 0, 0, 0.25);
.container {
	height: 70vh;
	background-color: white;
	&.register-panel {
		margin: 20px auto;
		box-sizing: border-box;
	}
	.page-content {
		height: 100%;
		width: 250px;
		margin: 0 auto;
		// 头部
		.ant-divider.register-header {
			font-size: 20px;
			color: @helpColor;
			margin-bottom: 10px;
		}
		// 表单
		form.ant-form {
			margin-top: 20px;
			display: inline;
			height: 400px;
			.ant-form-item {
				margin: 0 auto;
				text-align: center;
				height: 66px;
				width: 250px;
				.ant-form-item-control {
					// 表单大小
					span.ant-input-affix-wrapper {
						height: 45px;
						.ant-input-prefix {
							> span {
								color: @iconColor;
							}
						}
					}
				}
			}
		}
	}
}
</style>
