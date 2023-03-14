import { topCategory, _findAllCategory } from '@/api'

// * 分类模块
const categoryModule = {
    namespaced: true,
    state () {
        return {
            // 分类数据
            list: topCategory.map(item => ({ name: item }))
        }
    },
    mutations: {
        setList (state, payload) {
            state.list = payload
        },
        // 控制二级分类的显示show和隐藏hide
        show (state, id) {
            const subCategory = state.list.result.find(item => item.id === id)
            subCategory.open = true
        },
        hide (state, id) {
            const subCategory = state.list.result.find(item => item.id === id)
            subCategory.open = false
        }
    },
    actions: {
        getList (state) {
            // ? 1.获取数据 2.修改数据
            _findAllCategory().then((data) => {
                // console.log(data)
                data.result.forEach(top => {
                    top.open = false
                })
                state.commit('setList', data)
            })
        }
    }
}

export default categoryModule
