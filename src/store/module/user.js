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
		}
	},
	getters: {},
	mutations: {
		setUser(state, payload) {
			for (let key of Object.keys(state.profile)) {
				state.profile[key] = payload[key] ?? ''
			}
		},
	},
	actions: {},
}

export default UserModule
