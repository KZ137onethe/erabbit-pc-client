<template>
  <div ref="navElement" class="app-header-nav">
    <!-- 导航栏 -->
    <a-row type="flex" justify="space-around" align="middle" :wrap="false">
      <a-col :flex="1" :min-width="60"><RouterLink to="/">首页</RouterLink></a-col>
      <a-col v-for="item in categoryList.result" :key="item.id" :flex="1">
        <!-- 浮层 -->
        <a-popover
          v-model:visible="item.open"
          placement="bottom"
          class="nav-popover"
          trigger="hover"
        >
          <template #content>
            <div v-if="layerShow" class="layer">
              <a-row class="nav-popover--wrapper" align="middle" :gutter="30" :wrap="false">
                <a-col v-for="sub in item.children" :key="sub.id">
                  <RouterLink
                    :to="`/category/sub/${sub.id}`"
                    :title="sub.name"
                    @click="hideSubCategory(item.id)"
                  >
                    <img :src="sub.picture" alt="" />
                    <p class="ellipsis">{{ sub.name }}</p>
                  </RouterLink>
                </a-col>
              </a-row>
            </div>
          </template>
          <RouterLink :to="`/category/${item.id}`" @click="hideSubCategory(item.id)">
            <span>
              {{ item.name }}
            </span>
          </RouterLink>
        </a-popover>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { getCurrentInstance } from "vue"

export default {
  name: "AppHeaderNav",
  props: {
    layerShow: {
      type: Boolean,
      default: true,
    },
  },
  setup() {
    const { proxy } = getCurrentInstance()
    const { categoryList } = proxy.$store.useState("category", {
      categoryList: (state) => state.list,
    })
    /**
     * ? 1.鼠标进入一级分类展示对应的二级分类弹窗
     * ? 2.点击一级分类，二级分类，隐藏二级分类弹窗
     * ? 3.离开一级分类，二级分类，隐藏二级分类弹窗
     */
    const { showSubCategory, hideSubCategory } = proxy.$store.useMutations("category", {
      showSubCategory: "show",
      hideSubCategory: "hide",
    })

    return {
      categoryList,
      showSubCategory,
      hideSubCategory,
    }
  },
}
</script>

<style lang="less" scoped>
.app-header-nav {
  width: 820px;
  // padding-left: 40px;
  position: relative;
  z-index: 998;
  .ant-row {
    height: 100%;
    .ant-col {
      > a {
        display: inline-block;
        width: 100%;
        height: 32px;
        line-height: 32px;
        font-size: 16px;
        text-align: center;
        span {
          display: inline-block;
          height: 100%;
          &:hover {
            color: @xtxColor;
            border-bottom: 1px solid @xtxColor;
          }
        }
      }
    }
  }
}
.nav-popover {
  width: 1240px;
  height: 132px;
}
.layer {
  max-width: 1240px;
  min-width: 800px;
  margin: 0 10px;
  :deep(.nav-popover--wrapper) {
    width: 100%;
    .ant-col {
      img {
        width: 60px;
        height: 60px;
      }
      p {
        padding-top: 10px;
        display: block;
        width: 60px;
        text-align: center;
      }
      &:hover {
        p {
          color: @xtxColor;
        }
      }
    }
  }
}
</style>
