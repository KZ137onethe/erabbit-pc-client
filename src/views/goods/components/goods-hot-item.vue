<template>
  <div class="goods-hot-item">
    <header>{{ title }}</header>
    <template v-for="item in hotData" :key="item.id">
      <a-card type="inner" :body-style="{ border: 'none', padding: 0, margin: 0 }">
        <template #cover>
          <img v-lazy="item.picture" alt="example" />
        </template>
        <a-card-meta>
          <template #title>{{ item.name }}</template>
          <template #description>{{ item.desc }}</template>
        </a-card-meta>
        <div class="price">¥{{ item.price }}</div>
      </a-card>
    </template>
  </div>
</template>

<script>
import { computed, ref } from "vue"
import productApi from "@/api/product"

export default {
  props: {
    type: {
      type: Number,
      required: true,
    },
    limit: {
      type: Number,
      default: 3,
    },
    id: { type: String },
  },
  setup(props) {
    // 标题
    const titleObj = { 1: "24小时热销榜", 2: "周热销榜", 3: "总榜" }
    const title = computed(() => titleObj[props.type])
    // 热销榜数据
    const hotData = ref([])
    productApi
      ._findGoodsHot({ id: props.id, type: props.type, limit: props.limit })
      .then((data) => {
        hotData.value = data.result.map((item) => item)
      })
    return {
      title,
      hotData,
    }
  },
}
</script>

<style lang="less" scoped>
.goods-hot-item {
  > header {
    height: 70px;
    line-height: 70px;
    font-size: 18px;
    color: white;
    background-color: @helpColor;
    padding-left: 25px;
  }
  .ant-card {
    border: none;
    margin-top: 10px;
    padding: 20px 20px 20px 30px;
    width: 100%;
    height: 100%;
    &:deep(.ant-card-cover) {
      display: flex;
      justify-content: center;
      img {
        width: 200px;
        height: 200px;
      }
    }
    &:deep(.ant-card-meta-title) {
      padding-top: 10px;
      font-size: 16px;
      color: var(--xtx-font-color-1);
      text-align: center;
      .ellipsis();
    }
    &:deep(.ant-card-meta-description) {
      padding-bottom: 10px;
      font-size: 14px;
      color: var(--xtx-font-color-2);
      text-align: center;
      .ellipsis();
    }
    .price {
      font-size: 16px;
      color: @priceColor;
      text-align: center;
    }
  }
}
</style>
