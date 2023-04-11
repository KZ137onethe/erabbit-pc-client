import Big from 'big.js'

import { cartApi } from '@/api'
const { _getGoodsInfoNewest, _mergeLocalCart, _getCartList, _addCart, _deleteCart, _modifyCart, _checkCartAllSelected } = cartApi

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
		// 无效商品列表
		invalidateList(state, getters) {
			return state.list.filter((item) => item.stock < 0 || !item.isEffective)
		},
		// 选中的商品列表
		selectedList(state, getters) {
			return getters.validateList.filter((item) => item.selected === true)
		},
		// 选中的商品件数
		selectedTotal(state, getters) {
			return getters.selectedList.reduce((pre, next) => {
				pre += next.count
				return pre
			}, 0)
		},
		// 选中商品的总价
		selectedAmount(state, getters) {
			return getters.selectedList.reduce((pre, next) => {
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
		// 是否全选
		isAllSelected(state, getters) {
			return getters.validateList.length && getters.validateList.length === getters.selectedList.length
		},
	},
	mutations: {
		// 插入商品到购物车：查找购物车是否有相同商品
		// => 有, 删除本地的相同商品, 并将数量记录添加至payload, payload从数组头部插入
		// => 没有, 从数组头部插入 或者是 指定位置插入
		insertCart(state, payload) {
			const goods = payload.next ?? payload
			const sameIndex = state.list.findIndex((item) => item.skuId === goods.skuId)
			try {
				// 如果有相同商品
				if (sameIndex !== -1) {
					goods.count += state.list[sameIndex].count
					state.list.splice(sameIndex, 1)
				}
				// 没有相同商品
			} finally {
				if (payload.preIndex !== undefined && payload.preIndex !== null) {
					state.list.splice(payload.preIndex, 0, goods)
				} else {
					state.list.unshift(goods)
				}
			}
		},
		// 更新购物车(通常单个购物车商品)
		updateCart(state, payload) {
			const updateGoods = state.list.find((item) => item.skuId === payload.skuId)
			for (const key in payload) {
				if (payload[key] !== 'undefined' && payload[key] !== 'null' && payload[key] !== 'null') {
					// 如果 key 在 所查找的 state.list 中存在（以防止所以修改）
					if (key in updateGoods) {
						updateGoods[key] = payload[key]
					}
				}
			}
		},
		// 修改购物车(通常是整个数组列表)
		setCart(state, payload) {
			state.list = payload
		},
		// 删除购物车的商品
		deleteCart(state, payload) {
			const deletePos = state.list.findIndex((item) => item.skuId === payload.skuId)
			state.list.splice(deletePos, 1)
		},
	},
	actions: {
		addCart({ rootGetters, commit }, payload) {
			return new Promise((resolve, reject) => {
				if (rootGetters.user.isLogin.value) {
					// 向服务端添加数据,在拉一遍获取购物车数据的请求,将本地数据替换
					_addCart({ skuId: payload.skuId, count: payload.count })
						.then(() => {
							return _getCartList()
						})
						.then((data) => {
							commit('setCart', data.result)
							resolve()
						})
				} else {
					commit('insertCart', payload)
					resolve()
				}
			})
		},
		getCartList({ state, commit, rootGetters }) {
			return new Promise((resolve, reject) => {
				if (rootGetters.user.isLogin.value) {
					// 登录后
					_getCartList().then((data) => {
						commit('setCart', data.result)
						resolve()
					})
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
		modifyCart({ rootGetters, commit }, payload) {
			return new Promise((resolve, reject) => {
				if (rootGetters.user.isLogin.value) {
					_modifyCart(payload)
						.then(() => {
							return _getCartList()
						})
						.then((data) => {
							commit('setCart', data.result)
							resolve()
						})
				} else {
					commit('updateCart', payload)
					resolve()
				}
			})
		},
		modifyAllCart({ state, rootGetters, commit }, payload) {
			payload = payload.selected ?? payload
			const dataSource = payload.dataSource ?? state.list
			return new Promise((resolve, reject) => {
				if (rootGetters.user.isLogin.value) {
					const ids = dataSource.map((item) => item.skuId)
					_checkCartAllSelected({ selected: payload, ids: ids })
						.then(() => {
							return _getCartList()
						})
						.then((data) => {
							commit('setCart', data.result)
							resolve()
						})
				} else {
					dataSource.forEach((item) => {
						commit('updateCart', { skuId: item.skuId, selected: payload })
					})
					resolve()
				}
			})
		},
		// 删除选中的购物车商品（单个）
		removeCart({ rootGetters, commit }, payload) {
			return new Promise((resolve, reject) => {
				if (rootGetters.user.isLogin.value) {
					_deleteCart([payload.skuId])
						.then(() => {
							return _getCartList()
						})
						.then((data) => {
							commit('setCart', data.result)
							resolve()
						})
				} else {
					commit('deleteCart', payload)
					resolve()
				}
			})
		},
		// 删除选中的购物车商品（批量）
		removeCartSelected({ getters, rootGetters, commit }, dataSource) {
			return new Promise((resolve, reject) => {
				if (rootGetters.user.isLogin.value) {
					const ids = dataSource.map((item) => item.skuId)
					_deleteCart(ids)
						.then(() => {
							return _getCartList()
						})
						.then((data) => {
							commit('setCart', data.result)
							resolve()
						})
				} else {
					dataSource.forEach((item) => {
						commit('deleteCart', item)
					})
					resolve()
				}
			})
		},
		updateCartGoodsSku({ state, rootGetters, commit }, payload) {
			const { newValue, old } = payload
			const pre = state.list.find((item) => item.skuId === old)
			const preIndex = state.list.indexOf(pre) !== -1 ? state.list.indexOf(pre) : undefined
			// 这里登录前后的 attrText 和 attrsText 两个字段不一致
			return new Promise((resolve, reject) => {
				if (rootGetters.user.isLogin.value) {
					const { skuId, price, inventory: stock, specsText: attrsText } = newValue
					const next = { ...pre, ...{ skuId, price, stock, attrsText } }
					_deleteCart([pre.skuId])
						.then(() => {
							return _addCart({ skuId: next.skuId, count: next.count })
						})
						.then(() => {
							return _getCartList()
						})
						.then((data) => {
							commit('setCart', data.result)
							resolve()
						})
				} else {
					const { skuId, price, inventory: stock, specsText: attrText } = newValue
					const next = { ...pre, ...{ skuId, price, stock, attrText } }
					// const next = { ...pre, ...{ skuId, price, stock, attrText } }
					// console.log('pre:', pre)
					// console.log('preIndex:', preIndex)
					// console.log('next:', next)
					// 删除旧的，添加新的
					commit('deleteCart', pre)
					commit('insertCart', { next, preIndex })
				}
			})
		},
		mergeLocalCart({ getters, commit }) {
			const cartList = getters.validateList.map((item) => {
				const { skuId, selected, count } = item
				return { skuId, selected, count }
			})
			_mergeLocalCart(cartList)
				.then(() => {
					commit('setCart', [])
				})
				.catch((e) => {
					throw new Error(e)
				})
		},
	},
}

export default CartModule
