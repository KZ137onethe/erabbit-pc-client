import { request } from './request'

// ? 定义主页的品牌数据请求接口
const _findBrand = (limitNum = 6) => {
  return request('/home/brand', 'get', { limit: limitNum })
}

// ? 定义轮播图的数据请求接口
const _findBanner = () => {
  return request('/home/banner', 'get')
}

// ? 定义新鲜好物专栏的数据请求接口
const _findFreshThing = () => {
  return request('/home/new', 'get')
}

// ? 定义人气推荐专栏的数据请求接口
const _findHot = () => {
  return request('/home/hot', 'get')
}

// ? 定义商品专栏的数据请求接口
const _findGoodsColumn = () => {
  return request('/home/goods', 'get')
}

// ? 定义最新专题的数据请求接口
const _findSpecial = (limitNum = 3) => {
  return request('/home/special', 'get', { limit: limitNum })
}
export {
  _findBrand,
  _findBanner,
  _findFreshThing,
  _findHot,
  _findGoodsColumn,
  _findSpecial
}
