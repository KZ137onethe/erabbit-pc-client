<template>
  <div class="app-header-sticky" :class="{ 'has-sticky': hasSticky }">
    <div v-show="hasSticky" class="container">
      <RouterLink to="/">
        <a-image :width="200" :height="132" :src="logoImg" :preview="false" class="logo" />
      </RouterLink>
      <app-header-nav :layer-show="hasSticky" />
      <a-row type="flex" justify="space-around" align="middle">
        <a-col :flex="1">
          <RouterLink to="/">品牌</RouterLink>
        </a-col>
        <a-col :flex="1">
          <RouterLink to="/">专题</RouterLink>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import { computed } from "vue"
import { useWindowScroll } from "@vueuse/core"
import AppHeaderNav from "./app-header-nav.vue"
import logoImg from "@/assets/images/logo.png"

export default {
  name: "AppHeaderSticky",
  components: {
    AppHeaderNav,
  },
  props: {
    // 其实传递过来的是 computed 的数据
    show: {
      type: Object,
      required: true,
      validator(value) {
        return ["value"].includes(value)
      },
    },
  },
  setup(props) {
    const { y } = useWindowScroll()
    const hasSticky = computed(() => {
      return Boolean(y.value >= 100 && props.show.value)
    })
    return {
      scrollY: y,
      logoImg,
      hasSticky,
    }
  },
}
</script>

<style scoped lang="less">
.app-header-sticky {
  width: 100%;
  height: 80px;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  background-color: #fff;
  border-bottom: 1px solid #e4e4e4;
  transform: translateY(-100%);
  display: none;
  &.has-sticky {
    transition: all 0.2s linear;
    transform: none;
    display: block;
  }
  .container {
    display: flex;
    align-items: center;
    height: 100%;
    // logo图片的样式
    &:deep(.logo) {
      width: 200px;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }
    .ant-row {
      width: 220px;
      height: 100%;
      .ant-col {
        &:first-child {
          > a {
            border-left: 2px solid @xtxColor;
          }
        }
        a {
          width: 100%;
          height: 32px;
          display: inline-block;
          text-align: center;
          font-size: 16px;
          line-height: 32px;
          &:hover {
            color: @xtxColor;
          }
        }
      }
    }
  }
}
</style>
