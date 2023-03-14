<template>
  <div class="goods-sku" v-if="Object.keys(goods).length">
      <div class="item" v-for="(item, index) in goods.specs" :key="item.id">
          <header>{{ item.name }}:</header>
          <a-row type="flex" justify="start" :wrap="true">
            <a-space :size="20">
              <a-col flex="50px" v-for="val in item.values" :key="val.name">
                <a-radio-group v-model:value="value[Object.keys(value)[index]]" @change="clickBtn()">
                  <a-radio-button
                    :value="val.name"
                    :class="{imgStyle: val.picture }"
                    :disabled="val.disabled"
                    >
                    <template v-if="val.picture">
                      <img :src="val.picture" alt="" :title="val.name">
                    </template>
                    <template v-else>
                      <span :title="val.name">{{ val.name }}</span>
                    </template>
                  </a-radio-button>
                </a-radio-group>
              </a-col>
            </a-space>
          </a-row>
      </div>
  </div>
</template>

<script>
import { ref, reactive, nextTick, watch } from 'vue'
import btPowerSet from '@/vender/power-set.js'
export default {
  props: {
    // 商品id
    goods: {
      type: Object,
      default: () => ({})
    },
    // 商品规格id
    skuId: {
      type: String,
      default: () => ('')
    }
  },
  setup (props, { emit }) {
    // value对象 => 规格表单
    const value = reactive({})
    // 路径字典
    const pathMap = ref({})
    // 当前点击选择的每种规格的属性数组
    const selectedArr = ref([])
    // 将商品的每个规格赋给value的每个属性
    nextTick(() => {
      props.goods.specs.forEach(item => {
        for (const key in item) {
          if (key === 'name') {
            value[item[key]] = ref('')
          }
        }
      })
      // 初始化
      selectedArr.value = new Array(Object.keys(value).length).fill('')
      pathMap.value = createPathMap(props.goods.skus)
      // 初始化规格属性按钮启用(可用和禁用)
      updateDisabledStatus(props.goods.specs, pathMap.value, selectedArr.value)
      // 初始化规格的选择状态
      if (props.skuId) {
        const selectedObj = initSpecsSelected(props.goods, props.skuId)
        for (const key in value) {
          if (selectedObj[key]) value[key] = selectedObj[key]
        }
      }
      // 监听value的改变
      watch(() => {
        return { ...value }
      }, (newVal) => {
        selectedArr.value = Object.values(newVal)
      })
    })
    /**
     * 当点击规格属性按钮时
     * 1.修改规格属性按钮的状态
     * 2.向父组件传递组件信息
     */
    const clickBtn = () => {
      updateDisabledStatus(props.goods.specs, pathMap.value, selectedArr.value)
      const validSelectedValue = selectedArr.value.filter(attribute => attribute !== '')
      if (validSelectedValue.length === props.goods.specs.length) {
        // 规格选择完整
        const [skuId] = pathMap.value[selectedArr.value.join(separator)]
        const currentSKU = props.goods.skus.find(sku => sku.id === skuId)
        const specsText = ref('')
        for (const key in value) {
          specsText.value += `${key}: ${value[key]} `
        }
        emit('amend', {
          skuId: currentSKU.id,
          price: currentSKU.price,
          oldPrice: currentSKU.oldPrice,
          inventory: currentSKU.inventory,
          specsText: specsText.value.trim()
        })
      } else {
        // 规格选择不完整
        emit('amend', null)
      }
    }

    return {
      value,
      pathMap,
      selectedArr,
      clickBtn
    }
  }
}

// 拼接的分隔符
const separator = '&'
// 根据商品规格生成路径字典
const createPathMap = (_sku) => {
  const pathDictionary = {}
  _sku.forEach(sku => {
    if (sku.inventory > 0) {
      // 有库存的规格
      const specifications = sku.specs.map(item => item.valueName)
      // 生成子集
      const powerSet = btPowerSet(specifications)
      powerSet.forEach(item => {
        const key = item.join(separator)
        if (pathDictionary[key]) {
          pathDictionary[key].push(sku.id)
        } else {
          pathDictionary[key] = [sku.id]
        }
      })
    }
  })
  return pathDictionary
}

// 更新按钮状态
const updateDisabledStatus = (specs, pathMap, selectedArr) => {
  // 遍历每一个规格的所有选项
  specs.forEach((spec, index) => {
    spec.values.forEach(val => {
      /**
        *   1.已选中的按钮不用判断, 结束循环
        *   2.未选中的替换对应的值
        *   2.1 拼接字符串，从路径字典找该key
        *   2.2 如果存在，那么禁用状态为 false; 如果不存在，那么禁用状态为true
       */
      if (val.name === selectedArr[index]) return
      selectedArr[index] = val.name
      const key = selectedArr.filter((item) => { return item || '' }).join(separator)
      val.disabled = pathMap[key] === undefined
    })
  })
}

// 初始化规格选中状态
const initSpecsSelected = (goods, skuId) => {
  // 寻找到对应的sku
  const sku = goods.skus.find(item => item.id === String(skuId))
  // 创建选中状态的对象
  const selectedObj = reactive({})
  // 遍历每一种规格
  goods.specs.forEach((spec, specIndex) => {
    const selectedItem = spec.values.find(val => val.name === sku.specs[specIndex].valueName)
    if (selectedItem) {
      selectedObj[spec.name] = selectedItem.name
    }
  })
  return selectedObj
}
</script>

<style lang="less" scoped>
.goods-sku{
  padding: 10px 0;
  .item{
    display: flex;
    line-height: 30px;
    margin-bottom: 10px;
    &:last-child{
      margin: 0;
    }
    header{
      display: inline-block;
      width: 50px;
    }
    .ant-row{
      flex: 1;
      max-width: 580px;
      .ant-radio-group{
        min-height: 30px;
        min-width: 50px;
        .ant-radio-button-wrapper{
          min-height: 30px;
          min-width: 50px;
          &.imgStyle{
            height: 50px;
            padding:0;
            > span{
              height: 50px;
              line-height: 50px;
            }
          }
          > span{
            text-align: center;
            min-height: 30px;
            &:last-child{
              img{
                display: inline-block;
                width: 50px;
                height: 50px;
                object-fit: cover;
              }
            }
          }
        }
      }
    }
  }

}
</style>
