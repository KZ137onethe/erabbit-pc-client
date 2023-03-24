<template>
	<div class="callback-bind">
		<!-- 用户提醒 -->
		<div class="remind">
			<img :src="QQUserInfo.avatar" alt="" />
			<span>{{ promptMSG }}</span>
		</div>
		<!-- 表单 -->
		<a-form
			class="callback-bind-form"
			ref="callbackForm"
			:rules="bindRule"
			:model="formState"
			@finish="handleFinish"
			@finishFailed="handleFinishFailed"
		>
			<a-form-item name="phone" class="bind-data">
				<a-input v-model:value="formState.phone" placeholder="绑定的手机号">
					<template #prefix>
						<MobileOutlined />
					</template>
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
			<a-form-item>
				<a-button type="primary" size="large" html-type="submit" :disabled="buttonCheck">立即绑定</a-button>
			</a-form-item>
		</a-form>
	</div>
</template>

<script>
import { MobileOutlined, SafetyOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import 'ant-design-vue/es/message/style/css'

import { ref, reactive, computed, onMounted } from 'vue'
import { validatePhone, validateVerificationCode, schemaPhone } from './schema-rule/callback-bind-validate.js'
import { useIntervalFn } from '@vueuse/core'
import { _userQQBindGetVerificationCode, _userQQBindPhone } from '@/api'
import { useState, useMutations } from '@/hooks'
import { useRouter } from 'vue-router'

export default {
	components: {
		MobileOutlined,
		SafetyOutlined,
	},
	props: {
		unionId: {
			type: String,
			required: true,
		},
	},
	setup(props) {
		// 表单
		const callbackForm = ref(null)
		const formState = reactive({
			phone: '',
			verificationCode: '',
		})

		// QQ用户
		const QQUserInfo = reactive({
			nickname: '',
			avatar: '',
		})
		const promptMSG = computed(() => `Hi，${QQUserInfo.nickname} 欢迎来小兔鲜，完成绑定后可以QQ账号一键登录哦~`)
		const unionId = props.unionId

		// 绑定规则
		const bindRule = {
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
					await _userQQBindGetVerificationCode(phone)
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
		const router = useRouter()
		const storeState = useState(['web_home_page_router'])
		const storeUserMutations = useMutations('user', ['setUser'])
		const handleFinish = (values) => {
			const { phone, verificationCode } = values
			console.log(phone, verificationCode)
			_userQQBindPhone({ unionId, mobile: phone, verificationCode })
				.then((res) => {
					// 存用户数据 => 重定向 => 登录提示
					const userData = res.result
					const redirectUrl = storeState.web_home_page_router.value
					storeUserMutations.setUser(userData)
					router.push(redirectUrl)
					message.success('登录成功')
				})
				.catch((e) => {
					message.error(e.response.data.message)
				})
		}
		const handleFinishFailed = (errors) => {
			message.error('表单校验失败！')
		}
		onMounted(() => {
			if (QC.Login.check()) {
				QC.api('get_user_info').success((res) => {
					const data = res.data
					QQUserInfo.nickname = data.nickname
					QQUserInfo.avatar = data.figureurl_qq
				})
			}
		})
		return {
			formState,
			QQUserInfo,
			promptMSG,
			bindRule,
			timer,
			sendVerificationCode,
			buttonCheck,
			handleFinish,
			handleFinishFailed,
		}
	},
}
</script>

<style lang="less" scoped>
@iconColor: rgba(0, 0, 0, 0.25);
.callback-bind {
	// 用户提醒盒子
	.remind {
		display: flex;
		flex-flow: row nowrap;
		width: 250px;
		height: 50px;
		margin: 20px auto;
		padding: 3px 5px;
		background-color: #eee;
		border-radius: 2px;
		align-items: center;
		> span {
			padding-left: 5px;
			.ellipsis-n(2);
		}
	}
	// form 表单
	form.ant-form {
		display: inline;
		height: 300px;
		.ant-form-item {
			margin: 0 auto;
			text-align: center;
			height: 66px;
			width: 250px;
			&.bind-data {
				.ant-form-item-control {
					width: 100%;
					// 表单大小
					span.ant-input-affix-wrapper {
						height: 45px;
						.ant-input-prefix {
							> span {
								color: @iconColor;
							}
						}
					}
					// 提交按钮
					button.xtx-button {
						height: 40px;
						width: 150px;
					}
				}
			}
		}
	}
}
</style>
