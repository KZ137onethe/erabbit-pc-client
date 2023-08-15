import directive from "./directive"
import store from "./store"

export default function installPlugins(app) {
  // store 操作
  app.config.globalProperties.$store = store

  // 注册指令
  directive(app)
}
