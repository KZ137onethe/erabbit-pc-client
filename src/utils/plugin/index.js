// * vue的插件功能（在这里包括：vue的自定义指令）
// ? 全局注册组件在@/components/library/index.js 中
import defaultImg from "@/assets/images/defaultImg.png"

export default {
  install(app) {
    defineDirective(app)
  },
}

const defineDirective = (app) => {
  // * 图片懒加载指令
  // ? 先存储图片地址不能在src上，当图片进入可视区，将你存储的图片地址设置给图片元素即可
  app.directive("lazy", {
    // 生命周期 mounted() DOM已加载完毕
    mounted(el, binding) {
      // isIntersecting 判断是否进入可视区
      const observer = new IntersectionObserver(
        ([{ isIntersecting }]) => {
          if (isIntersecting) {
            // 进入可视区后停止监听
            observer.unobserve(el)
            // 将指令的值赋给图片的src属性
            el.src = binding.value
            // 图片加载失败时，显示默认的图片
            el.onerror = () => {
              el.src = defaultImg
            }
          }
        },
        {
          // DOM元素和可视区交叉的比例
          threshold: 0,
        },
      )
      // 监听元素
      observer.observe(el)
    },
  })
}
