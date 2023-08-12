<template>
  <div class="login-layout">
    <login-header>
      <template #subTitle>
        <slot name="headTitle"></slot>
      </template>
    </login-header>
    <slot name="body"></slot>
    <login-footer></login-footer>
  </div>
</template>

<script>
import LoginHeader from "./login-header.vue"
import LoginFooter from "./login-footer.vue"

export default {
  components: {
    LoginHeader,
    LoginFooter,
  },
  setup() {
    return {}
  },
}
</script>

<style lang="less" scoped></style>
