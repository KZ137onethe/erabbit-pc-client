import { ref, reactive, computed, defineComponent } from "vue"
import { message, Button } from "ant-design-vue"
import { useReciprocalTime } from "@/hooks"
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
    const process = ref(null)
    const SendCode = async () => {
      // 校验手机号

      const validate = dataRule(data.value)
      if (validate) {
        try {
          await authenticationFn(data.value)
          message.success("短信发送成功！")
          // timer.value = 60

          process.value = useReciprocalTime(60)
        } catch (e) {
          message.error(e.response.data.message)
          // timer.value = 3
          process.value = useReciprocalTime(3)
        } finally {
          // resume()
          process.value?.start()
        }
      } else {
        // 手机校验失败，提示用户
        message.error("手机号格式不对，发送失败！")
      }
    }

    // 这里写个正则更合适
    const timeNumber = computed(() => parseInt(process.value?.zhTime, 10) || 0)

    const checkBtn = reactive({
      msg: computed(() => (timeNumber.value <= 0 ? "发送验证码" : `${process.value?.zh_time}`)),
      disabled: computed(() => timeNumber.value > 0),
    })

    return () => (
      <a-button disabled={checkBtn.disabled} type={"link"} onClick={() => SendCode()}>
        {checkBtn.msg}
      </a-button>
    )
  },
})
