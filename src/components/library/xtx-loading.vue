<template>
  <a-spin :indicator="indicator" />
</template>
<script>
import { LoadingOutlined } from "@ant-design/icons-vue"
import { defineComponent, h } from "vue"

export default defineComponent({
  props: {
    size: {
      type: Number,
      default: 24,
    },
  },
  setup(props) {
    const indicator = h(LoadingOutlined, {
      style: {
        fontSize: `${props.size}px`,
      },
      spin: true,
    })
    return {
      indicator,
    }
  },
})
</script>

<style lang="less" scoped>
:deep(svg) {
  fill: @xtxColor;
}
</style>
