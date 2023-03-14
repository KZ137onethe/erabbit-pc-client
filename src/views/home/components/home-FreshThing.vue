<template>
    <HomePanel title="新鲜好物" subTitle="新鲜出炉 品质靠谱">
        <template #head-right>
            <XtxMore />
        </template>
        <template #main>
          <div ref="target" style="position: relative; height: 406px;">
            <transition name="fade">
              <div class="main-panel" v-if="goods.length">
                <a-row :gutter="16" type="flex" :justify="start" :wrap="false">
                  <a-col flex="1" v-for="item in goods" :key="item.id">
                    <a-card hoverable>
                      <template #cover>
                          <img alt="example" :src="item.picture" />
                      </template>
                      <a-card-meta>
                          <template #title>{{ item.name }}</template>
                          <template #description> ¥ {{ item.price }}</template>
                      </a-card-meta>
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
import HomePanel from './home-panel.vue'
import HomeSkeleton from './home-skeleton.vue'
import { useLazyData } from '@/hooks'
import { _findFreshThing } from '@/api'
export default {
  components: {
    HomePanel,
    HomeSkeleton
  },
  setup () {
    // const goods = ref([])
    // _findFreshThing().then(data => {
    //   goods.value = data.result
    // })
    const { target, res } = useLazyData(_findFreshThing)
    return {
      goods: res,
      target
    }
  }
}
</script>

<style lang="less" scoped>
.main-panel{
  &:deep(.ant-card-hoverable){
    .hoverShadow()
  }
  &:deep(.ant-card-meta){
    &-detail{
      text-align: center;
    }
    &-description{
      color: @priceColor;
      font-weight:bold;
    }
  }
}
</style>
