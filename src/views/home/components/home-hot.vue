<template>
    <HomePanel title="人气推荐" subTitle="人气爆款 不容错过">
        <template #main>
          <div ref="target" style="position: relative; height: 406px;">
            <transition name="fade">
              <div class="main-panel" v-if="terms.length">
                <a-row :gutter="16" type="flex">
                  <a-col flex="1" v-for="item in terms" :key="item.id">
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
import { _findHot } from '@/api'

export default {
  components: {
    HomePanel,
    HomeSkeleton
  },
  setup () {
    // const terms = ref([])
    // _findHot().then(data => {
    //   terms.value = data.result
    // })
    const { target, res } = useLazyData(_findHot)
    return {
      terms: res,
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
  }
}
</style>
