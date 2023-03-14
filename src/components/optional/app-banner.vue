<template>
    <div class="app-banner">
        <a-carousel autoplay arrows dotsClass="dotsStyle">
            <template #prevArrow>
                <div class="custom-slick-arrow" :style="{left: ArrowPosition.left, zIndex: 1}">
                    <LeftCircleOutlined />
                </div>
            </template>
            <template #nextArrow>
                <div class="custom-slick-arrow" :style="{right: ArrowPosition.right}">
                    <RightCircleOutlined />
                </div>
            </template>
            <slot name="banner"></slot>
        </a-carousel>
    </div>
</template>

<script>
// TODO: 优化轮播图组件
import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons-vue'
export default {
  components: {
    LeftCircleOutlined,
    RightCircleOutlined
  },
  props: {
    // 是否有父元素
    ParentElement: {
      type: Boolean,
      default: false
    },
    // 样式：左右箭头的位置
    ArrowPosition: {
      type: Object,
      default: () => ({ left: 0, right: 0 })
    },
    // 样式：指示器的位置
    IndicatorPosition: {
      type: Object,
      default: () => ({ left: 0, right: 0 })
    }
  },
  setup (props) {
    /**
     * 1. 鼠标进入轮播图才显示左右箭头，鼠标离开轮播图不显示左右箭头
     * 2. 默认自动切换轮播图，鼠标进入后不再自动轮播，鼠标离开后再自动轮播
     */
  }
}
</script>

<style lang="less">
.ant-carousel {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
    .slick-slide {
        text-align: center;
        height: 500px;
        line-height: 500px;
        background: #364d79;
        overflow: hidden;
    }
    .slick-slider{
      .slick-arrow.custom-slick-arrow {
        width: 35px;
        height: 35px;
        font-size: 35px;
        color: #fff;
        background-color: rgba(31, 45, 61, 0.11);
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
}
</style>
