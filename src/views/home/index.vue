<template>
  <div class="home-page">
    <!-- 首页入口 -->
    <div class="home-entry">
      <div class="container">
        <!-- 左侧分类 -->
        <home-category />
        <!-- 右侧轮播图 -->
        <home-banner />
      </div>
    </div>
    <!-- 新鲜好物 -->
    <home-fresh-thing />
    <!-- 人气推荐 -->
    <home-hot />
    <!-- 热门品牌 -->
    <home-brand />
    <!-- 商品区块 -->
    <home-product />
    <!-- 最新专题 -->
    <home-special />
  </div>
</template>

<script>
import HomeBanner from "./components/home-banner"
import HomeCategory from "./components/home-category"
import HomeFreshThing from "./components/home-FreshThing"
import HomeHot from "./components/home-hot"
import HomeBrand from "./components/home-brand"
import HomeProduct from "./components/home-product"
import HomeSpecial from "./components/home-special"

export default {
  name: "HomePage",
  components: {
    HomeBanner,
    HomeCategory,
    HomeFreshThing,
    HomeHot,
    HomeBrand,
    HomeProduct,
    HomeSpecial,
  },
}
</script>

<style lang="less" scoped></style>
