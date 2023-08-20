<template>
  <nav class="app-topnav">
    <div class="container">
      <a-row justify="end" align="middle">
        <a-col :flex="60"></a-col>
        <template v-if="isLogin">
          <a-col :flex="2">
            <a-avatar>
              <template #icon>
                <user-outlined />
              </template>
            </a-avatar>
            &emsp;
            <router-link to="/member">{{ profile.account }}</router-link>
          </a-col>
          <a-divider type="vertical" style="height: 20px; border-color: gray" />
          <a-col :flex="2"><a href="javascript:;" @click="logout">退出登录</a></a-col>
        </template>
        <template v-else>
          <a-col :flex="2">
            <router-link to="/login">请先登录</router-link>
          </a-col>
          <a-divider type="vertical" style="height: 20px; border-color: gray" />
          <a-col :flex="2"><a href="javascript:;">免费注册</a></a-col>
        </template>
        <a-divider type="vertical" style="height: 20px; border-color: gray" />
        <a-col :flex="2"><a href="javascript:;">我的订单</a></a-col>
        <a-divider type="vertical" style="height: 20px; border-color: gray" />
        <a-col :flex="2"><a href="javascript:;">会员中心</a></a-col>
        <a-divider type="vertical" style="height: 20px; border-color: gray" />
        <a-col :flex="2"><a href="javascript:;">帮助中心</a></a-col>
        <a-divider type="vertical" style="height: 20px; border-color: gray" />
        <a-col :flex="2"><a href="javascript:;">关于我们</a></a-col>
        <a-divider type="vertical" style="height: 20px; border-color: gray" />
        <a-col :flex="2">
          <mobile-two-tone style="fontsize: 20px" />
          &nbsp;
          <router-link to="/">手机版</router-link>
        </a-col>
      </a-row>
    </div>
  </nav>
</template>

<script>
import { UserOutlined, MobileTwoTone } from "@ant-design/icons-vue"

import { computed, getCurrentInstance } from "vue"
import { getToken } from "@/utils/auth"

export default {
  components: {
    UserOutlined,
    MobileTwoTone,
  },
  setup() {
    const { proxy } = getCurrentInstance()
    const isLogin = computed(() => Boolean(getToken()))
    const { profile } = proxy.$store.useState("user", {
      profile: (state) => state.profile,
    })
    const { logout } = proxy.$store.useActions("user", ["logout"])
    return {
      isLogin,
      profile,
      logout,
    }
  },
}
</script>

<style lang="less" scoped>
.app-topnav {
  background: #333;
  .container {
    height: 53px;
    .ant-row {
      height: 100%;
      .ant-col {
        display: flex;
        justify-content: center;
        align-items: center;
        vertical-align: middle;
        a {
          display: inline-block;
          text-align: center;
          color: #cdcdcd;
          &:hover {
            color: @xtxColor;
          }
        }
      }
    }
  }
}
</style>
