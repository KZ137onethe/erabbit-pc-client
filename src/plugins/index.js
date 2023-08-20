import directive from "./directive"
import store from "./store"
import cache from "./cache"

export default function installPlugins(app) {
  // store 操作
  app.config.globalProperties.$store = store
  // 缓存操作
  app.config.globalProperties.$cache = cache

  // 注册指令
  directive(app)
}
