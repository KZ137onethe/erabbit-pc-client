import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// vue的插件
import Directive from './utils/plugin'

// 重置样式的包
import 'normalize.css'
import '@/assets/styles/common.less'

// 导入全局注册的UI组件
import { getComponent } from '@/components/library/index.js'

// iconPark 字体图标库
import { install } from '@icon-park/vue-next/es/all'

;(async () => {
	const app = createApp(App)

	await getComponent(app)

	install(app, 'i')

	app.use(router)
	app.use(store)
	app.use(Directive)

	app.mount('#app')
})()
