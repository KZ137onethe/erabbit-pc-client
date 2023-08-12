<template>
  <div class="register-panel container">
    <div class="page-content">
      <a-divider class="register-header">账号注册</a-divider>
      <!-- 表单 -->
      <a-form
        ref="callbackForm"
        v-model:rules="registerRule"
        class="callback-bind-form"
        :model="formState"
        @finish="handleFinish"
        @finishFailed="handleFinishFailed"
      >
        <a-form-item name="account">
          <a-input v-model:value="formState.account" placeholder="请输入用户名">
            <template #prefix><user-outlined /></template>
          </a-input>
        </a-form-item>
        <a-form-item name="phone">
          <a-input v-model:value="formState.phone" placeholder="请输入手机号">
            <template #prefix><mobile-outlined /></template>
          </a-input>
        </a-form-item>
        <a-form-item name="verificationCode" class="bind-data">
          <a-input v-model:value="formState.verificationCode" placeholder="短信验证码">
            <template #prefix>
              <safety-outlined />
            </template>
            <template #suffix>
              <send-btn
                v-model:data="formState.phone"
                :data-rule="validate"
                :authentication-fn="sendCode"
              />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item name="password">
          <a-input v-model:value="formState.password" type="password" placeholder="请输入密码">
            <template #prefix><lock-outlined /></template>
          </a-input>
        </a-form-item>
        <a-form-item name="confirmPassword">
          <a-input
            v-model:value="formState.confirmPassword"
            type="password"
            placeholder="请再次确认密码"
          >
            <template #prefix><lock-outlined /></template>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" size="large" html-type="submit" :disabled="buttonCheck">
            立即注册
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
import { UserOutlined, MobileOutlined, SafetyOutlined, LockOutlined } from "@ant-design/icons-vue"
import { message } from "ant-design-vue"
import "ant-design-vue/es/message/style/css"

import { reactive, computed } from "vue"
import { useRouter } from "vue-router"
import { ValidateRule } from "./schema-rule/register-validate.js"
import { userApi } from "@/api"
import { checkButton, SendBtn } from "./form.jsx"
import { useState } from "@/hooks"

const { _userPCRegisterVerificationCode, _userPCRegister } = userApi
export default {
  components: {
    UserOutlined,
    MobileOutlined,
    SafetyOutlined,
    LockOutlined,
    SendBtn,
  },
  setup() {
    const router = useRouter()
    const userState = useState("user", ["redirectUrl"])
    const formState = reactive({
      account: "",
      phone: "",
      verificationCode: "",
      password: "",
      confirmPassword: "",
    })

    // 表单校验规则
    const registerRule = computed(() => ValidateRule(formState.password))
    // SendBtn
    const validate = (data) => {
      const phone = parseInt(data, 10)
      return /^1[3-9]\d{9}$/.test(phone)
    }
    const sendCode = (phone) => _userPCRegisterVerificationCode(phone)
    // 绑定框状态
    const buttonCheck = computed(() => checkButton(formState))
    // 表单校验成功的点击回调
    const handleFinish = (values) => {
      const { account, phone, verificationCode, password } = values
      // 注册成功提示 => 重定向
      _userPCRegister({ account, phone, verificationCode, password })
        .then(() => {
          message.success("注册成功")
          setTimeout(() => {
            const redirectUrl = userState.redirectUrl.value
            router.push(redirectUrl)
          }, 1000)
        })
        .catch((e) => {
          message.error(e.response.data.message)
        })
    }
    // 表单校验失败的点击回调
    const handleFinishFailed = (_errors) => {
      message.error("表单校验失败！")
    }
    return {
      formState,
      buttonCheck,
      validate,
      registerRule,
      sendCode,
      handleFinish,
      handleFinishFailed,
    }
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
