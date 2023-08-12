<template>
  <div class="goods-relevant">
    <!-- 头部 -->
    <header>
      <i class="icon"></i>
      <span>同类商品推荐</span>
    </header>
    <!-- 轮播图 -->
    <swiper
      class="swiper"
      :modules="modules"
      :slides-per-view="4"
      :slides-per-group="4"
      :loop="true"
      :autoplay="{
        delay: 3000,
        disableOnInteraction: false,
      }"
      :loop-fill-group-with-blank="true"
      :navigation="true"
      :pagination="{ clickable: true }"
    >
      <swiper-slide v-for="item in data" :key="item.id" :title="item.name">
        <a-card type="inner" :body-style="{ border: 'none', padding: 0, margin: 0 }">
          <template #cover>
            <img v-lazy="item.picture" alt="example" />
          </template>
          <a-card-meta>
            <template #title>{{ item.name }}</template>
          </a-card-meta>
          <div class="price">&yen;{{ item.price }}</div>
        </a-card>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { ref, defineComponent } from "vue"
import { Autoplay, Pagination, Navigation } from "swiper"
import { Swiper, SwiperSlide } from "swiper/vue"
import { productApi } from "@/api"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"

const { _findGoodsRelevant } = productApi
export default defineComponent({
  // url: import.meta.url,
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    goodsId: {
      type: String || Number,
      required: true,
    },
  },
  setup(props) {
    const data = ref([])

    _findGoodsRelevant({ id: props.goodsId, limit: 16 }).then((res) => {
      data.value = res.result
    })

    return {
      data,
      modules: [Autoplay, Pagination, Navigation],
    }
  },
})
</script>

<style lang="less" scoped>
.goods-relevant {
  background: #fff;
  min-height: 410px;
  margin-top: 20px;
  header {
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
    span {
      font-size: 20px;
      padding-left: 10px;
    }
  }
}

.swiper {
  :deep(.swiper-wrapper) {
    width: 100%;
    height: 300px;
  }

  :deep(.swiper-slide) {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;
    color: rgba(#24292f, 0.72);
  }
}

.ant-card {
  border: none;
  .ant-card-cover {
    img {
      padding: 20px;
      width: 230px !important;
      height: 230px !important;
    }
  }
  .ant-card-meta {
    width: 230px;
    :deep(.ant-card-meta-title) {
      text-align: center;
      font-size: 16px;
      color: #666;
    }
  }

  .price {
    font-size: 16px;
    color: @priceColor;
    text-align: center;
  }
}
</style>
