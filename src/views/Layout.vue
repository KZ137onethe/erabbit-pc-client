<template>
  <default-layout class="app-layout">
    <template #childBody>
      <router-view></router-view>
    </template>
  </default-layout>
</template>

<script>
import { useRoute } from "vue-router"
import { computed, provide } from "vue"
import DefaultLayout from "@/layout/default.vue"
import { useState, useActions } from "@/hooks"

export default {
  name: "LayoutDefault",
  components: {
    DefaultLayout,
  },
  setup() {
    const route = useRoute()
    const control = computed(() => {
      if (route.path === "/cart" || route.fullPath.search(/\/member[/\w*]*/) !== -1) {
        return false
      }
      return true
    })
    const storeCategoryActions = useActions("category", {
      getCategoryList: "getList",
    })
    storeCategoryActions.getCategoryList()
    const storeCategoryState = useState("category", ["list"])
    provide("headSticky", control)
    return {
      control,
      ...storeCategoryActions,
      ...storeCategoryState,
    }
  },
}
</script>

<style lang="less" scoped></style>
