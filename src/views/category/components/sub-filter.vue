<template>
  <div v-if="filterData && !isLoading" class="sub-filter">
    <div class="item">
      <header>品牌：</header>
      <a-row type="flex" justify="start" align="middle" :wrap="true">
        <a-col v-for="item in filterData.brands" :key="item.id">
          <a
            href="javascript:;"
            :class="{ active: onlySelected(item.id, filterData.brandSelected) }"
            :title="item.name"
            @click="brandSelected(item.id)"
          >
            {{ item.name }}
          </a>
        </a-col>
      </a-row>
    </div>
    <div v-for="item in filterData.saleProperties" :key="item.id" class="item">
      <header>{{ item.name }}:</header>
      <a-row type="flex" justify="start" align="middle" :wrap="true">
        <a-col v-for="prop in item.properties" :key="prop.id">
          <a
            href="javascript:;"
            :class="{ active: onlySelected(prop.id, item.selected) }"
            :title="prop.name"
            @click="attrSelected(item, prop.id)"
          >
            {{ prop.name }}
          </a>
        </a-col>
      </a-row>
    </div>
  </div>
  <!-- 骨架屏 -->
  <div v-else class="sub-filter">
    <XtxSkeleton class="item" width="800px" height="40px" />
    <XtxSkeleton class="item" width="800px" height="40px" />
    <XtxSkeleton class="item" width="600px" height="40px" />
    <XtxSkeleton class="item" width="600px" height="40px" />
    <XtxSkeleton class="item" width="600px" height="40px" />
  </div>
</template>

<script>
import { ref, reactive, watch } from "vue"
import { useRoute } from "vue-router"
import { categoryApi } from "@/api"

const { _findSubCategoryFilter } = categoryApi
export default {
  name: "SubFilter",
  setup(props, { emit }) {
    const route = useRoute()
    // 加载状态
    const isLoading = ref(false)
    const toggleLoadStatus = () => (isLoading.value = !isLoading.value)
    // 一组中全部的属性
    const allInClass = reactive({ id: 0, name: "全部" })
    const onlySelected = (id, selectedStatus) => {
      return selectedStatus === id
    }
    // 监听二级类目下的ID变化并获取数据
    const filterData = ref(null)
    watch(
      () => route.params.id,
      (newVal) => {
        // 变化后的ID是有值的 且 处于二级类目的路由下
        if (newVal && `/category/sub/${newVal}` === route.path) {
          toggleLoadStatus()
          // 发请求获取数据
          _findSubCategoryFilter(newVal).then((data) => {
            data.result.brands.unshift(allInClass)
            data.result.brandSelected = allInClass.id
            data.result.saleProperties.forEach((item) => {
              item.selected = allInClass.id
              item.properties.unshift(allInClass)
            })
            filterData.value = data.result
            toggleLoadStatus()
          })
        }
      },
      {
        immediate: true,
      },
    )

    // 获取筛选参数
    const getFilterParams = () => {
      const filterParams = reactive({
        brandId: null,
        attrs: [],
      })
      filterParams.brandId = filterData.value.brandSelected
      filterData.value.saleProperties.forEach((sale) => {
        const attr = sale.properties.find((item) => item.id === sale.selected)
        if (attr) {
          filterParams.attrs.push({ groupName: sale.name, propertyName: attr.name })
        }
      })
      return filterParams
    }
    // 品牌被选中
    const brandSelected = (id) => {
      if (filterData.value.brandSelected === id) return
      filterData.value.brandSelected = id
      emit("filterChange", getFilterParams())
    }
    // 商品属性被选中
    const attrSelected = (goodsAttr, id) => {
      if (goodsAttr.selected === id) return
      goodsAttr.selected = id
      emit("filterChange", getFilterParams())
    }

    return {
      filterData,
      onlySelected,
      isLoading,
      brandSelected,
      attrSelected,
    }
  },
}
</script>

<style lang="less" scoped>
.sub-filter {
  background: #fff;
  padding: 25px;
  .item {
    display: flex;
    line-height: 40px;
    header {
      display: inline-block;
      width: 80px;
    }
    .ant-row {
      flex: 1;
      .ant-col {
        text-align: center;
        height: 40px;
        max-width: 112px;
        margin: 0 15px;
        a {
          display: inline-block;
          max-width: 112px;
          .ellipsis();
          &.active,
          &:hover {
            color: @xtxColor;
          }
        }
      }
    }
  }
  .xtx-skeleton {
    padding: 10px 0;
  }
}
</style>
