// 用户模块
const UserModule = {
    namespaced: true,
    state () {
        return {
            profile: {
                id: '',
                avatar: '',
                nickname: '',
                account: '',
                mobile: '',
                token: ''
            }
        }
    },
    getters: {
    },
    mutations: {
        setUser (state, payload) {
            state.profile = payload
        }
    },
    actions: {
    }
}

export default UserModule
