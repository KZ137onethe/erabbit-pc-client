<template>
  <div class="default-layout">
    <!-- 顶部组件 -->
    <app-navbar />
    <!-- 头部组件 -->
    <app-header />
    <!-- 头部吸顶组件 -->
    <app-header-sticky v-model:show="headSticky" />
    <div class="main">
      <!-- 二级页面 -->
      <slot name="childBody"></slot>
    </div>
    <app-footer />
  </div>
</template>

<script>
import { computed, inject } from "vue"
import AppNavbar from "@/components/app-navbar.vue"
import AppHeader from "@/components/app-header.vue"
import AppHeaderSticky from "@/components/app-header-sticky.vue"
import AppFooter from "@/components/app-footer.vue"

export default {
  components: {
    AppNavbar,
    AppHeader,
    AppHeaderSticky,
    AppFooter,
  },
  setup() {
    const headSticky = computed(() => {
      return inject("headSticky", true)
    })

    return {
      headSticky,
    }
  },
}
</script>

<style lang="less" scoped></style>
