import { useIntervalFn } from '@vueuse/core'
import { ref, reactive, computed, defineComponent, watch} from 'vue'
import { message } from 'ant-design-vue'
import 'ant-design-vue/es/message/style/css'
import { Button } from 'ant-design-vue'
import 'ant-design-vue/lib/button/style';

// 检查表单提交button状态
export const checkButton = (formState) => {
  for (let value of Object.values(formState)) {
    if (Boolean(value) === false) {
      return true
    }
  }
  return false
}

// 发送验证码的组件
export const SendBtn = defineComponent({
  name: 'send-button',
  components: { AButton: Button },
  props:{
    data: {
      type: Number || String,
      required: true,
    },
    data_rule:{
      type: Function,
      required: true,
    },
    AuthenticationFn:{
      type: Function,
      required: true,
    }
  },
  setup(props){
    const {  data_rule, AuthenticationFn } = props;
    const data = computed(() => props.data)
    const timer = ref(0)
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
    
    const SendCode = async () => {
			// 校验手机号
      
			const validate = data_rule(data.value)
			if (validate) {
				try {
					await AuthenticationFn(data.value)
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

    const checkBtn = reactive({
      msg: computed(() => timer.value <= 0 ? '发送验证码' : `${timer.value}秒`),
      disabled: computed(() => timer.value > 0)
    })

    return () => (
      <a-button disabled={checkBtn.disabled} type={'link'} onClick={() => SendCode()}>
        {checkBtn.msg}
      </a-button>
    )
  }
})