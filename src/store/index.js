import { createStore } from "vuex"
import { createVuexPersistedState } from "vue-persistedstate"
import user from "./module/user"
import cart from "./module/cart"
import category from "./module/category"

// * vue2.0 创建仓库 new Vuex.Store({})
// * vue3.0 创建仓库 createStore({})
export default createStore({
  state() {
    return {
      web_home_page_router: "/",
    }
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    user,
    cart,
    category,
  },
  plugins: [
    createVuexPersistedState({
      key: "erabbit-pc-data",
      paths: ["user", "cart"],
    }),
  ],
})
