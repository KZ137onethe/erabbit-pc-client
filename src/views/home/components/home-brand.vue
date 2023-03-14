<template>
    <HomePanel title="热门品牌" subTitle="国际经典 品质保证">
        <template #head-right>
            <a-space>
                <a-button @click="toggle(-1)" :disabled="index === 0">
                    <template #icon><LeftOutlined  style="fontSize: 24px"/></template>
                </a-button>
                <a-button @click="toggle(1)" :disabled="index === 1">
                    <template #icon><RightOutlined style="fontSize: 24px"/></template>
                </a-button>
            </a-space>
        </template>
        <template #main>
          <div ref="target" style="position: relative; height: 320px;">
            <transition name="fade">
              <div class="main-panel" v-if="brands.length">
                <a-row :gutter="16" type="flex" v-if="index === 0">
                    <a-col flex="1" v-for="item in firstBrands" :key="item.id">
                        <a-card hoverable style="height: 100%;">
                            <template #cover>
                                <img alt="example" :src="item.picture" />
                            </template>
                        </a-card>
                    </a-col>
                </a-row>
                <a-row :gutter="16" type="flex" v-else>
                    <a-col flex="1" v-for="item in secondBrands" :key="item.id">
                        <a-card hoverable style="height: 100%;">
                            <template #cover>
                                <img alt="example" :src="item.picture" />
                            </template>
                        </a-card>
                    </a-col>
                </a-row>
              </div>
              <template v-else>
                <HomeSkeleton />
              </template>
            </transition>
          </div>
        </template>
    </HomePanel>
</template>

<script>
import HomePanel from './home-panel'
import HomeSkeleton from './home-skeleton'
import { LeftOutlined, RightOutlined } from '@ant-design/icons-vue'
import { ref, computed } from 'vue'
import { _findBrand } from '@/api'
import { useLazyData } from '@/hooks'
export default {
  components: {
    HomePanel,
    HomeSkeleton,
    LeftOutlined,
    RightOutlined
  },
  setup () {
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
      toggle
    }
  }
}
</script>

<style lang="less" scoped>
</style>
