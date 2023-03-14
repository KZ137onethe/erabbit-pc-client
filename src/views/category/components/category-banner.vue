<template>
    <div class="category-banner" >
        <AppBanner :ParentElement="true" :ArrowPosition="{left: 10 + 'px', right: 10 + 'px'}">
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
    </div>
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
.category-banner{
  position: relative;
  height: 500px;
}
</style>
