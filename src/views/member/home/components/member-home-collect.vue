<template>
  <div class="member-home-collect">
    <member-home-panel
      title="我的收藏"
      :goods="collect?.items"
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
    const collect = ref([])
    onMounted(() => {
      memberApi._getCollect({ page: 1, pageSize: 4 }).then((data) => {
        collect.value = data.result
        console.log(collect)
      })
    })

    return {
      collect,
    }
  },
}
</script>

<style lang="less" scoped></style>
