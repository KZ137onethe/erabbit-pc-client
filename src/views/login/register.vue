<template>
  <login-layout class="login-register">
    <template #headTitle>账号注册</template>
    <template #body>
      <register-panel />
    </template>
  </login-layout>
</template>

<script>
import LoginLayout from "@/layout/login/Layout.vue"
import RegisterPanel from "./components/register-panel.vue"

export default {
  components: { LoginLayout, RegisterPanel },
  setup() {
    return {}
  },
}
</script>

<style lang="less" scoped></style>
