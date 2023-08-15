<template>
  <default-layout class="app-layout">
    <template #childBody>
      <router-view></router-view>
    </template>
  </default-layout>
</template>

<script>
import { useRoute } from "vue-router"
import { computed, provide, getCurrentInstance, onMounted } from "vue"
import DefaultLayout from "@/layout/default.vue"

export default {
  name: "LayoutDefault",
  components: {
    DefaultLayout,
  },
  setup() {
    const { proxy } = getCurrentInstance()
    const route = useRoute()
    const control = computed(() => {
      if (route.path === "/cart" || route.fullPath.search(/\/member[/\w*]*/) !== -1) {
        return false
      }
      return true
    })
    const { getCategoryList } = proxy.$store.useActions("category", {
      getCategoryList: "getList",
    })

    const { categoryList } = proxy.$store.useState("category", {
      categoryList: "list",
    })

    provide("headSticky", control)

    onMounted(() => {
      getCategoryList()
    })
    return {
      control,
      getCategoryList,
      categoryList,
    }
  },
}
</script>

<style lang="less" scoped></style>
