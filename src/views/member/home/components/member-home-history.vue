<template>
  <div class="member-home-history">
    <member-home-panel
      title="我的足迹"
      :goods="history?.data"
      :jump-data="{ path: '/', info: '查看全部 >' }"
    />
  </div>
</template>

<script>
import { ref, onMounted } from "vue"
import MemberHomePanel from "./member-home-panel.vue"

import memberApi from "@/api/member"

export default {
  components: {
    MemberHomePanel,
  },
  setup() {
    const history = ref([])
    onMounted(() => {
      memberApi._getHistory({ page: 1, pageSize: 4 }).then((data) => {
        history.value = data.result
        console.log("history:", history.value)
      })
    })
    return {
      history,
    }
  },
}
</script>

<style lang="less" scoped></style>
