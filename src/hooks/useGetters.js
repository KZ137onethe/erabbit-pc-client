import { mapGetters, createNamespacedHelpers } from "vuex"
import { useMapper } from "./useMapper"

/**
 * 获取vuex中的getters计算数据
 * @param {String} moduleName - vuex的模块名
 * @param {Array || Object} mapper - vuex中的getters方法
 * @returns 返回useMapper方法调用
 */
const useGetters = (moduleName, mapper) => {
  let mapperFn = mapGetters
  if (typeof moduleName === "string" && moduleName.length > 0) {
    mapperFn = createNamespacedHelpers(moduleName).mapGetters
  } else {
    mapper = moduleName
  }
  return useMapper(mapper, mapperFn)
}
export { useGetters }
