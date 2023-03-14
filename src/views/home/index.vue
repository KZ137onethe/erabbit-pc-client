<template>
    <div class="home-page">
      <!-- 首页入口 -->
      <div class="home-entry">
        <div class="container">
          <!-- 左侧分类 -->
          <HomeCategory />
          <!-- 右侧轮播图 -->
          <HomeBanner />
        </div>
      </div>
      <!-- 新鲜好物 -->
      <HomeFreshThing />
      <!-- 人气推荐 -->
      <HomeHot />
      <!-- 热门品牌 -->
      <HomeBrand />
      <!-- 商品区块 -->
      <HomeProduct />
      <!-- 最新专题 -->
      <HomeSpecial />
    </div>
</template>

<script>
import HomeBanner from './components/home-banner'
import HomeCategory from './components/home-category'
import HomeFreshThing from './components/home-FreshThing'
import HomeHot from './components/home-hot'
import HomeBrand from './components/home-brand'
import HomeProduct from './components/home-product'
import HomeSpecial from './components/home-special'
export default {
  name: 'home-page',
  components: {
    HomeBanner,
    HomeCategory,
    HomeFreshThing,
    HomeHot,
    HomeBrand,
    HomeProduct,
    HomeSpecial
  }
}
</script>

<style lang="less" scoped>
</style>
