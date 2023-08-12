<template>
  <RouterLink :to="path" class="xtx-more">
    <span>查看全部</span>
    <right-outlined />
  </RouterLink>
</template>

<script>
import { RightOutlined } from "@ant-design/icons-vue"

export default {
  name: "XtxMore",
  components: {
    RightOutlined,
  },
  props: {
    path: {
      type: String,
      default: "/",
    },
  },
}
</script>

<style lang="less" scoped>
.xtx-more {
  margin-bottom: 2px;
  span {
    font-size: 16px;
    vertical-align: center;
    margin-right: 4px;
    color: #999;
  }
  &:hover {
    span {
      color: @xtxColor;
    }
  }
}
</style>
