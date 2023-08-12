<template>
  <div class="goods-numbox">
    <header class="label">数量：</header>
    <a-input-number
      id="inputNumber"
      v-model:value="counter.currentVal"
      :min="counter.min"
      :max="counter.max"
      @change="amend"
    />
  </div>
</template>

<script>
// import { useVModel } from '@vueuse/core'
import { ref } from "vue"

export default {
  props: {
    modelValue: {
      type: Object,
      default: () => ({ currentVal: 1, min: 1, max: 10 }),
    },
  },
  setup(props) {
    const counter = ref(props.modelValue)
    return {
      counter,
    }
  },
}
</script>

<style lang="less" scoped>
.goods-numbox {
  .label {
    display: inline-block;
    width: 50px;
  }
}
</style>
