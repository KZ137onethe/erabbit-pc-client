<template>
  <div class="sub">
    <div class="container">
      <!-- 面包屑 -->
      <sub-bread />
      <!-- 筛选区 -->
      <sub-filter @filterChange="filterChange" />
      <div class="goods-list">
        <!-- 排序组件 -->
        <sub-sort @sortChange="sortChange" />
        <!-- 列表 -->
        <ul>
          <li v-for="item in goodList" :key="item.id">
            <categoryGoodsItem :ware="item" />
          </li>
        </ul>
        <!-- 加载组件 -->
        <XtxInfiniteLoading :loading="loading" :finished="finished" @infinite="getGoodsData" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, watch } from "vue"
import { useRoute } from "vue-router"
import categoryApi from "@/api/category"
import SubBread from "./components/sub-bread"
import SubFilter from "./components/sub-filter"
import SubSort from "./components/sub-sort"
import categoryGoodsItem from "./components/category-goods-item"

export default {
  name: "SubCategory",
  components: {
    SubBread,
    SubFilter,
    SubSort,
    categoryGoodsItem,
  },
  setup() {
    const route = useRoute()
    const loading = ref(null)
    const finished = ref(null)
    // 商品数据
    const goodList = ref([])
    // 查询参数
    const queryParams = reactive({
      categoryId: route.params.id,
      page: 1,
      pageSize: 20,
    })
    // 数据，状态，参数初始化
    const initial = () => {
      queryParams.page = 1
      goodList.value = []
      finished.value = false
      loading.value = false
    }
    const getGoodsData = () => {
      loading.value = true
      categoryApi._findSubCategoryGoods(queryParams).then(({ result }) => {
        // 如果请求到的数据不为空数组，则将数组push到商品列表中
        if (result.items.length > 0) {
          goodList.value.push(...result.items)
          ++queryParams.page
        } else {
          // 空数组代表请求数据已经全部获取
          finished.value = true
        }
        // 请求完毕
        loading.value = false
      })
    }

    // 排序组件排序改变
    const sortChange = (sortParams) => {
      // 初始化
      initial()
      Object.keys(sortParams).forEach((param) => {
        queryParams[param] = sortParams[param]
      })
    }

    // 筛选组件的筛选条件改变
    const filterChange = (filterParams) => {
      // 初始化
      initial()
      Object.keys(filterParams).forEach((param) => {
        queryParams[param] = filterParams[param]
      })
    }
    // 切换二级分类，路由发生变化时
    watch(
      () => route.params.id,
      (newVal) => {
        // id 存在 且 为二级分类的id时
        if (newVal && route.path === `/category/sub/${newVal}`) {
          // 初始化
          initial()
          queryParams.categoryId = newVal
        }
      },
    )
    return {
      loading,
      finished,
      getGoodsData,
      sortChange,
      filterChange,
      goodList,
    }
  },
}
</script>

<style lang="less" scoped>
.goods-list {
  background: #fff;
  padding: 0 25px;
  margin-top: 25px;
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 5px;
    li {
      margin-right: 20px;
      margin-bottom: 20px;
      &:nth-child(5n) {
        margin-right: 0;
      }
    }
  }
}
</style>
