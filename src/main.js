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

// svg 图标
import 'virtual:svg-icons-register'
import SvgIcon from '@/components/SvgIcon'

import './mock/index.js'
;(async () => {
	const app = createApp(App)

	await getComponent(app)

	app.use(router)
	app.use(store)
	app.use(Directive)
	app.component('svg-icon', SvgIcon)

	app.mount('#app')
})()
