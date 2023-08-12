<template>
  <login-layout class="page-login">
    <template #headTitle>请先登录</template>
    <template #body>
      <login-body></login-body>
    </template>
  </login-layout>
</template>

<script>
import { useRoute } from "vue-router"
import LoginLayout from "@/layout/login/Layout.vue"
import LoginBody from "./components/login-body.vue"

import { useMutations } from "@/hooks"

export default {
  name: "PageLogin",
  components: { LoginLayout, LoginBody },
  setup() {
    const route = useRoute()
    const storeUserMutations = useMutations("user", ["setRedirectUrl"])
    storeUserMutations.setRedirectUrl(route.fullPath)
  },
}
</script>

<style scoped></style>
