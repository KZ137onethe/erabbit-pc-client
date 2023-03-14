<template>
  <div class="goods-relevant">
    <!-- 头部 -->
    <header>
      <i class="icon"></i>
      <span>同类商品推荐</span>
    </header>
    <!-- 轮播图 -->
    <RelevantGoodsBanner v-model:data="banners" :height="380" ></RelevantGoodsBanner>
  </div>
</template>

<script>
import RelevantGoodsBanner from '@/components/optional/relevant-goods-banner.vue'
import { _findGoodsRelevant } from '@/api'

import { ref } from 'vue'
export default {
  components: {
    RelevantGoodsBanner
  },
  props: ['goodsId'],
  setup (props) {
    const banners = getGoodRelevant(props.goodsId, 16)
    // console.log(banners.value)
    return {
      banners
    }
  }
}

// 获取同类商品推荐数据
const getGoodRelevant = (id, limit) => {
  const result = ref([])
  const size = 4
  _findGoodsRelevant({ id, limit }).then(data => {
    const total = Math.ceil(data.result.length / size)
    // 以每次size个数据按顺序push到data
    for (let index = 0; index < total; ++index) {
      result.value.push(data.result.slice(index * size, (index + 1) * size))
    }
  })
  return result
}
</script>

<style lang="less" scoped>
.goods-relevant{
  background: #fff;
  min-height: 460px;
  margin-top: 20px;
  header{
    height: 80px;
    line-height: 80px;
    padding: 0 20px;
    // 图标
    .icon {
      width: 16px;
      height: 16px;
      display: inline-block;
      border-top: 4px solid @xtxColor;
      border-right: 4px solid @xtxColor;
      box-sizing: border-box;
      position: relative;
      transform: rotate(45deg);
      &::before {
        content: "";
        width: 10px;
        height: 10px;
        position: absolute;
        left: 0;
        top: 2px;
        background: lighten(@xtxColor, 40%);
      }
    }
    span{
      font-size: 20px;
      padding-left: 10px;
    }
  }
}
</style>
