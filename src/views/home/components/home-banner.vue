<template>
    <AppBanner :ArrowPosition="{ left: 260 + 'px', right: 0}">
        <template #banner>
            <template v-if="banners">
                <div v-for="banner in banners" :key="banner.id">
                    <RouterLink to="/">
                        <img :src="banner.imgUrl" alt="">
                    </RouterLink>
                </div>
            </template>
        </template>
    </AppBanner>
</template>

<script>
import AppBanner from '@/components/optional/app-banner.vue'
import { ref } from 'vue'
import { _findBanner } from '@/api'
export default {
  components: {
    AppBanner
  },
  setup () {
    const banners = ref([])
    _findBanner().then(data => {
      banners.value = data.result
    })
    return {
      banners
    }
  }
}
</script>

<style lang="less" scoped>
</style>
