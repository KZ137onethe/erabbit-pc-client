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
      :rules="bindRule"
      :model="formState"
      @finish="handleFinish"
      @finishFailed="handleFinishFailed"
    >
      <a-form-item name="phone" class="bind-data">
        <a-input v-model:value="formState.phone" placeholder="绑定的手机号">
          <template #prefix>
            <mobile-outlined />
          </template>
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
      <a-form-item>
        <a-button type="primary" size="large" html-type="submit" :disabled="buttonCheck">
          立即绑定
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { MobileOutlined, SafetyOutlined } from "@ant-design/icons-vue"
import { message } from "ant-design-vue"
import "ant-design-vue/es/message/style/css"

import { reactive, computed, onMounted, getCurrentInstance } from "vue"
import { useRouter } from "vue-router"
import { checkButton, SendBtn } from "./form"
import { BindRules } from "./schema-rule/callback-bind-validate.js"
import userApi from "@/api/user"

export default {
  components: {
    MobileOutlined,
    SafetyOutlined,
    SendBtn,
  },
  props: {
    unionId: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { proxy } = getCurrentInstance()
    // 表单
    const formState = reactive({
      phone: "",
      verificationCode: "",
    })

    // QQ用户绑定规则
    const QQUserInfo = reactive({
      nickname: "",
      avatar: "",
    })
    const promptMSG = computed(
      () => `Hi，${QQUserInfo.nickname} 欢迎来小兔鲜，完成绑定后可以QQ账号一键登录哦~`,
    )
    const { unionId } = reactive(props)
    onMounted(() => {
      if (QC.Login.check()) {
        QC.api("get_user_info").success((res) => {
          const { data } = res
          QQUserInfo.nickname = data.nickname
          QQUserInfo.avatar = data.figureurl_qq
        })
      }
    })

    // 绑定规则
    const bindRule = computed(() => BindRules())
    // SendBtn
    const validate = (data) => {
      const phone = parseInt(data, 10)
      return /^1[3-9]\d{9}$/.test(phone)
    }
    const sendCode = (phone) => userApi._userQQBindGetVerificationCode(phone)
    // 绑定框状态
    const buttonCheck = computed(() => checkButton(formState))
    const router = useRouter()
    const { redirectHome } = proxy.$store.useState({
      redirectHome: (state) => state.redirectUrl,
    })
    const { setUser } = proxy.$store.useMutations("user", ["setUser"])
    const { mergeLocalCart, getCartList } = proxy.$store.useActions("cart", [
      "mergeLocalCart",
      "getCartList",
    ])
    const handleFinish = (values) => {
      const { phone, verificationCode } = values
      console.log(phone, verificationCode)
      userApi
        ._userQQBindPhone({ unionId, mobile: phone, verificationCode })
        .then((res) => {
          // 存用户数据 => 重定向 => 登录提示
          const userData = res.result
          setUser(userData)
          mergeLocalCart().then(() => {
            router.push(redirectHome)
            message.success("登录成功")
          })
          getCartList()
        })
        .catch((e) => {
          message.error(e.response.data.message)
        })
    }
    const handleFinishFailed = (errors) => {
      message.error("表单校验失败！")
      console.log("error: ", errors)
    }

    return {
      formState,
      QQUserInfo,
      promptMSG,
      bindRule,
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
