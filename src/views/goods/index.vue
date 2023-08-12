<template>
  <div v-if="goods" class="goods-index">
    <div class="container">
      <!-- 面包屑 -->
      <a-breadcrumb separator=">" class="breadcrumb">
        <a-breadcrumb-item>首页</a-breadcrumb-item>
        <a-breadcrumb-item>
          <RouterLink :to="'/category/' + goods.categories[0].id">
            {{ goods.categories[0].name }}
          </RouterLink>
        </a-breadcrumb-item>
        <a-breadcrumb-item>
          <RouterLink :to="'/category/sub/' + goods.categories[1].id">
            {{ goods.categories[1].name }}
          </RouterLink>
        </a-breadcrumb-item>
        <a-breadcrumb-item>{{ goods.name }}</a-breadcrumb-item>
      </a-breadcrumb>
      <!-- 商品信息 -->
      <div class="goods-info">
        <div class="media">
          <goods-image :images="goods.mainPictures"></goods-image>
          <goods-sale />
        </div>
        <div class="spec">
          <a-space direction="vertical">
            <!-- 商品名称，配送信息 -->
            <goods-name :goods="goods" />
            <!-- 商品规格 -->
            <goods-sku :goods="goods" @amend="amendSKU" />
            <!-- 数量选择组件 -->
            <goods-numbox :model-value="buySet" />
            <!-- 购买按钮 -->
            <XtxButton v-model:disabled="checkBtn" type="primary" @click="addCart()">
              加入购物车
            </XtxButton>
          </a-space>
        </div>
      </div>
      <!-- 商品推荐 -->
      <goods-relevant :goods-id="goods.id" />
      <!-- 商品详情 -->
      <div class="goods-footer">
        <div class="goods-article">
          <!-- 商品+评价 -->
          <goods-tabs :goods="goods" />
          <!-- 注意事项 -->
          <goods-warn />
        </div>
        <!-- 热榜+专题推荐 -->
        <aside>
          <goods-hot-item :id="goods.id" :type="1" />
          <goods-hot-item :id="goods.id" :type="2" />
          <goods-hot-item :id="goods.id" :type="3" />
        </aside>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from "vue-router"
import { message } from "ant-design-vue"
import { ref, reactive, provide, computed } from "vue"
import { useGoods } from "."
import GoodsRelevant from "./components/goods-relevant"
import GoodsImage from "./components/goods-image"
import GoodsSale from "./components/goods-sales"
import GoodsName from "./components/goods-name"
import GoodsSku from "./components/goods-sku"
import GoodsNumbox from "./components/goods-numbox"
import GoodsTabs from "./components/goods-tabs"
import GoodsHotItem from "./components/goods-hot-item"
import GoodsWarn from "./components/goods-warn"
import "ant-design-vue/es/message/style/css"

import { useActions } from "@/hooks"

export default {
  name: "XtxGoodsPage",
  components: {
    GoodsNumbox,
    GoodsRelevant,
    GoodsImage,
    GoodsSale,
    GoodsName,
    GoodsSku,
    GoodsTabs,
    GoodsHotItem,
    GoodsWarn,
  },
  setup() {
    const route = useRoute()
    const goods = useGoods(route)
    const currentSKU = ref(null)
    const checkBtn = computed(() => !currentSKU.value)

    // 购买数量
    const buySet = reactive({
      currentVal: 1,
      min: 1,
      max: 1,
    })

    // 改变SKU
    const amendSKU = (sku) => {
      if (sku) {
        goods.value.price = sku.price
        goods.value.oldPrice = sku.oldPrice
        goods.value.inventory = sku.inventory
        currentSKU.value = sku
        buySet.max = goods.value.inventory
      } else {
        currentSKU.value = null
        buySet.max = 1
      }
    }

    // 添加购物车 (字段：skuId name attrsText picture price nowPrice selected count isEffective	)
    const storeCartActions = useActions("cart", ["addCart"])
    const addCart = () => {
      const isSKU = !!currentSKU.value
      if (isSKU) {
        const { id, name, mainPictures } = goods.value
        const { skuId, price, specsText, inventory } = currentSKU.value
        storeCartActions
          .addCart({
            id,
            name,
            picture: mainPictures[0],
            skuId,
            price,
            nowPrice: price,
            attrText: specsText,
            stock: inventory,
            count: buySet.currentVal,
            selected: true,
            isEffective: true,
          })
          .then(() => {
            message.success("加入购物车成功!")
          })
      } else {
        message.info("商品规格请选择完整!")
      }
    }

    // 父组件提供商品数据
    provide("goods", goods)

    return {
      goods,
      checkBtn,
      amendSKU,
      buySet,
      addCart,
      currentSKU,
    }
  },
}
</script>

<style lang="less" scoped>
.goods-index {
  .container {
    .breadcrumb {
      height: 40px;
      line-height: 40px;
    }
    .goods-info {
      min-height: 600px;
      background: #fff;
      display: flex;
      .media {
        width: 580px;
        height: 600px;
        padding: 30px 50px;
      }
      .spec {
        flex: 1;
        padding: 30px 30px 30px 0;
      }
    }
    .goods-footer {
      display: flex;
      margin-top: 20px;
      .goods-article {
        width: 940px;
        margin-right: 20px;
      }
      aside {
        width: 280px;
        min-height: 1000px;
      }
    }
  }
}
</style>
