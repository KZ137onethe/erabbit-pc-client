import request from "@/utils/request.js"

// ? 定义主页的品牌数据请求接口
function _findBrand(limitNum = 6) {
  return request({
    url: "/home/brand",
    method: "get",
    params: {
      limit: limitNum,
    },
  })
}

// ? 定义轮播图的数据请求接口
function _findBanner() {
  return request({
    url: "/home/banner",
    method: "get",
  })
}

// ? 定义新鲜好物专栏的数据请求接口
function _findFreshThing() {
  return request({
    url: "/home/new",
    method: "get",
  })
}

// ? 定义人气推荐专栏的数据请求接口
function _findHot() {
  return request({
    url: "/home/hot",
    method: "get",
  })
}

// ? 定义商品专栏的数据请求接口
function _findGoodsColumn() {
  return request({
    url: "/home/goods",
    method: "get",
  })
}

// ? 定义最新专题的数据请求接口
function _findSpecial(limitNum = 3) {
  return request({
    url: "/home/special",
    method: "get",
    params: {
      limit: limitNum,
    },
  })
}

export default {
  _findBrand,
  _findBanner,
  _findFreshThing,
  _findHot,
  _findGoodsColumn,
  _findSpecial,
}
