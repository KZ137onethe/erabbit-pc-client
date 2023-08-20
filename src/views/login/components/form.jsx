import { ref, reactive, computed, defineComponent } from "vue"
import { message, Button } from "ant-design-vue"
import { reciprocalTime } from "@/utils/time"

import "ant-design-vue/es/message/style/css"

import "ant-design-vue/lib/button/style"

// 检查表单提交button状态
export const checkButton = (formState) => {
  for (const value of Object.values(formState)) {
    if (Boolean(value) === false) {
      return true
    }
  }
  return false
}

// 发送验证码的组件
export const SendBtn = defineComponent({
  name: "SendButton",
  components: { AButton: Button },
  props: {
    data: {
      type: Number || String,
      required: true,
    },
    dataRule: {
      type: Function,
      required: true,
    },
    authenticationFn: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    const { dataRule, authenticationFn } = reactive(props)
    const data = computed(() => props.data)
    const countdown = new Map([
      ["true", 60],
      ["false", 3],
    ])
    const timer = ref(null)
    const zhTime = ref("0秒")

    const SendCode = async () => {
      // 校验手机号

      const validate = dataRule(data.value)
      if (validate) {
        try {
          await authenticationFn(data.value)
          message.success("短信发送成功！")
          timer.value = countdown.get("true")
        } catch (e) {
          message.error(e.response.data.message)
          timer.value = countdown.get("false")
        } finally {
          const { start } = reciprocalTime(timer.value, (value) => {
            start()
            zhTime.value = value
          })
        }
      } else {
        // 手机校验失败，提示用户
        message.error("手机号格式不对，发送失败！")
      }
    }

    const checkBtn = reactive({
      msg: computed(() => (zhTime.value === "0秒" ? "发送验证码" : zhTime.value)),
      disabled: computed(() => zhTime.value !== "0秒"),
    })

    return () => (
      <a-button disabled={checkBtn.disabled} type={"link"} onClick={() => SendCode()}>
        {checkBtn.msg}
      </a-button>
    )
  },
})
