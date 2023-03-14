import { request } from './request'
import { topCategory } from './contants'
import { _findAllCategory, _findTopCategory, _findSubCategoryFilter, _findSubCategoryGoods } from './category'
import { _findBrand, _findBanner, _findFreshThing, _findHot, _findGoodsColumn, _findSpecial } from './home'
import { _findGoodsDetail, _findGoodsRelevant, _findGoodsHot, _findGoodsCommentInfo, _findGoodsCommentData } from './product.js'

export {
  request,
  // 分类
  topCategory,
  _findAllCategory,
  _findTopCategory,
  _findSubCategoryFilter,
  _findSubCategoryGoods,
  // 首页
  _findBrand,
  _findBanner,
  _findFreshThing,
  _findHot,
  _findGoodsColumn,
  _findSpecial,
  // 商品
  _findGoodsDetail,
  _findGoodsRelevant,
  _findGoodsHot,
  _findGoodsCommentInfo,
  _findGoodsCommentData
}
