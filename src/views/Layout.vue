<template>
  <div class="layout">
    <!-- 顶部组件 -->
    <AppNavbar />
    <!-- 头部组件 -->
    <AppHeader />
    <!-- 头部吸顶组件 -->
    <AppHeaderSticky />
    <div class="main">
      <!-- 二级路由 -->
      <router-view />
    </div>
    <AppFooter />
  </div>
</template>

<script>
import { useState, useActions } from '@/hooks'
import AppNavbar from '@/components/app-navbar'
import AppHeader from '@/components/app-header'
import AppHeaderSticky from '@/components/app-header-sticky'
import AppFooter from '@/components/app-footer'
export default {
  name: 'Layout-default',
  components: {
    AppNavbar,
    AppHeader,
    AppHeaderSticky,
    AppFooter
  },
  setup() {
    const storeCategoryActions = useActions('category', {
      getCategoryList: 'getList'
    })
    storeCategoryActions.getCategoryList()
    const storeCategoryState = useState('category', ['list'])
    const a = abc => (console.log("121"))
    return {
      ...storeCategoryActions,
      ...storeCategoryState
    }
  }
}
</script>

<style lang="less" scoped></style>
