import { createRouter, createWebHashHistory } from 'vue-router'
import store from '@/store'

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
			{ path: '/product/:id', component: () => import('@/views/goods/index.vue') },
			{ path: '/cart', component: () => import('@/views/cart/index.vue') },
			{ path: '/member/checkout', component: () => import('@/views/member/pay/checkout.vue') },
			{ path: '/member/pay', component: () => import('@/views/member/pay/index.vue') },
			{ path: '/pay/callback', component: () => import('@/views/member/pay/callback.vue') },
		],
	},
	{
		path: '/login',
		component: () => import('@/views/login/index.vue'),
	},
	{
		path: '/login/callback',
		component: () => import('@/views/login/callback.vue'),
	},
	{
		path: '/register',
		component: () => import('@/views/login/register.vue'),
	},
]

const router = createRouter({
	history: createWebHashHistory(),
	routes,
	// 切换路由时，回到页面顶部
	scrollBehavior(to, from, savedPosition) {
		// 始终滚动到顶部
		return { left: 0, top: 0 }
	},
})

router.beforeEach((to, from, next) => {
	const isLogin = store.getters['user/isLogin']
	// 跳转去一个 /member 的地址，且未登录
	if (to.path.startsWith('/member') && isLogin === false) {
		next({ path: '/login', query: { redirectUrl: to.fullPath } })
	} else {
		next()
	}
})

export default router
