<template>
  <div class="goods-tabs-detail">
    <a-descriptions>
      <a-descriptions-item
        v-for="item in goods.details.properties"
        :key="item.value"
        :label="item.name"
      >
        {{ item.value }}
      </a-descriptions-item>
    </a-descriptions>
    <img v-for="item in goods.details.pictures" :key="item" :src="item" alt="" />
  </div>
</template>

<script>
import { inject } from "vue"

export default {
  setup() {
    const goods = inject("goods")
    return {
      goods,
    }
  },
}
</script>

<style lang="less" scoped>
.goods-tabs-detail {
  > img {
    width: 100%;
  }
}
</style>
