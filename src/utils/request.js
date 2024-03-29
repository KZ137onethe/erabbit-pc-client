import axios from "axios"
import { message } from "ant-design-vue"
import store from "@/store"
import router from "@/router"
import config from "@/config"
import { getToken, removeToken } from "./auth"

axios.defaults.headers["Content-Type"] = "application/json;charset=utf-8"
const service = axios.create({
  baseURL: config.BaseApi,
  timeout: 5000,
})

// * 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 是否设置token
    const isToken = (config.headers || {}).isToken === false
    if (!isToken) {
      config.headers.Authorization = `Bearer ${getToken()}`
    }
    return config
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error)
  },
)

// * 响应拦截器
service.interceptors.response.use(
  (res) => res.data,
  (error) => {
    console.log(`err${error}`)
    let { message: msg } = error
    if (msg === "Network Error") {
      msg = "后端接口连接异常"
    } else if (msg.includes("timeout")) {
      msg = "系统接口请求超时"
    } else if (msg.includes("Request failed with status code")) {
      msg = `系统接口${msg.substr(msg.length - 3)}异常`
    }
    if (error.response && error.response.status === 401) {
      /* 授权失败
       * 1. 清空无效用户的信息
       * 2. 重定向到登录页码
       */
      msg = "授权失败,请重新登录!"
      store.commit("user/setUser", {})
      removeToken()
      const fullPath = encodeURIComponent(router.currentRoute.value.fullPath)
      router.push(`/login?redirectUrl=${fullPath}`)
    }
    message.error(msg)
    return Promise.reject(error)
  },
)

function request(options, mock = false) {
  if (config.env === "production") {
    service.defaults.baseURL = config.BaseApi
  }
  // mock 开关打开
  else if (config.mock) {
    service.defaults.baseURL = mock ? config.MockApi : config.BaseApi
  }

  return service(options)
}

export default request
