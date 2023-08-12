import Mock from "mockjs"
import { ref } from "vue"

Mock.setup({
  timeout: "100-1000",
})

const { Random } = Mock

// 用于测试mock的接口
Mock.mock(/\/test\/userInfo/, () => {
  const name = Random.cname()
  const email = Random.email()
  const region = Random.county(true)
  const birthday = Random.date("yyyy-MM-dd")
  const avatar = Random.dataImage("100x100", `${name}`)
  return {
    message: "数据获取成功",
    result: {
      name,
      email,
      region,
      birthday,
      avatar,
    },
  }
})

// 获取收藏信息
Mock.mock(/\/member\/collect/, (config) => {
  // 获取接口传入的参数信息
  const [queryString] = config.url.split("?").slice(-1)
  const queryMap = stringParse(queryString)
  const data = ref([])
  for (let i = 0; i < queryMap.get("pageSize"); i++) {
    data.value.push(
      Mock.mock({
        id: Random.id(),
        name: Random.ctitle(3, 10),
        description: Random.ctitle(10, 20),
        price: Random.float(10, 500, 2, 2),
        picture: `http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/clothes_goods_${Random.integer(
          1,
          8,
        )}.jpg`,
      }),
    )
  }
  return {
    message: "操作成功！",
    result: {
      counts: 35,
      pageSize: queryMap.get("pageSize"),
      page: queryMap.get("page"),
      items: data.value,
    },
  }
})

Mock.mock(/\/member\/browseHistory/, (config) => {
  const [queryString] = config.url.split("?").slice(-1)
  const queryMap = stringParse(queryString)
  const data = ref([])
  for (let i = 0; i < queryMap.get("pageSize"); i++) {
    data.value.push(
      Mock.mock({
        id: Random.id(),
        name: Random.ctitle(3, 10),
        desc: Random.ctitle(10, 20),
        price: Random.float(10, 500, 2, 2),
        discount: Random.float(0, 1),
        picture: `http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/clothes_goods_${Random.integer(
          1,
          8,
        )}.jpg`,
        browserTime: Random.datetime(),
      }),
    )
  }
  return {
    msg: "操作成功",
    result: {
      counts: 50,
      pageSize: queryMap.get("pageSize"),
      pages: Math.ceil(50 / queryMap.get("pageSize")),
      page: queryMap.get("page"),
      items: data.value,
    },
  }
})

function stringParse(string) {
  const copyArr = string.split("&")
  const result = new Map(
    copyArr.map((string) => {
      const [key, value] = string.split("=")
      return [key, value]
    }),
  )
  return result
}
