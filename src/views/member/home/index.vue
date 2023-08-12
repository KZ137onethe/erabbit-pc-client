<template>
  <a-layout class="member-home">
    <member-home-header></member-home-header>
    <a-layout-content>
      <member-home-collect></member-home-collect>
      <member-home-history></member-home-history>
    </a-layout-content>
  </a-layout>
</template>

<script>
import MemberHomeHeader from "./components/member-home-header.vue"
import MemberHomeCollect from "./components/member-home-collect.vue"
import MemberHomeHistory from "./components/member-home-history.vue"

export default {
  components: {
    MemberHomeHeader,
    MemberHomeCollect,
    MemberHomeHistory,
  },
  setup() {
    return {}
  },
}
</script>

<style lang="less" scoped>
.member-home {
  background-color: var(--xtx-bg-color-1);
}
</style>
