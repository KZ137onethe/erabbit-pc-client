import axios from 'axios'
import store from '@/store'
import router from '@/router'

const baseURL = 'http://pcapi-xiaotuxian-front-devtest.itheima.net/'
// const baseURL = 'https://apipc-xiaotuxian-front.itheima.net/'
const instance = axios.create({
    baseURL,
    timeout: 5000
})

// * 请求拦截器
instance.interceptors.request.use(config => {
    // 如果有token就在头部携带，如果没有token就设置token
    const { profile } = store.state.user
    if (profile.token) {
        config.headers.Authorization = `Baarer ${profile.token}`
    }
    return config
}, error => {
    // 对请求错误做些什么
    return Promise.reject(error)
})

// * 响应拦截器
instance.interceptors.response.use(res => res.data, error => {
    // * 401 状态码，进入该函数
    if (error.response && error.response.status === 401) {
        // * 1. 清空无效用户的信息    2. 跳转到登录页码   3. 跳转需要传参（当前路由地址）给登录页码
        store.commit('user/setUser', {})
        // * 获得当前路由地址
        // encodeURIComponent 路径转换URL编码，防止解析地址出问题 currentRoute为ref响应式
        const fullPath = encodeURIComponent(router.currentRoute.value.fullPath)
        router.push('/login?redirectUrl=' + fullPath)
    }
    return Promise.reject(error)
})

// * 请求工具函数
const request = (url, method, submitData) => {
    // * 负责发请求
    return instance({
        url,
        method,
        // ? get请求（需要使用 params 来传递submitData）
        // ? 非get请求（需要使用 data 来传递submitData）
        [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
    })
}

export {
    baseURL,
    request
}
