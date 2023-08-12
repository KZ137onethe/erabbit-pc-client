<template>
  <div class="login-tabs-account">
    <!--登录方式-->
    <div class="login-mode">
      <a-tag color="default" @click="modeToggle">
        <template v-for="[key, value] in Object.entries(accountMode)" :key="key">
          <template v-if="value.status">
            <component :is="value.icon" />
            <span>{{ value.message }}</span>
          </template>
        </template>
      </a-tag>
    </div>
    <a-form
      v-bind="layout"
      :model="formState"
      :rules="loginRule"
      name="normal_login"
      class="login-form"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <!--账号 或者 手机号-->
      <a-form-item
        v-if="accountMode.account.status"
        has-feedback
        class="submit-data"
        name="account"
      >
        <a-input v-model:value="formState.account" autocomplete="off">
          <template #prefix>
            <user-outlined class="site-form-item-icon" />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item v-if="accountMode.SMS.status" has-feedback class="submit-data" name="phone">
        <a-input v-model:value="formState.phone" autocomplete="off">
          <template #prefix>
            <phone-outlined class="site-form-item-icon" />
          </template>
        </a-input>
      </a-form-item>
      <!--密码 或者 验证码-->
      <a-form-item v-if="accountMode.account.status" name="password" class="submit-data">
        <a-input-password v-model:value="formState.password" autocomplete="off">
          <template #prefix>
            <lock-outlined class="site-form-item-icon" />
          </template>
        </a-input-password>
      </a-form-item>
      <a-form-item v-if="accountMode.SMS.status" name="verificationCode" class="submit-data">
        <a-input v-model:value="formState.verificationCode" autocomplete="off">
          <template #prefix>
            <safety-outlined class="site-form-item-icon" />
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
      <!--网站条款-->
      <a-form-item class="term" style="margin-bottom: 5px">
        <a-form-item name="remember" no-style>
          <a-checkbox v-model:checked="formState.termReading" />
          我已同意
          <router-link to="/login" class="term">《隐私条款》</router-link>
          和
          <router-link to="/login" class="term">《服务条款》</router-link>
        </a-form-item>
      </a-form-item>
      <!--登录按钮-->
      <a-form-item style="margin-bottom: 5px">
        <a-button
          size="large"
          :block="true"
          :disabled="disabled"
          type="primary"
          html-type="submit"
          class="login-form-button"
        >
          登录
        </a-button>
      </a-form-item>
    </a-form>
    <!--其他-->
    <a-row type="flex" justify="space-between" class="other">
      <a-col class="mode-QQ">
        <a :href="QQSdkCallbackUrl">
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
import {
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  LockOutlined,
  SafetyOutlined,
} from "@ant-design/icons-vue"
import { message } from "ant-design-vue"
import "ant-design-vue/es/message/style/css"
import { ref, reactive, computed } from "vue"

import { useRouter } from "vue-router"
import { LoginRules } from "./schema-rule/login-account-validate.js"
import { userApi } from "@/api"
import { useState, useMutations, useActions } from "@/hooks"
import { SendBtn } from "./form"

const { _userAccountLogin, _userGetVerificationCode, _userSMSLogin } = userApi
const imageQQURL = "https://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_7.png"
const QQSdkCallbackUrl =
  "https://graph.qq.com/oauth2.0/authorize?client_id=100556005&response_type=token&scope=all&redirect_uri=http%3A%2F%2Fwww.corho.com%3A8080%2F%23%2Flogin%2Fcallback"
export default {
  name: "LoginTabsAccount",
  components: { UserOutlined, PhoneOutlined, MailOutlined, LockOutlined, SafetyOutlined, SendBtn },
  setup() {
    const accountMode = reactive({
      account: {
        status: true,
        message: "使用密码登录",
        icon: UserOutlined,
        useMode: { name: "account", uniqueKey: "password" },
      },
      SMS: {
        status: false,
        message: "使用短信登录",
        icon: MailOutlined,
        useMode: { name: "phone", uniqueKey: "verificationCode" },
      },
    })
    const formState = reactive({
      account: "",
      password: "",
      phone: "",
      verificationCode: "",
      termReading: false,
    })
    // 表单布局
    const layout = {
      labelCol: {
        span: 0,
      },
      wrapperCol: {
        span: 22,
      },
    }
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

    // 登录方式切换
    const modeToggle = () => {
      // 修改 accountMode
      const objArr = ref(Object.keys(accountMode))
      for (const key of objArr.value) {
        if (accountMode[key].status) {
          const index = objArr.value.indexOf(key)
          const posKey = objArr.value[(index + 1) % objArr.value.length]
          // 交换
          ;[accountMode[key].status, accountMode[posKey].status] = [
            accountMode[posKey].status,
            accountMode[key].status,
          ]
          break
        }
      }
      // 修改 formState
      for (const [key, value] of Object.entries(formState)) {
        // 如果类型是布尔值对象则跳过
        if (typeof value === "boolean") {
          continue
        } else {
          formState[key] = ""
        }
      }
    }

    // 表单校验规则
    const loginRule = computed(() => LoginRules())

    // SendBtn
    const validate = (data) => {
      const phone = parseInt(data, 10)
      return /^1[3-9]\d{9}$/.test(phone)
    }
    const sendCode = (phone) => _userGetVerificationCode(phone)

    // 表单检验成功的回调
    const router = useRouter()
    const storeState = useState(["web_home_page_router"])
    const redirectUrl = storeState.web_home_page_router.value
    const storeUserMutations = useMutations("user", ["setUser"])
    const storeCartActions = useActions("cart", ["mergeLocalCart", "getCartList"])
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
            storeUserMutations.setUser(userData)
            storeCartActions.mergeLocalCart().then(() => {
              message.success("登录成功")
              router.push(redirectUrl)
            })
            storeCartActions.getCartList()
          })
          .catch((e) => {
            message.error(e.response.data.message)
          })
      }
      // ? 短信验证码登录
      else if (currentLoginMode.value.useMode === accountMode.SMS.useMode) {
        const { phone, verificationCode } = values
        _userSMSLogin({ phone, verificationCode })
          .then(async (res) => {
            const userData = { ...res.result }
            storeUserMutations.setUser(userData)
            storeCartActions.mergeLocalCart().then(() => {
              message.success("登录成功")
              router.push(redirectUrl)
            })
            storeCartActions.getCartList()
          })
          .catch((_errors) => {
            message.error("登录失败")
          })
      }
    }
    // 表单检验失败的回调
    const onFinishFailed = (_errors) => {
      message.error("表单验证失败")
      // console.log('Failed:', _errors)
    }

    const disabled = computed(() => {
      for (const value of Object.values(currentLoginMode.value.useMode)) {
        const key = value
        if (Boolean(formState[key]) === false) {
          return true
        }
      }
      return false
    })

    return {
      imageQQURL,
      QQSdkCallbackUrl,
      accountMode,
      currentLoginMode,
      modeToggle,
      formState,
      loginRule,
      layout,
      validate,
      sendCode,
      onFinish,
      onFinishFailed,
      disabled,
    }
  },
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
