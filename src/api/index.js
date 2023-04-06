import { request } from './request'
import { topCategory } from './contants'
import { _findAllCategory, _findTopCategory, _findSubCategoryFilter, _findSubCategoryGoods } from './category'
import { _findBrand, _findBanner, _findFreshThing, _findHot, _findGoodsColumn, _findSpecial } from './home'
import { _findGoodsDetail, _findGoodsRelevant, _findGoodsHot, _findGoodsCommentInfo, _findGoodsCommentData } from './product.js'

import { _getGoodsInfoNewest, _getCartSku, _mergeLocalCart, _getCartList, _addCart, _deleteCart, _modifyCart, _checkCartAllSelected } from './cart.js'
import {
	_userAccountLogin,
	_userSMSLogin,
	_userGetVerificationCode,
	_userQQLogin,
	_userQQBindGetVerificationCode,
	_userQQBindPhone,
	_userCheckAccount,
	_userQQPatchAccount,
	_userPCRegisterVerificationCode,
	_userPCRegister,
} from './user'

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
	_findGoodsCommentData,
	// 用户相关
	_userAccountLogin,
	_userSMSLogin,
	_userGetVerificationCode,
	_userQQLogin,
	_userQQBindGetVerificationCode,
	_userQQBindPhone,
	_userCheckAccount,
	_userQQPatchAccount,
	_userPCRegisterVerificationCode,
	_userPCRegister,
	// 购物车相关
	_getGoodsInfoNewest,
	_getCartSku,
	_mergeLocalCart,
	_getCartList,
	_addCart,
	_deleteCart,
	_modifyCart,
	_checkCartAllSelected,
}
