<template>
  <template v-if="Array.isArray(orderList) && orderList.length !== 0">
    <a-table
      v-for="(order, index) of orderList"
      :key="index"
      size="small"
      :pagination="false"
      :columns="columns"
      :data-source="[order]"
      bordered
    >
      <template #bodyCell="{ column, record }">
        <!-- 订单中的商品 -->
        <template v-if="column.dataIndex === 'skus'">
          <!-- 这里写一个多行表格（原生的） -->
          <order-goods-table :order-list="record.skus"></order-goods-table>
        </template>
        <template v-if="column.dataIndex === 'orderState'">
          <b>{{ record.orderState }}</b>
        </template>
        <template v-if="column.dataIndex === 'payMoney'">
          <b>&yen; {{ record.payMoney }}</b>
          <span style="display: block">(含运费：&yen;{{ record.postFee }})</span>
          <span style="display: block">在线支付</span>
        </template>
        <!-- 订单操作 -->
        <template v-if="column.dataIndex === 'orderOption'">
          <div class="option">
            <template
              v-for="(btn, idx) of [...OptionMap][
                Array.from(orderStatus)
                  .map((status) => status[1])
                  .findIndex((item) => item === record.orderState)
              ]"
              :key="idx"
            >
              <component :is="btn" :order-id="record.id" @refresh="refresh"></component>
            </template>
          </div>
        </template>
      </template>
      <template #title>
        <a-row :wrap="false" type="flex" justify="space-between">
          <a-col>{{ order.message }}</a-col>
          <a-col>{{ order.payTime ?? "付款已截止" }}</a-col>
        </a-row>
      </template>
    </a-table>
  </template>
  <template v-else-if="Array.isArray(orderList)">
    <div class="loading">
      <XtxLoading :size="50"></XtxLoading>
    </div>
  </template>
  <template v-else>
    <div class="empty">
      <a-empty :image="simpleImage" />
    </div>
  </template>
  <a-pagination v-model:current="currentPageNumber" :total="500" />
</template>
<script>
import { Empty } from "ant-design-vue"

import { ref, watch, computed } from "vue"

import { orderStatus } from "../index.vue"
import OrderGoodsTable, { columns } from "./order-table"
import { OptionMap } from "./option-btn"

export default {
  props: {
    orderMap: {
      type: Map,
      default: new Map([["afterEvaluation", []]]),
    },
  },
  components: {
    OrderGoodsTable,
  },
  setup(props, { emit }) {
    const orderList = computed(() => props.orderMap.get("afterEvaluation"))
    const currentPageNumber = ref(1)

    watch(currentPageNumber, (newValue) => {
      emit("changePage", newValue)
    })

    const refresh = () => {
      emit("refresh")
    }

    return {
      orderStatus,
      OptionMap,
      orderList,
      columns,
      currentPageNumber,
      refresh,
      simpleImage: Empty.PRESENTED_IMAGE_SIMPLE,
    }
  },
}
</script>
<style lang="less" scoped>
.ant-table-wrapper {
  margin: 8px 0;
}
.option {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
}

:deep(.ant-table-title) {
  background: lighten(@xtxColor, 40%);
}
.ant-pagination {
  text-align: center;
}
.loading,
.empty {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
