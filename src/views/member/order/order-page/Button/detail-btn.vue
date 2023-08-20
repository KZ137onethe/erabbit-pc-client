<template>
  <operation title="查看详情" class="order-detail" @btnClick="click"></operation>
</template>

<script>
import { useRouter } from "vue-router"
import Operation from "./operation.vue"

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
  setup(props) {
    const router = useRouter()
    const click = () => {
      router.push({ path: `/member/order/${props.orderId}` })
    }
    return {
      click,
    }
  },
}
</script>

<style lang="less" scoped></style>
