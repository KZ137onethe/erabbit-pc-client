<script lang="jsx">
import { ref, defineComponent } from "vue"
import { Divider, Button } from "ant-design-vue"
import { QuestionCircleOutlined } from "@ant-design/icons-vue"

const modifier = "--wrapper"
const addMessage = (array, modifier, ...attrs) => {
  const copyArray = Object.assign([], array)
  return copyArray.map((item) => {
    const message = attrs.map((attr) => item[attr])
    item.message = message.join(modifier)
    return item
  })
}
const Option = (props, { attrs, slots }) => {
  return (
    <div className={attrs.class}>
      <Divider>{props.title}</Divider>
      <div className={attrs.class + modifier} wrap='false'>
        {slots.content()}
      </div>
    </div>
  )
}

// 订单页面那块
export const DeliveryTime = defineComponent({
  components: {
    AButton: Button,
  },
  setup() {
    const deliveryForm = ref([
      {
        time: "周一至周日",
        method: "不限送货时间",
      },
      {
        time: "周一至周五",
        method: "工作日送货",
      },
      {
        time: "周六至周日",
        method: "双休日、假日送货",
      },
    ])
    const copyArr = addMessage(deliveryForm.value, ": ", "method", "time")
    return () => (
      <Option class='delivery-time bold' title='配送时间'>
        {{
          content: () => (
            <div class='main'>
              {copyArr.map((item, index) => (
                <a-button size='large' key={index}>
                  {item.message()}
                </a-button>
              ))}
            </div>
          ),
        }}
      </Option>
    )
  },
})

export const PayMethod = defineComponent({
  setup() {
    const payMethod = ref([
      {
        method: "在线支付",
        tips: {},
      },
      {
        method: "货到付款",
        tips: {
          icon: <QuestionCircleOutlined style={{ color: "gray" }} />,
          message: "货到付款需付5元手续费",
        },
      },
    ])
    return () => (
      <Option class='delivery-time bold' title='支付方式'>
        {{
          content: () => (
            <div class='main inline-block'>
              {payMethod.value.map((item, index) => (
                <a-button size='large' key={index}>
                  {item.method}
                  {Object.keys(item.tips).length ? item.tips.icon : undefined}
                </a-button>
              ))}
            </div>
          ),
        }}
      </Option>
    )
  },
})
export default Option
</script>

<style lang="less" scoped>
.bold {
  .ant-divider {
    font-size: 18px;
    font-weight: bold;
  }
}

:deep(button.ant-btn) {
  margin: 0 8px;
}
:deep(.main) {
  &.inline-block {
    display: inline-block;
  }
}
</style>
