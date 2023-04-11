// 用户模块

const UserModule = {
	namespaced: true,
	state() {
		return {
			profile: {
				id: '',
				avatar: '',
				nickname: '',
				birthday: '',
				cityCode: '',
				gender: '',
				account: '',
				mobile: '',
				token: '',
				profession: '',
				provinceCode: '',
			},
			redirectUrl: '/',
		}
	},
	getters: {
		// 用户是否登录
		isLogin(state) {
			return Boolean(state.profile.token)
		},
	},
	mutations: {
		setUser(state, payload) {
			for (let key of Object.keys(state.profile)) {
				state.profile[key] = payload[key] ?? ''
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
			commit('setUser', {})
			rootState.cart.list = []
		},
	},
}

export default UserModule
