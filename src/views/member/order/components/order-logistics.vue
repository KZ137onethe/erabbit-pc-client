<template>
  <operation-button title="查看物流" class="order-logistics" @btnClick="getLogistics">
    <a-modal v-model:visible="visible" title="物流信息" :footer="null">
      <!-- 商品基本信息 -->
      <order-card class="logistics-info" :order="allData"></order-card>
      <!-- 时间轴 -->
      <a-timeline>
        <!-- 绿色代表已经完成，蓝色代表正在进行 -->
        <a-timeline-item v-for="address of logisticsData" :key="address.id" color="green">
          <b>{{ address.time }}</b>
          <p>{{ address.text }}</p>
        </a-timeline-item>
      </a-timeline>
    </a-modal>
  </operation-button>
</template>

<script>
import { ref } from "vue"
import { memberApi } from "@/api"

import OperationButton, { OrderCard } from "./operation-btn.vue"

const { _getOrderLogistics } = memberApi
export default {
  components: {
    OperationButton,
    OrderCard,
  },
  props: {
    orderId: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const visible = ref(false)
    const logisticsData = ref([])
    const allData = ref(null)
    const getLogistics = () => {
      _getOrderLogistics(props.orderId).then((res) => {
        allData.value = res.result
        if (res && res.result && res.result.list) {
          logisticsData.value = Array.isArray(res.result.list) && res.result.list.reverse()
        }
        visible.value = true
      })
    }

    return {
      visible,
      logisticsData,
      allData,
      getLogistics,
    }
  },
}
</script>

<style lang="less" scoped></style>
