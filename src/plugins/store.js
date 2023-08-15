import {
  mapActions,
  createNamespacedHelpers,
  mapGetters,
  useStore,
  mapMutations,
  mapState,
} from "vuex"
import { computed } from "vue"

function useActions(moduleName, mapper) {
  let mapperFn = mapActions
  if (typeof moduleName === "string" && moduleName.length > 0) {
    mapperFn = createNamespacedHelpers(moduleName).mapActions
  } else {
    mapper = moduleName
  }
  return useMethodMapper(mapper, mapperFn)
}

/**
 * 获取vuex中的getters计算数据
 * @param {String} moduleName - vuex的模块名
 * @param {Array || Object} mapper - vuex中的getters方法
 * @returns 返回useMapper方法调用
 */
function useGetters(moduleName, mapper) {
  let mapperFn = mapGetters
  if (typeof moduleName === "string" && moduleName.length > 0) {
    mapperFn = createNamespacedHelpers(moduleName).mapGetters
  } else {
    mapper = moduleName
  }
  return useMapper(mapper, mapperFn)
}

/**
 * 获取vuex中的同步方法(即'Mutations')
 * @param {string} moduleName -- 模块名
 * @param { Array | String | Object } mapper -- 方法名数组
 */
function useMutations(moduleName, mapper) {
  let mapperFn = mapMutations
  if (typeof moduleName === "string" && moduleName.length > 0) {
    mapperFn = createNamespacedHelpers(moduleName).mapMutations
  } else {
    mapper = moduleName
  }
  return useMethodMapper(mapper, mapperFn)
}

/**
 * 获取vuex中的state数据
 * @param {String} moduleName - vuex的模块名
 * @param {Array || Object} mapper - vuex中的state数据
 * @returns 返回useMapper方法调用
 */
function useState(moduleName, mapper) {
  let mapperFn = mapState
  if (typeof moduleName === "string" && moduleName.length > 0) {
    mapperFn = createNamespacedHelpers(moduleName).mapState
  } else {
    mapper = moduleName
  }
  return useMapper(mapper, mapperFn)
}

function useMapper(mapper, mapFn) {
  // 拿到store独享
  const store = useStore()

  // 获取到对应的对象的functions: {name: function, age: function}
  const storeStateFns = mapFn(mapper)

  // 对数据进行转换
  const storeState = {}
  Object.keys(storeStateFns).forEach((fnKey) => {
    const fn = storeStateFns[fnKey].bind({ $store: store })
    storeState[fnKey] = computed(fn)
  })

  return storeState
}

function useMethodMapper(mapper, mapFn) {
  // 拿到store独享
  const store = useStore()

  // 获取到对应的对象的functions: {name: function, age: function}
  const storeMethodFns = mapFn(mapper)

  // 对数据进行转换
  const storeMethod = {}
  Object.keys(storeMethodFns).forEach((fnKey) => {
    storeMethod[fnKey] = storeMethodFns[fnKey].bind({ $store: store })
  })

  return storeMethod
}

export default {
  useState,
  useGetters,
  useMutations,
  useActions,
}
