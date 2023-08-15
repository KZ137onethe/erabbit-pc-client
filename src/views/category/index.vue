<template>
  <div class="top-category">
    <div class="container">
      <!-- 面包屑 -->
      <a-breadcrumb separator=">" class="breadcrumb">
        <a-breadcrumb-item>首页</a-breadcrumb-item>
        <transition name="fade-right" mode="out-in">
          <a-breadcrumb-item :key="topCategory.id">
            {{ topCategory.name }}
          </a-breadcrumb-item>
        </transition>
      </a-breadcrumb>
      <!-- 轮播图 -->
      <category-banner />
      <!-- 全部分类 -->
      <!-- 所有的二级分类 -->
      <div class="sub-list">
        <h3>全部分类</h3>
        <ul>
          <li v-for="item in topCategory.children" :key="item.id">
            <RouterLink :to="`/category/sub/${item.id}`">
              <img :src="item.picture" />
              <p>{{ item.name }}</p>
            </RouterLink>
          </li>
        </ul>
      </div>
      <!-- 各个分类推荐商品 -->
      <div v-for="item in subList" :key="item.id" class="ref-goods">
        <div class="head">
          <h3>- {{ item.name }} -</h3>
          <XtxMore :to="`/category/sub/${item.id}`" />
        </div>
        <div class="body">
          <category-goods-item v-for="ware in item.goods" :key="ware.id" :ware="ware" />
        </div>
      </div>
    </div>
    ``
  </div>
</template>

<script>
import { computed, ref, watch, getCurrentInstance } from "vue"
import { useRoute } from "vue-router"
import categoryApi from "@/api/category"
import CategoryBanner from "./components/category-banner"
import CategoryGoodsItem from "./components/category-goods-item"

export default {
  name: "CategoryIndex",
  components: {
    CategoryBanner,
    CategoryGoodsItem,
  },
  setup() {
    const { proxy } = getCurrentInstance()
    const routes = useRoute()
    const category = proxy.$store.useState("category", {
      list: (state) => state.list?.result,
    })
    // 获取当前分类的所有二级分类
    const topCategory = computed(() => {
      console.log(category.list)
      return category.list.value.find((item) => {
        return item.id === routes.params.id
      })
    })
    // 获取当前分类所有二级分类的推荐商品
    const subCategoryInfo = ref([])
    const getSubCategoryInfo = () => {
      categoryApi._findTopCategory(routes.params.id).then((data) => {
        subCategoryInfo.value = data.result.children
      })
    }
    watch(
      () => routes.params.id,
      (newVal) => {
        // 判断: 在顶级类目下，且最新变化的值必须不为空，发送请求
        if (newVal && `/category/${newVal}` === routes.path) {
          getSubCategoryInfo()
        }
      },
      {
        immediate: true,
      },
    )
    return {
      topCategory,
      subList: subCategoryInfo,
      routes,
    }
  },
}
</script>

<style lang="less" scoped>
.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }
  .breadcrumb {
    height: 40px;
    line-height: 40px;
  }
  .sub-list {
    margin-top: 20px;
    background-color: #fff;
    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;
      li {
        width: 168px;
        height: 160px;
        a {
          text-align: center;
          display: block;
          font-size: 16px;
          img {
            width: 100px;
            height: 100px;
          }
          p {
            line-height: 40px;
          }
          &:hover {
            color: @xtxColor;
          }
        }
      }
    }
  }
  .ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;
    .head {
      .xtx-more {
        position: absolute;
        top: 20px;
        right: 20px;
      }
    }
    .body {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      padding: 0 65px 30px;
    }
  }
}
</style>
