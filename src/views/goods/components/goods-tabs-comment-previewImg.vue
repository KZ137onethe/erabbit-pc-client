<template>
  <!-- 预览地址：/product/1369155859933827074 -->
  <div class="goods-tabs-comment-previewImg">
    <a-row type="flex" :justify="start">
      <a-space>
        <a-col v-for="url in picture" :key="url" :wrap="false">
          <a-image
            :width="100"
            :height="100"
            :src="url"
          />
        </a-col>
      </a-space>
    </a-row>
  </div>
</template>

<script>
export default {
  props: {
    picture: {
      type: Array,
      default: () => ([])
    }
  },
  setup () {
    return {}
  }
}
</script>

<style lang="less" scoped>
.goods-tabs-comment-previewImg{
  .ant-row{
    .ant-col{
      .ant-image{
        img{
          object-fit:cover;
        }
      }
    }
  }
}
</style>
