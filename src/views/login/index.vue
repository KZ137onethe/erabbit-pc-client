<template>
  <div class="pageLogin">
    <LoginHeader>
      <template #subTitle>请先登录</template>
    </LoginHeader>
    <LoginBody></LoginBody>
    <LoginFooter></LoginFooter>
  </div>
</template>

<script>
import LoginHeader from './components/login-header.vue'
import LoginBody from './components/login-body.vue'
import LoginFooter from './components/login-footer.vue'

export default {
  name: 'pageLogin',
  setup () {

  },
  components: { LoginHeader, LoginFooter, LoginBody }
}
</script>

<style scoped>

</style>
