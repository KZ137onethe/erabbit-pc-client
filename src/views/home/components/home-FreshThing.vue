<template>
  <home-panel title="新鲜好物" sub-title="新鲜出炉 品质靠谱">
    <template #head-right>
      <XtxMore />
    </template>
    <template #main>
      <div ref="target" style="position: relative; height: 406px">
        <transition name="fade">
          <div v-if="goods.length" class="main-panel">
            <a-row :gutter="16" type="flex" :justify="start" :wrap="false">
              <a-col v-for="item in goods" :key="item.id" flex="1">
                <a-card hoverable>
                  <template #cover>
                    <img alt="example" :src="item.picture" />
                  </template>
                  <a-card-meta>
                    <template #title>{{ item.name }}</template>
                    <template #description>¥ {{ item.price }}</template>
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
import homeApi from "@/api/home"

export default {
  components: {
    HomePanel,
    HomeSkeleton,
  },
  setup() {
    const { target, res } = useLazyData(homeApi._findFreshThing)
    return {
      goods: res,
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
    &-description {
      color: @priceColor;
      font-weight: bold;
    }
  }
}
</style>
