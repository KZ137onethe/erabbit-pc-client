import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"

// vue的插件
import plugins from "./plugins"

// 导入全局样式
import "normalize.css"
import "@/assets/styles/index.less"

// 导入全局注册的UI组件
import { getComponent } from "@/components/library/index.js"

// svg 图标
import "virtual:svg-icons-register"
import SvgIcon from "@/components/SvgIcon"

import "./mock/index.js"

async function startApp() {
  const app = createApp(App)

  await getComponent(app)

  app.use(router)
  app.use(store)
  app.use(plugins)
  app.component("SvgIcon", SvgIcon)

  app.mount("#app")
}

startApp()
