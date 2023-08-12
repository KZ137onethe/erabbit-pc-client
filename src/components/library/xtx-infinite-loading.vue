<template>
  <div ref="target" class="xtx-infinite-loading">
    <!-- 正在加载组件 -->
    <div v-if="loading" class="loading">
      <a-spin size="large" />
    </div>
    <!-- 加载完毕组件（数据已全部加载） -->
    <div v-if="finished" class="none">
      <a-empty :description="descFinished" />
    </div>
  </div>
</template>

<script>
import { ref } from "vue"
import { useIntersectionObserver } from "@vueuse/core"

export default {
  name: "XtxInfiniteLoading",
  props: {
    // 数据是否加载
    loading: {
      type: Boolean,
      default: false,
    },
    // 数据是否加载完毕
    finished: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const target = ref(null)
    const descLoading = "正在加载中"
    const descFinished = "亲，没有更多了"
    useIntersectionObserver(target, ([{ isIntersecting }], _dom) => {
      // 当进入可视区，数据未加载完毕且数据未加载，emit触发父组件的事件来加载数据
      if (isIntersecting) {
        if (!props.finished && !props.loading) {
          emit("infinite")
        }
      }
    })
    return {
      target,
      descLoading,
      descFinished,
    }
  },
}
</script>

<style lang="less" scoped>
.xtx-infinite-loading {
  .loading,
  .none {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
  }
}
</style>
