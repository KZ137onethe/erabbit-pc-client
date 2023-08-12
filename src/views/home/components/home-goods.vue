<template>
  <div class="home-goods">
    <RouterLink to="/">
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
    <div class="extra"></div>
  </div>
</template>

<script>
export default {
  name: "HomeGoods",
  // TODO:样式待优化和添加 extra
  props: {
    ware: {
      type: Object,
      default: () => ({}),
    },
  },
}
</script>

<style lang="less" scoped>
.home-goods {
  padding: 10px 30px;
  width: 240px;
  height: 300px;
  position: relative;
  &:hover {
    border: 1px solid @xtxColor;
  }
  .ant-card {
    border: none;
    &:deep(.ant-card-meta) {
      &-title {
        height: 44px;
        margin-top: 6px;
        margin-bottom: 0;
        font-size: 15px;
        .ellipsis-n(2);
        white-space: pre-wrap;
      }
      &-description {
        .ellipsis();
      }
    }
    .price {
      width: 100%;
      height: 40px;
      line-height: 40px;
      font-size: 24px;
      color: @priceColor;
    }
  }
  .extra {
    position: absolute;
    bottom: 0;
  }
}
</style>
