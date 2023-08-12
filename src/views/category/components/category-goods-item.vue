<template>
  <div class="category-goods">
    <RouterLink :to="`/product/${ware.id}`">
      <a-card type="inner" :body-style="{ border: 'none', padding: 0, margin: 0 }">
        <template #cover>
          <img v-lazy="ware.picture" alt="example" />
        </template>
        <a-card-meta>
          <template #title>{{ ware.name }}</template>
          <template #description>{{ ware.desc }}</template>
        </a-card-meta>
        <div class="price">¥{{ ware.price }}</div>
      </a-card>
    </RouterLink>
  </div>
</template>

<script>
export default {
  name: "CategoryGoodsItem",
  props: {
    ware: {
      type: Object,
      default: () => ({}),
    },
  },
}
</script>

<style lang="less" scoped>
.category-goods {
  padding: 10px 30px;
  width: 220px;
  height: 300px;
  position: relative;
  &:hover {
    .hoverShadow();
  }
  .ant-card {
    border: none;
    text-align: center;
    &:deep(.ant-card-meta) {
      &-title {
        height: 22px;
        margin-top: 10px;
        margin-bottom: 0;
        font-size: 15px;
        .ellipsis();
      }
      &-description {
        margin-top: 10px;
        .ellipsis();
      }
    }
    .price {
      margin-top: 10px;
      width: 100%;
      height: 28px;
      line-height: 28px;
      font-size: 20px;
      color: @priceColor;
    }
  }
}
</style>
