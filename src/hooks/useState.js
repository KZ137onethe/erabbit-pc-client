import { useMapper } from './useMapper.js'
import { mapState, createNamespacedHelpers } from 'vuex'

/**
 * 获取vuex中的state数据
 * @param {String} moduleName - vuex的模块名
 * @param {Array || Object} mapper - vuex中的state数据
 * @returns 返回useMapper方法调用
 */
const useState = (moduleName, mapper) => {
  let mapperFn = mapState
  if (typeof moduleName === 'string' && moduleName.length > 0) {
    mapperFn = createNamespacedHelpers(moduleName).mapState
  } else {
    mapper = moduleName
  }
  return useMapper(mapper, mapperFn)
}

export {
  useState
}
