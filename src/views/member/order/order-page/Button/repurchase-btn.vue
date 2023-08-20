<template>
  <operation title="再次购买" class="order-repurchase" @btnClick="click"></operation>
</template>

<script>
import { message } from "ant-design-vue"
import Operation from "./operation.vue"
import "ant-design-vue/es/message/style/css"

export default {
  components: {
    Operation,
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
