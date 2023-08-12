<template>
  <home-panel title="人气推荐" sub-title="人气爆款 不容错过">
    <template #main>
      <div ref="target" style="position: relative; height: 406px">
        <transition name="fade">
          <div v-if="terms.length" class="main-panel">
            <a-row :gutter="16" type="flex">
              <a-col v-for="item in terms" :key="item.id" flex="1">
                <a-card hoverable>
                  <template #cover>
                    <img alt="example" :src="item.picture" />
                  </template>
                  <a-card-meta>
                    <template #title>{{ item.title }}</template>
                    <template #description>{{ item.alt }}</template>
                  </a-card-meta>
                </a-card>
              </a-col>
            </a-row>
          </div>
          <template v-else>
            <home-skeleton />
          </template>
        </transition>
      </div>
    </template>
  </home-panel>
</template>

<script>
import HomePanel from "./home-panel.vue"
import HomeSkeleton from "./home-skeleton.vue"
import { useLazyData } from "@/hooks"
import { homeApi } from "@/api"

const { _findHot } = homeApi
export default {
  components: {
    HomePanel,
    HomeSkeleton,
  },
  setup() {
    // const terms = ref([])
    // _findHot().then(data => {
    //   terms.value = data.result
    // })
    const { target, res } = useLazyData(_findHot)
    return {
      terms: res,
      target,
    }
  },
}
</script>

<style lang="less" scoped>
.main-panel {
  &:deep(.ant-card-hoverable) {
    .hoverShadow();
  }
  &:deep(.ant-card-meta) {
    &-detail {
      text-align: center;
    }
  }
}
</style>
