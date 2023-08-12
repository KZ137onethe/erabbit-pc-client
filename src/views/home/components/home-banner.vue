<template>
  <swiper
    :space-between="30"
    :centered-slides="true"
    :loop="true"
    :autoplay="{
      delay: 5000,
      disableOnInteraction: false,
    }"
    :pagination="customPagination"
    :navigation="true"
    :modules="modules"
    class="home-banner"
    @autoplayTimeLeft="onAutoplayTimeLeft"
  >
    <swiper-slide v-for="banner in banners" :key="banner.id">
      <RouterLink to="/">
        <img :src="banner.imgUrl" alt="" />
      </RouterLink>
    </swiper-slide>
    <template #container-end>
      <div class="autoplay-progress">
        <svg ref="progressCircle" viewBox="0 0 48 48">
          <circle cx="24" cy="24" r="20"></circle>
        </svg>
        <span ref="progressContent"></span>
      </div>
    </template>
  </swiper>
</template>
<script>
import { ref } from "vue"

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
// import required modules
import { Autoplay, Pagination, Navigation } from "swiper"
import { homeApi } from "@/api"

const { _findBanner } = homeApi
export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    const progressCircle = ref(null)
    const progressContent = ref(null)
    const onAutoplayTimeLeft = (s, time, progress) => {
      progressCircle.value.style.setProperty("--progress", 1 - progress)
      progressContent.value.textContent = `${Math.ceil(time / 1000)}s`
    }
    const customPagination = {
      clickable: true,
      renderBullet(index, className) {
        return `<span class="${className}"></span>`
      },
    }
    const banners = ref([])
    _findBanner().then((data) => {
      banners.value = data.result
    })
    return {
      onAutoplayTimeLeft,
      progressCircle,
      progressContent,
      customPagination,
      modules: [Autoplay, Pagination, Navigation],
      banners,
    }
  },
}
</script>

<style lang="less" scoped>
.swiper {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.autoplay-progress {
  position: absolute;
  right: 16px;
  bottom: 16px;
  z-index: 10;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: @xtxColor;
  svg {
    --progress: 0;
    position: absolute;
    left: 0;
    top: 0px;
    z-index: 10;
    width: 100%;
    height: 100%;
    stroke-width: 4px;
    stroke: @xtxColor;
    fill: none;
    stroke-dashoffset: calc(125.6 * (1 - var(--progress)));
    stroke-dasharray: 125.6;
    transform: rotate(-90deg);
  }
}

:deep(.swiper-pagination-bullet) {
  box-sizing: content-box;
  width: 12px;
  height: 12px;
  top: 50%;
  transform: translateY(50%);
  opacity: 1;
  background: rgba(0, 0, 0, 0.2);
  &-active {
    border: 3px solid @xtxColor;
    background-color: #fff;
    border-radius: 100%;
  }
}
:deep(.swiper-button) {
  &-prev {
    color: @xtxColor;
    left: 260px;
  }
  &-next {
    color: @xtxColor;
  }
}
</style>
