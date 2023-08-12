<template>
  <operation-button title="查看详情" class="order-detail" @btnClick="click"></operation-button>
</template>

<script>
import { useRouter } from "vue-router"
import OperationButton from "./operation-btn.vue"

export default {
  components: {
    OperationButton,
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
