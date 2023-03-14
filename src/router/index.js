import { createRouter, createWebHashHistory } from 'vue-router'

// * 路由规则
const routes = [
    // 一级路由布局容器
    {
        path: '/',
        component: () => import('@/views/Layout.vue'),
        children: [
            { path: '/', component: () => import('@/views/home/index.vue') },
            { path: '/category/:id', component: () => import('@/views/category/index.vue') },
            { path: '/category/sub/:id', component: () => import('@/views/category/sub.vue') },
            { path: '/product/:id', component: () => import('@/views/goods/index.vue') }
        ]
    },
    {
        path: '/login',
        component: () => import('@/views/login/index.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
    // 切换路由时，回到页面顶部
    scrollBehavior (to, from, savedPosition) {
        // 始终滚动到顶部
        return { left: 0, top: 0 }
    }
})

export default router
