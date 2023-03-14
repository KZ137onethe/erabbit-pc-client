<template>
  <div class="xtx-city" ref="target">
    <div class="select" @click="toggle">
      <div v-if="!selectedArea.fullLocation" class="placeholder">请选择配送地址</div>
      <div v-else class="value">{{ selectedArea.fullLocation }}</div>
      <DownOutlined />
    </div>
    <div class="option" v-if="active">
      <a-row v-if="!loading" :wrap="true" align="middle" :justify="start">
        <a-col :span="4" v-for="item in currentCitySet" :key="item.code" @click="selectedRegion(item)">
          <span :title="item.name">
            {{ item.name }}
          </span>
        </a-col>
      </a-row>
      <a-spin v-else :indicator="indicator" />
    </div>
  </div>
</template>
<script>
import { ref, reactive, computed, h } from 'vue'
import { DownOutlined, LoadingOutlined } from '@ant-design/icons-vue'
import { onClickOutside } from '@vueuse/core'
import axios from 'axios'
export default {
  name: 'XtxCity',
  components: {
    DownOutlined
  },
  setup (props, { emit }) {
    // 城市组件的选择框状态
    const active = ref(false)
    // 城市组件元素
    const target = ref(null)
    // 组件存储的数据（城市省市县数据）
    const cityData = ref([])
    // 组件加载状态(是否处在加载中)
    const loading = ref(true)
    // 组件加载图标(指示器)
    const indicator = h(LoadingOutlined, {
      style: {
        fontSize: 24 + 'px',
        textAlign: 'center',
        width: 542 + 'px',
        spin: true
      }
    })
    // 组件选择的地区
    const selectedArea = reactive({
      provinceCode: '',
      provinceName: '',
      cityCode: '',
      cityName: '',
      countryCode: '',
      countryName: '',
      fullLocation: ''
    })

    const selectedRegion = (item) => {
      const level = { province: 0, city: 1, country: 2 }
      const getInfo = (list) => ([list.code, list.name])
      switch (item.level) {
        case level.province:
          [selectedArea.provinceCode, selectedArea.provinceName] = getInfo(item)
          break
        case level.city:
          [selectedArea.cityCode, selectedArea.cityName] = getInfo(item)
          break
        case level.country:
          [selectedArea.countryCode, selectedArea.countryName] = getInfo(item)
          selectedArea.fullLocation = [selectedArea.provinceName, selectedArea.cityName, selectedArea.countryName].join(' ')
          close()
          emit('change', selectedArea)
          break
        default:
          break
      }
    }

    const open = () => {
      active.value = true
      loading.value = true
      getComponentData().then(data => {
        cityData.value = data
        loading.value = false
      })
      // 每打开一次弹层，清空之前的选择
      for (const key in selectedArea) {
        selectedArea[key] = ''
      }
    }

    const close = () => (active.value = false)
    const toggle = () => (active.value === true ? close() : open())
    const currentCitySet = computed(() => {
      const arrSet = ref(cityData.value)
      // 转入市一级
      if (selectedArea.provinceCode) {
        arrSet.value = arrSet.value.find(item => item.code === selectedArea.provinceCode)?.areaList
      }
      // 转入县一级
      if (selectedArea.cityCode) {
        arrSet.value = arrSet.value.find(item => item.code === selectedArea.cityCode)?.areaList
      }
      console.debug(arrSet.value)
      return arrSet.value
    })

    onClickOutside(target, () => close())
    return {
      active,
      target,
      cityData,
      loading,
      indicator,
      selectedArea,
      selectedRegion,
      open,
      close,
      toggle,
      currentCitySet
    }
  }
}

// 获取城市组件的数据
const getComponentData = () => {
  return new Promise((resolve, reject) => {
    if (window.cityData) {
      // 有缓存
      resolve(window.cityData)
    } else {
      // 无缓存
      const url = 'https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json'
      axios.get(url).then(result => {
        window.cityData = result.data
        resolve(window.cityData)
      })
    }
  })
}
</script>

<style scoped lang="less">
.xtx-city{
  display: inline-block;
  position: relative;
  z-index:99;
  .select{
    height: 30px;
    border: 1px solid var(--xtx-borderColor-1);
    padding: 0 5px;
    line-height: 28px;
    cursor:pointer;
    .placeholder{
      display: inline-block;
      color: var(--xtx-font-color-2);
    }
    .value{
      display: inline-block;
      color: var(--xtx-font-color-3);
    }
    .anticon{
      margin-left: 3px;
      fill: var(--xtx-font-color-2);
    }
  }
  .option{
    width: 542px;
    position: absolute;
    top: 30px;
    left: 0;
    background-color: var(--xtx-bg-color-1);
    padding: 10px;
    min-height: 30px;
    line-height: 30px;
    border: 1px solid var(--xtx-borderColor-1);
    .ant-row{
      width: calc(inherit - 20px);
      .ant-col{
        cursor: pointer;
        height: 30px;
        &:hover{
          background-color: var(--xtx-bg-color-2);
        }
        span{
          width: 100%;
          display: inline-block;
          text-align: center;
          .ellipsis();
        }
      }
    }
  }
}
</style>
