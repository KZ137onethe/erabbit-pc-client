import Big from 'big.js'
import { _getGoodsInfoNewest } from '@/api'
// 购物车模块
const CartModule = {
	namespaced: true,
	state() {
		return {
			list: [],
		}
	},
	getters: {
		// 有效商品列表(只有商品有库存，且为有效商品才校验通过)
		validateList(state) {
			return state.list.filter((item) => item.stock > 0 && item.isEffective)
		},
		// 有效商品数量
		validateTotal(state, getters) {
			return getters.validateList.reduce((pre, next) => {
				pre += next.count
				return pre
			}, 0)
		},
		// 有效商品的总价
		validateAmount(state, getters) {
			return getters.validateList.reduce((pre, next) => {
				const { nowPrice, count } = next
				try {
					let price = new Big(nowPrice)
					// console.log(pre, nowPrice, count)
					pre = price.mul(count).add(pre).valueOf()
					return Number(pre)
				} catch (e) {
					console.log(e)
				}
			}, 0)
		},
	},
	mutations: {
		// 添加购物车：查找购物车是否有相同商品
		// => 有, 删除本地的相同商品, 并将数量记录添加至payload, payload从数组头部插入
		// => 没有, 从数组头部插入
		insertCart(state, payload) {
			const sameIndex = state.list.findIndex((item) => item.skuId === payload.skuId)
			try {
				// 如果有相同商品
				if (sameIndex !== -1) {
					payload.count += state.list[sameIndex].count
					state.list.splice(sameIndex, 1)
				}
				// 没有相同商品
			} finally {
				state.list.unshift(payload)
			}
		},
		// 更新购物车
		updateCart(state, goods) {
			const updateGoods = state.list.find((item) => item.skuId === goods.skuId)
			for (const key in goods) {
				if (goods[key] ?? goods[key] !== '') {
					updateGoods[key] = goods[key]
				}
			}
		},
	},
	actions: {
		addCart({ rootState, commit }, payload) {
			const isLogin = Boolean(rootState.user.profile?.token)
			return new Promise((resolve, reject) => {
				if (isLogin) {
					// 巴拉巴拉~~
				} else {
					commit('insertCart', payload)
					resolve()
				}
			})
		},
		getCartList({ state, rootState, commit }) {
			const isLogin = Boolean(rootState.user.profile?.token)
			return new Promise((resolve, reject) => {
				if (isLogin) {
				} else {
					// 同时发送购物车的所有商品的更新请求
					const promiseArr = state.list.map((item) => {
						return _getGoodsInfoNewest(item.skuId)
					})
					Promise.all(promiseArr)
						.then((results) => {
							results.forEach((data, index) => {
								commit('updateCart', { ...data.result, skuId: state.list[index].skuId })
							})
							resolve()
						})
						.catch((e) => {
							reject(e)
						})
				}
			})
		},
	},
}

export default CartModule
