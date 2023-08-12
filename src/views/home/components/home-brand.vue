<template>
  <home-panel title="热门品牌" sub-title="国际经典 品质保证">
    <template #head-right>
      <a-space>
        <a-button :disabled="index === 0" @click="toggle(-1)">
          <template #icon><left-outlined style="fontsize: 24px" /></template>
        </a-button>
        <a-button :disabled="index === 1" @click="toggle(1)">
          <template #icon><right-outlined style="fontsize: 24px" /></template>
        </a-button>
      </a-space>
    </template>
    <template #main>
      <div ref="target" style="position: relative; height: 320px">
        <transition name="fade">
          <div v-if="brands.length" class="main-panel">
            <a-row v-if="index === 0" :gutter="16" type="flex">
              <a-col v-for="item in firstBrands" :key="item.id" flex="1">
                <a-card hoverable style="height: 100%">
                  <template #cover>
                    <img alt="example" :src="item.picture" />
                  </template>
                </a-card>
              </a-col>
            </a-row>
            <a-row v-else :gutter="16" type="flex">
              <a-col v-for="item in secondBrands" :key="item.id" flex="1">
                <a-card hoverable style="height: 100%">
                  <template #cover>
                    <img alt="example" :src="item.picture" />
                  </template>
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
import { LeftOutlined, RightOutlined } from "@ant-design/icons-vue"
import { ref, computed } from "vue"
import HomePanel from "./home-panel"
import HomeSkeleton from "./home-skeleton"
import { homeApi } from "@/api"
import { useLazyData } from "@/hooks"

const { _findBrand } = homeApi
export default {
  components: {
    HomePanel,
    HomeSkeleton,
    LeftOutlined,
    RightOutlined,
  },
  setup() {
    // TODO: 组件结构需要优化
    const index = ref(0)
    const { target, res } = useLazyData(() => _findBrand(10))
    // 通过按钮改变品牌栏的索引
    const toggle = (step) => {
      const resIndex = index.value + step
      if (resIndex < 0 || resIndex > 1) return
      index.value = resIndex
    }
    return {
      target,
      brands: res,
      firstBrands: computed(() => res.value.slice(0, 5)),
      secondBrands: computed(() => res.value.slice(5, 10)),
      index,
      toggle,
    }
  },
}
</script>

<style lang="less" scoped></style>
