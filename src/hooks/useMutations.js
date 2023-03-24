import { useMethodMapper } from './useMapper'
import { mapMutations, createNamespacedHelpers } from 'vuex'

/**
 * 获取vuex中的同步方法(即'Mutations')
 * @param {string} moduleName -- 模块名
 * @param { Array | String | Object } mapper -- 方法名数组
 */
const useMutations = (moduleName, mapper) => {
	let mapperFn = mapMutations
	if (typeof moduleName === 'string' && moduleName.length > 0) {
		mapperFn = createNamespacedHelpers(moduleName).mapMutations
	} else {
		mapper = moduleName
	}
	return useMethodMapper(mapper, mapperFn)
}

export { useMutations }
