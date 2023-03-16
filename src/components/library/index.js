// 注册全局自定义组件
// import XtxSkeleton from './xtx-skeleton.vue'
// import XtxMore from './xtx-more.vue'
// import XtxBread from './xtx-bread.vue'
// import XtxBreadItem from './xtx-bread-item.vue'

// * require.context() 是webpack提供的一个自动导入的API
// ? 批量自动注册组件
// const importFn = require.context('./', false, /\.vue$/)

import XtxSkeleton from './xtx-skeleton'
import XtxMore from './xtx-more'
import XtxBread from './xtx-bread'
import XtxBreadItem from './xtx-bread-item'
import XtxButton from './xtx-button'
import XtxCity from './xtx-city'
import XtxInfiniteLoading from './xtx-infinite-loading'
export default {
	install(app) {
		app.component(XtxSkeleton.name, XtxSkeleton)
		app.component(XtxMore.name, XtxMore)
		app.component(XtxBread.name, XtxBread)
		app.component(XtxBreadItem.name, XtxBreadItem)
		app.component(XtxButton.name, XtxButton)
		app.component(XtxCity.name, XtxCity)
		app.component(XtxInfiniteLoading.name, XtxInfiniteLoading)

		// 批量注册全局组件
		// importFn.keys().forEach(key => {
		//   // 自动导入组件
		//   const component = importFn(key).default
		//   // 注册组件
		//   app.component(component.name, component)
		// })
	},
}
