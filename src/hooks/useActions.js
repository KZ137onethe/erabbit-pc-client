import { useMethodMapper } from './useMapper'
import { mapActions, createNamespacedHelpers } from 'vuex'

const useActions = (moduleName, mapper) => {
  let mapperFn = mapActions
  if (typeof moduleName === 'string' && moduleName.length > 0) {
    mapperFn = createNamespacedHelpers(moduleName).mapActions
  } else {
    mapper = moduleName
  }
  return useMethodMapper(mapper, mapperFn)
}
export {
  useActions
}
