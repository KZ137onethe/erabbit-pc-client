import { ref } from "vue"
import { useIntersectionObserver } from "@vueuse/core"

/**
 * 数据懒加载函数
 * @param {Function} ApiFn - api函数
 * @returns { Object }  target - 操作的DOM对象 , res - api获取的数据
 */
const useLazyData = (ApiFn) => {
  const target = ref(null)
  const res = ref([])
  // stop 停止观察
  const { stop } = useIntersectionObserver(
    // 被观察的DOM对象
    target,
    // isIntersecting 判断DOM对象是否进入可视区内
    ([{ isIntersecting }], _observerElement) => {
      if (isIntersecting) {
        stop()
        // 通过API函数获取数据
        ApiFn().then((data) => {
          res.value = data.result
        })
      }
    },
    {
      threshold: 0,
    },
  )
  return {
    target,
    res,
  }
}

export { useLazyData }
