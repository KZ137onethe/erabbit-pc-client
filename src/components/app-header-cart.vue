<template>
  <a-popover v-model:visible="visible" placement="bottomRight" class="app-header-cart">
    <!-- 主体的弹层 -->
    <template #content>
      <div class="layer">
        <div class="list">
          <div v-for="goods in validateList" :key="goods.skuId" class="item">
            <router-link :to="`/product/${goods.id}`" @click="hide()">
              <img :src="goods.picture" alt="" />
              <div class="center">
                <p class="name ellipsis-2">{{ goods.name }}</p>
                <p class="attr ellipsis">{{ goods.attrsText ?? goods.attrText }}</p>
              </div>
              <div class="right">
                <p class="price">&yen;{{ goods.nowPrice }}</p>
                <p class="count">{{ `${goods.count} 件` }}</p>
              </div>
            </router-link>
            <a-button type="link" :icon="h(DeleteOutlined)" @click="deleteGoods(goods)" />
          </div>
        </div>
        <div class="foot">
          <div class="total">
            <p>共 {{ validateTotal }} 件商品</p>
            <p>&yen;{{ validateAmount }}</p>
          </div>
          <XtxButton v-model:disabled="checkButton" type="primary" @click="$router.push('/cart')">
            去购物车结算
          </XtxButton>
        </div>
      </div>
    </template>
    <!-- 购物车图标按钮 -->
    <a-badge :count="validateTotal" class="cart-btn">
      <router-link to="/cart">
        <a-button type="dashed" shape="circle" :icon="h(ShoppingCartOutlined)" size="large" />
      </router-link>
    </a-badge>
  </a-popover>
</template>

<script>
import { ShoppingCartOutlined, DeleteOutlined } from "@ant-design/icons-vue"

import { h, ref, computed, onMounted, getCurrentInstance } from "vue"
import { useRouter } from "vue-router"
import { message } from "ant-design-vue"
import "ant-design-vue/es/message/style/css"

const router = useRouter()
export default {
  setup() {
    const { proxy } = getCurrentInstance()
    const { validateList, validateTotal, validateAmount } = proxy.$store.useGetters("cart", [
      "validateList",
      "validateTotal",
      "validateAmount",
    ])
    const { getCartList, removeCart } = proxy.$store.useActions("cart", [
      "getCartList",
      "removeCart",
    ])
    const visible = ref(false)
    const hide = () => {
      return (visible.value = false)
    }
    const checkButton = computed(() => !validateTotal.value.valueOf())
    const deleteGoods = (goods) => {
      // 这里处理购物车删除单个商品
      try {
        removeCart(goods).then(() => message.success("删除成功!"))
      } catch (e) {
        message.error("删除失败!")
        throw new Error(e)
      }
    }
    const toCartPage = () => router.push("/cart")
    onMounted(() => {
      if (validateTotal.value.valueOf()) {
        getCartList().then(() => message.success("更新本地购物车成功！"))
      }
    })

    return {
      h,
      validateList,
      validateTotal,
      validateAmount,
      visible,
      hide,
      checkButton,
      deleteGoods,
      toCartPage,
      ShoppingCartOutlined,
      DeleteOutlined,
    }
  },
}
</script>

<style lang="less" scoped>
.layer {
  width: 400px;
  height: 400px;
  .list {
    height: 340px;
    overflow: auto;
    // 滚动条的样式
    &::-webkit-scrollbar {
      width: 10px;
      height: 10px;
    }
    &::-webkit-scrollbar-track {
      background: #f8f8f8;
      border-radius: 2px;
    }
    &::-webkit-scrollbar-thumb {
      background: #eee;
      border-radius: 10px;
    }
    &::-webkit-scrollbar-thumb:hover {
      background: #ccc;
    }
    // 商品列表
    .item {
      border-bottom: 1px solid #f5f5f5;
      padding: 10px 0;
      position: relative;
      // 图标button
      > button.ant-btn {
        position: absolute;
        top: 50%;
        right: 5px;
        transform: translateY(-50%);
        color: #666;
      }
      // 商品
      a {
        display: flex;
        align-items: center;
        width: 100%;
        img {
          height: 80px;
          width: 80px;
        }
        .center {
          margin: 0 10px;
          width: 200px;
          > p {
            margin: 5px 0;
            &.name {
              font-size: 16px;
            }
            &.attr {
              color: #999;
              padding-top: 5px;
            }
          }
        }
        .right {
          margin-right: 20px;
          text-align: center;
          > p {
            margin: 5px 0;
            &.price {
              font-size: 16px;
              color: @priceColor;
            }
            &.count {
              color: #999;
              margin-top: 5px;
              font-size: 16px;
            }
          }
        }
      }
    }
  }
  .foot {
    position: absolute;
    left: 0;
    bottom: 0;
    height: 70px;
    width: 100%;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    background: #f8f8f8;
    align-items: center;
    .total {
      padding-left: 10px;
      color: #999;
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      align-items: center;
      p {
        display: block;
        margin: 0;
        &:last-child {
          font-size: 18px;
          color: @priceColor;
        }
      }
    }
  }
}
</style>
