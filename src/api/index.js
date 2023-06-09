export { baseURL, request } from '@/utils/request.js'
export { topCategory, cancelReason } from './contents'
export * as cartApi from './cart'
export * as categoryApi from './category'
export * as homeApi from './home'
export * as productApi from './product'
export * as userApi from './user'
export * as orderApi from './order'
export * as memberApi from './member'

let ApiFn = {}
const modules = import.meta.glob(['./api/*.js', '!./api/index.js'], { eager: true })

for (const path in modules) {
	ApiFn = { ...modules[path], ...ApiFn }
}

export default ApiFn
