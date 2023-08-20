<template>
  <div class="pagination-container">
    <a-pagination
      v-model:current="currentPage"
      v-model:page-size="currentPageSize"
      :total="total"
      :show-total="(total, range) => showTotal(total)"
      @change="handleChange"
    ></a-pagination>
  </div>
</template>

<script>
import { computed } from "vue"

export default {
  props: {
    total: {
      type: Number,
      required: true,
    },
    page: {
      type: Number,
      default: 1,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    pageSizes: {
      type: Array,
      default: () => [5, 10, 20, 30, 50],
    },
    showTotal: {
      type: Function,
      default(total) {
        return `共 ${total} 条`
      },
    },
  },
  emits: ["update:page", "update:pages"],
  setup(props, { emit }) {
    const currentPage = computed({
      get() {
        return props.page
      },
      set(value) {
        emit("update:page", value)
      },
    })
    const currentPageSize = computed({
      get() {
        return props.pages
      },
      set(value) {
        emit("update:pages", value)
      },
    })

    const handleChange = (data) => {
      console.log(data)
    }

    return {
      currentPage,
      currentPageSize,
      handleChange,
    }
  },
}
</script>

<style lang="less" scoped>
.pagination-container {
  box-sizing: border-box;
  text-align: center;
  height: 50px;
  padding: 9px 0;
}
</style>
