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
    <a-form v-bind="layout" :model="formState" :rules="ruleSchema" ref="formRef" name="normal_login" class="login-form"
      @finish="onFinish" @finishFailed="onFinishFailed">
      <!--用户名-->
      <a-form-item has-feedback class="submit-data" name="username">
        <a-input v-model:value="formState.username" autocomplete="off">
          <template #prefix>
            <UserOutlined class="site-form-item-icon" />
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
            <a-button type="primary">发送验证码</a-button>
          </template>
        </a-input>
      </a-form-item>
      <!--网站条款-->
      <a-form-item class="term" style="margin-bottom: 5px;">
        <a-form-item name="remember" no-style>
          <a-checkbox v-model:checked="formState.termReading" />
          我已同意
          <router-link to="/" class="term">《隐私条款》</router-link>
          和
          <router-link to="/" class="term">《服务条款》</router-link>
        </a-form-item>
      </a-form-item>
      <!--登录按钮-->
      <a-form-item style="margin-bottom: 5px;">
        <a-button size="large" :block="true" :disabled="!disabled" type="primary" html-type="submit"
          class="login-form-button">
          登录
        </a-button>
      </a-form-item>
    </a-form>
    <!--其他-->
    <a-row type="flex" justify="space-between" class="other">
      <a-col class="mode-QQ">
        <router-link to="/">
          <img :src="imageQQURL" alt="">
        </router-link>
      </a-col>
      <a-col class="login-front">
        <router-link to="/">忘记密码</router-link>
        <a-divider type="vertical" />
        <router-link to="/">免费注册</router-link>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { UserOutlined, MailOutlined, LockOutlined, SafetyOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import { ref, reactive, computed } from 'vue'

import { validateUsername, validatePassword, validateVerificationCode } from './login-account-validate.js'

const imageQQURL = 'https://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_7.png'
export default {
  name: 'login-tabs-account',
  setup() {
    const formRef = ref(null)
    const accountMode = reactive({
      account: { status: true, message: '使用密码登录', icon: UserOutlined, useMode: 'password' },
      SMS: { status: false, message: '使用短信登录', icon: MailOutlined, useMode: 'verificationCode' }
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
      username: '',
      password: '',
      verificationCode: '',
      termReading: false
    })
    // 登录方式切换
    const modeToggle = () => {
      // 修改 accountMode
      const objArr = ref(Object.keys(accountMode))
      for (const key of objArr.value) {
        if (accountMode[key].status) {
          const index = objArr.value.indexOf(key)
          const posKey = objArr.value[(index + 1) % objArr.value.length];
          // 交换
          [accountMode[key].status, accountMode[posKey].status] = [accountMode[posKey].status, accountMode[key].status]
          break
        }
      }
      // 修改 formState
      for (const [key, value] of Object.entries(formState)) {
        // 如果类型是布尔值对象则跳过
        if (value instanceof Boolean) {
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
      username: [{
        required: true,
        validator: validateUsername,
        trigger: 'change'
      }],
      password: [{
        require: true,
        validator: validatePassword,
        trigger: 'change'
      }],
      verificationCode: [{
        required: true,
        validator: validateVerificationCode,
        trigger: 'change'
      }]
    }
    // 表单布局
    const layout = {
      labelCol: {
        span: 0
      },
      wrapperCol: {
        span: 22
      }
    }

    const onFinish = values => {
      message.success('登录成功!')
      console.log('Success:', values)
    }
    const onFinishFailed = errorInfo => {
      message.error('表单验证失败!')
      console.log('Failed:', errorInfo)
    }
    // 重置表单
    const resetForm = () => (formRef.value.resetFields())
    const disabled = computed(() => {
      return (formState.username && formState[currentLoginMode.value.useMode])
    })
    return {
      imageQQURL,
      accountMode,
      currentLoginMode,
      modeToggle,
      formState,
      ruleSchema,
      layout,
      onFinish,
      onFinishFailed,
      disabled
    }
  },
  components: { UserOutlined, MailOutlined, LockOutlined, SafetyOutlined }
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

    >.ant-tag {
      display: inline-block;
      height: 25px;
      .hoverLink(blue);

      >span.anticon {
        line-height: 25px;
        margin-right: 5px;
      }
    }
  }

  >form {
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
