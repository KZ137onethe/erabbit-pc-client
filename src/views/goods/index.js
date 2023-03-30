import { _findGoodsDetail } from '@/api'
import { ref, watch, nextTick } from 'vue'
const goods = ref(null)

// 获取商品详情
export const useGoods = (route) => {
	watch(
		() => route.params.id,
		(newVal) => {
			if (newVal && `/product/${newVal}` === route.path) {
				_findGoodsDetail(route.params.id).then((data) => {
					// 让商品数据为null让后使用v-if的组件可以重新销毁和创建
					goods.value = null
					nextTick(() => {
						goods.value = data.result
						// console.log('goods: ', goods.value)
					})
				})
			}
		},
		{ immediate: true }
	)
	return goods
}
