<template>
  <!-- 用来展示商品列表的轮播图 -->
  <div class="relevant-banner" :style="{height: height + 'px'}">
      <!-- 轮播图 -->
      <!-- autoplay -->
      <a-carousel arrows autoplay dotsClass="dotsStyle" >
          <div v-for="(goodsItem, index) in data" :key="index">
            <a-row type="flex" justify="space-around" align="middle">
              <a-col v-for="item in goodsItem" :key="item.id">
                <a-card type="inner" :bodyStyle="{border: 'none', padding: 0, margin: 0}">
                  <template #cover>
                      <img alt="example" v-lazy="item.picture"/>
                  </template>
                  <a-card-meta>
                      <template #title>{{ item.name }}</template>
                  </a-card-meta>
                  <div class="price">¥{{ item.price }}</div>
                </a-card>
              </a-col>
            </a-row>
          </div>
          <!-- 自定义左右箭头 -->
          <template #prevArrow>
              <div class="custom-slick-arrow" :style="{left: 10 + 'px'}">
                  <LeftCircleOutlined />
              </div>
          </template>
          <template #nextArrow>
              <div class="custom-slick-arrow" :style="{right: 10 + 'px'}">
                  <RightCircleOutlined />
              </div>
          </template>
          <!-- 自定义指示器 -->
          <template #customPaging></template>
      </a-carousel>
  </div>
</template>

<script>
// TODO: 优化轮播图组件
import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons-vue'
export default {
  props: {
    data: {
      type: Array,
      default: () => ([])
    },
    height: {
      type: Number,
      required: true
    }
  },
  setup (props) {
    /**
     * 1. 鼠标进入轮播图才显示左右箭头，鼠标离开轮播图不显示左右箭头
     * 2. 默认自动切换轮播图，鼠标进入后不再自动轮播，鼠标离开后再自动轮播
     */
  },
  components: {
    LeftCircleOutlined,
    RightCircleOutlined
  }
}
</script>

<style lang="less">
.ant-carousel {
  width: 1240px;
  height: inherit;
  // 左右箭头
  .slick-slider{
    .slick-arrow.custom-slick-arrow {
      width: 35px;
      height: 35px;
      font-size: 35px;
      color: var(--xtx-font-color-3);
      background-color: transparent;
      transform: translateY(-50%);
      opacity: 0.3;
      z-index: 1;
      &::before{
        content:''
      }
      &:hover{
        opacity: 0.5;
      }
      &.slick-next{
        right: 0
      }
    }
  }
  .slick-dots{
    height:  10px;
    li{
      display: inline-block;
      margin: 0 10px;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: gray;
      &.slick-active{
        width: 10px;
        background-color: @xtxColor;
      }
    }
  }
  // 主体的轮播图
  .ant-row{
    height: 350px;
    .ant-col{
      width: 240px;
      .ant-card{
        border: none;
        .ant-card-cover{
          img{
            padding: 20px;
            width: 230px!important;
            height: 230px!important;
          }
        }
        .ant-card-meta-title{
          font-size: 16px;
          color: #666;
          padding: 0 40px;
        }
        .price{
          font-size: 16px;
          color: @priceColor;
          text-align:center;
        }
      }
    }
  }
}
</style>
