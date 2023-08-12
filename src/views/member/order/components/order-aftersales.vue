<template>
  <operation-button title="申请售后" class="order-aftersales" @btnClick="click"></operation-button>
</template>

<script>
import { message } from "ant-design-vue"
import OperationButton from "./operation-btn.vue"
import "ant-design-vue/es/message/style/css"

export default {
  components: {
    OperationButton,
  },
  setup() {
    const click = () => {
      message.warn("未开放")
    }
    return {
      click,
    }
  },
}
</script>

<style lang="less" scoped></style>
