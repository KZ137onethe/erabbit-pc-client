<template>
  <a-layout has-sider class="member-layout container">
    <a-layout-sider class="member-layout--side">
      <header class="side__header">个人中心</header>
      <a-menu
        v-model:selected-keys="state.selectedKeys"
        :open-keys="state.openKeys"
        theme="light"
        mode="inline"
        collapsible
        @open-change="onOpenChange"
      >
        <a-sub-menu v-for="item of NavMenu" :key="item.key" :title="item.message">
          <a-menu-item v-for="subItem of item.child" :key="subItem.key">
            <router-link
              :to="{ path: subItem.path, query: subItem?.query }"
              exact-active-class="active"
            >
              {{ subItem.message }}
            </router-link>
          </a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <router-view></router-view>
  </a-layout>
</template>
<script>
import { defineComponent, ref, reactive } from "vue"

const NavMenu = ref([
  {
    key: "count",
    message: "我的账户",
    child: [
      { key: "count-user", message: "个人中心", path: "/member" },
      { key: "count-message", message: "消息通知", path: "/" },
      { key: "count-info", message: "个人信息", path: "/" },
      { key: "count-security", message: "安全设置", path: "/" },
      { key: "count-address", message: "地址管理", path: "/" },
      { key: "count-integral", message: "个人积分", path: "/" },
      { key: "count-history", message: "我的足迹", path: "/" },
    ],
  },
  {
    key: "transaction",
    message: "交易管理",
    child: [
      {
        key: "transaction-order",
        message: "我的订单",
        path: "/member/order",
        query: { orderState: 0 },
      },
      { key: "transaction-OrderEvaluation", message: "订单评价", path: "/" },
      { key: "transaction-coupon", message: "优惠券", path: "/" },
      { key: "transaction-GiftCard", message: "礼品卡", path: "/" },
      { key: "transaction-AfterSales", message: "售后服务", path: "/" },
    ],
  },
  {
    key: "collection",
    message: "我的收藏",
    child: [
      { key: "collection-goods", message: "收藏商品", path: "/" },
      { key: "collection-special", message: "收藏专题", path: "/" },
      { key: "collection-brand", message: "收藏品牌", path: "/" },
    ],
  },
  {
    key: "helper",
    message: "帮助中心",
    child: [
      { key: "help-center", message: "帮助中心", path: "/" },
      { key: "help-online", message: "在线客服", path: "/" },
    ],
  },
])
export default defineComponent({
  setup() {
    const state = reactive({
      rootSubmenuKeys: NavMenu.value.map((subMenu) => subMenu.key),
      selectedKeys: ["count-user"],
      openKeys: ["count"],
    })

    // 只展开一个父级菜单
    const onOpenChange = (openKeys) => {
      const latestOpenKey = openKeys.find((key) => state.openKeys.indexOf(key) === -1)
      if (state.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        state.openKeys = openKeys
      } else {
        state.openKeys = latestOpenKey ? [latestOpenKey] : []
      }
    }
    return {
      state,
      NavMenu,
      onOpenChange,
    }
  },
})
</script>
<style lang="less" scoped>
.member-layout {
  margin: 20px auto;
  min-height: 100vh;
  background-color: var(--xtx-bg-color-2);
}
.member-layout--side {
  background-color: var(--xtx-bg-color-1);
  position: sticky;
  margin-right: 16px;
  overflow: auto;
  max-height: 100vh;
  overflow: auto;
  .side__header {
    height: 30px;
    margin: 10px;
    text-align: center;
    line-height: 30px;
    font-weight: bold;
  }
}
</style>
