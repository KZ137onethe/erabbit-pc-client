<template>
  <div class="callback-patch">
    <!-- 表单 -->
    <a-form
      :model="formState"
      :rules="patchRule"
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
      <a-form-item name="verificationCode">
        <a-input v-model:value="formState.verificationCode" placeholder="请输入验证码">
          <template #prefix><safety-outlined /></template>
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
          立即提交
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { UserOutlined, MobileOutlined, SafetyOutlined, LockOutlined } from "@ant-design/icons-vue"
import { message } from "ant-design-vue"
import "ant-design-vue/es/message/style/css"

import { reactive, computed } from "vue"
import { useRouter } from "vue-router"
import userApi from "@/api/user"
import { checkButton, SendBtn } from "./form"
import { PatchRules } from "./schema-rule/callback-patch-validate"
import { useState, useMutations, useActions } from "@/hooks"

export default {
  components: {
    UserOutlined,
    MobileOutlined,
    SafetyOutlined,
    LockOutlined,
    SendBtn,
  },
  props: {
    unionId: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const formState = reactive({
      account: "",
      phone: "",
      verificationCode: "",
      password: "",
      confirmPassword: "",
    })
    // 绑定规则
    const patchRule = computed(() => PatchRules(formState.password))
    // SendBtn
    const validate = (data) => {
      const phone = parseInt(data, 10)
      return /^1[3-9]\d{9}$/.test(phone)
    }
    const sendCode = (phone) => userApi._userPCRegisterVerificationCode(phone)
    // 绑定框状态
    const buttonCheck = computed(() => checkButton(formState))
    const { unionId } = reactive(props)
    const router = useRouter()
    const storeState = useState(["web_home_page_router"])
    const storeUserMutations = useMutations("user", ["setUser"])
    const storeCartActions = useActions("cart", ["mergeLocalCart", "getCartList"])
    const handleFinish = (values) => {
      const { account, phone, verificationCode, password } = values
      userApi
        ._userQQPatchAccount(unionId, { account, phone, verificationCode, password })
        .then((res) => {
          // 存用户数据 => 重定向 => 登录提示
          const userData = res.result
          const redirectUrl = storeState.web_home_page_router.value
          storeUserMutations.setUser(userData)
          storeCartActions.mergeLocalCart().then(() => {
            router.push(redirectUrl)
            message.success("登录成功")
          })
          storeCartActions.getCartList()
        })
        .catch((e) => {
          message.error(e.response.data.message)
        })
    }
    const handleFinishFailed = (errors) => {
      message.error("表单校验失败!")
      console.log("error: ", errors)
    }
    return {
      formState,
      patchRule,
      validate,
      sendCode,
      buttonCheck,
      handleFinish,
      handleFinishFailed,
    }
  },
}
</script>

<style lang="less" scoped>
@iconColor: rgba(0, 0, 0, 0.25);
.callback-patch {
  margin-top: 20px;
  // form 表单
  form.ant-form {
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
</style>
