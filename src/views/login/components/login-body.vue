<template>
  <div class="login-body">
    <section class="login-section">
      <div class="wrapper">
        <div class="login_mode">
          <a-tabs v-model:activeKey="activeKey">
            <a-tab-pane
              v-for="[key, value] in Object.entries(loginPanel)"
              :key="key.toString()"
              :tab="value.message"
            >
              <component :is="value.component"></component>
            </a-tab-pane>
          </a-tabs>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { ref, reactive } from "vue"
import LoginTabsAccount from "./login-tabs-account.vue"
import LoginTabsQR from "./login-tabs-QR.vue"

export default {
  name: "LoginBody",
  components: { LoginTabsAccount, LoginTabsQR },
  setup() {
    const loginPanel = reactive({
      Account: { message: "账户登录", component: LoginTabsAccount },
      QR_code: { message: "扫码登录", component: LoginTabsQR },
    })
    const activeKey = ref(Object.keys(loginPanel)[0])
    return {
      activeKey,
      loginPanel,
    }
  },
}
</script>

<style scoped lang="less">
.login-section {
  background: url("../../../assets/images/login-bg.png") no-repeat center / cover;
  height: 488px;
  position: relative;

  .wrapper {
    width: 380px;
    background: #fff;
    min-height: 400px;
    position: absolute;
    left: 50%;
    top: 54px;
    transform: translate3d(100px, 0, 0);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
    .login_mode {
      height: 100%;
      width: 100%;
      padding: 10px 20px;
    }
  }
}
</style>
