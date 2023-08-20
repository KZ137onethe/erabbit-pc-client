<template>
  <operation title="确认收货" class="order-receipt" @btnClick="showModal">
    <a-modal v-model:visible="visible" title="确认收货" @ok="handleOk">
      <p class="description">您确认收到货吗？确认后货款将会打给卖家。</p>
    </a-modal>
  </operation>
</template>

<script>
import { ref } from "vue"
import { message } from "ant-design-vue"
import memberApi from "@/api/member"

import Operation from "./operation.vue"
import "ant-design-vue/es/message/style/css"

export default {
  components: {
    Operation,
  },
  props: {
    orderId: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit }) {
    const visible = ref(false)
    const showModal = () => {
      visible.value = true
    }
    const handleOk = () => {
      memberApi._receiptOrder(props.orderId).then(() => {
        message("确认收货成功!")
        visible.value = false
        emit("refresh")
      })
    }
    return {
      visible,
      showModal,
      handleOk,
    }
  },
}
</script>

<style lang="less" scoped></style>
