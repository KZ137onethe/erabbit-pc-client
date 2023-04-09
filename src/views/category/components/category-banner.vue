<template>
	<swiper
		:spaceBetween="30"
		:centeredSlides="true"
		:loop="true"
		:autoplay="{
			delay: 5000,
			disableOnInteraction: false,
		}"
		:pagination="customPagination"
		:navigation="true"
		:modules="modules"
		class="category-banner"
	>
		<swiper-slide v-for="banner in banners" :key="banner.id">
			<RouterLink to="/">
				<img :src="banner.imgUrl" alt="" />
			</RouterLink>
		</swiper-slide>
	</swiper>
</template>
<script>
import { ref } from 'vue'
import { homeApi } from '@/api'
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper'

const { _findBanner } = homeApi
export default {
	components: {
		Swiper,
		SwiperSlide,
	},
	setup() {
		const progressCircle = ref(null)
		const progressContent = ref(null)
		const customPagination = {
			clickable: true,
			renderBullet: function (index, className) {
				return '<span class="' + className + '">' + '</span>'
			},
		}
		const banners = ref([])
		_findBanner().then((data) => {
			banners.value = data.result
		})
		return {
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
	height: 500px;
	position: relative;
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
	}
	&-next {
		color: @xtxColor;
	}
}
</style>
