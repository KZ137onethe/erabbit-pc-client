// 用户模块
import { useRouter } from "vue-router"
import { setToken, removeToken } from "@/utils/auth"

const router = useRouter()

const UserModule = {
  namespaced: true,
  state() {
    return {
      profile: {
        id: "",
        avatar: "",
        nickname: "",
        birthday: "",
        cityCode: "",
        gender: "",
        account: "",
        mobile: "",
        profession: "",
        provinceCode: "",
      },
      redirectUrl: "/",
    }
  },
  getters: {},
  mutations: {
    setUser(state, payload) {
      for (const key of Object.keys(state.profile)) {
        state.profile[key] = payload[key] ?? ""
      }
      if (payload.token) {
        setToken(payload.token)
      }
    },
    setRedirectUrl(state, url) {
      state.redirectUrl = url
    },
  },
  actions: {
    // 我们这里有很多种登录方式，所以不在这里写一个专门的异步方法
    // 退出登录
    logout({ rootState, commit }) {
      return new Promise((resolve) => {
        commit("setUser", {})
        removeToken()
        rootState.cart.list = []
        router.push("/login")
        resolve()
      })
    },
  },
}

export default UserModule
