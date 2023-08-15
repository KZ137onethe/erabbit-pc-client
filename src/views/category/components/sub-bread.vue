<template>
  <div class="sub-bread">
    <a-breadcrumb separator=">" class="breadcrumb">
      <a-breadcrumb-item>首页</a-breadcrumb-item>
      <transition name="fade-right" mode="out-in">
        <a-breadcrumb-item v-if="categoryInfo.top" :key="categoryInfo.top.id">
          <RouterLink :key="categoryInfo.top.id" :to="`/category/${categoryInfo.top.id}`">
            {{ categoryInfo.top.name }}
          </RouterLink>
        </a-breadcrumb-item>
      </transition>
      <transition name="fade-right" mode="out-in">
        <a-breadcrumb-item v-if="categoryInfo.sub" :key="categoryInfo.sub.id">
          {{ categoryInfo.sub.name }}
        </a-breadcrumb-item>
      </transition>
    </a-breadcrumb>
  </div>
</template>

<script>
import { computed, getCurrentInstance } from "vue"
import { useRoute } from "vue-router"

export default {
  name: "SubBread",
  setup() {
    const { proxy } = getCurrentInstance()
    // 获取二级分类的ID
    const route = useRoute()
    // console.log(route.params.id, route.path)
    // 通过获取vuex的类目数据来得到二级分类的名称和ID，一级分类的名称和ID
    const category = proxy.$store.useState("category", {
      list: (state) => state.list?.result,
    })
    const categoryInfo = computed(() => {
      const info = {}
      category.list.value.forEach((top) => {
        if (top.children) {
          top.children.forEach((sub) => {
            if (sub.id === route.params.id) {
              info.top = { id: top.id, name: top.name }
              info.sub = { id: sub.id, name: sub.name }
            }
          })
        }
      })
      return info
    })
    return {
      route,
      categoryInfo,
    }
  },
}
</script>

<style lang="less" scoped>
.breadcrumb {
  height: 40px;
  line-height: 40px;
}
</style>
