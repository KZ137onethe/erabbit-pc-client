<template>
  <a-layout-content class="order_detail-content">
    <!-- 步骤条 -->
    <a-steps v-model:current="current" class="detail-content--steps" status="wait">
      <a-step title="提交订单" :description="orderData.createTime" />
      <a-step title="付款成功" :description="orderData.payTime" />
      <a-step title="商品发货" :description="orderData.consignTime" />
      <a-step title="确认收货" :description="orderData.evaluation" />
      <a-step title="订单完成" :description="orderData.endTime" />
    </a-steps>
    <!-- 商品信息 -->
    <div class="detail-content--goods">
      <a-divider>
        <b>订单商品</b>
      </a-divider>
      <a-table :columns="columns" :data-source="goodsData" bordered :pagination="false">
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'goods'">
            <a-row class="" type="flex" align-items="center">
              <a-col class="goods-image" :span="4">
                <img :src="record.image" alt="" />
              </a-col>
              <a-col class="goods-info" :span="20">
                <span class="goods-info_title">
                  {{ record.name }}
                </span>
                <span class="goods-info_description">
                  {{ record.attrsText }}
                </span>
              </a-col>
            </a-row>
          </template>
          <template v-if="column.dataIndex === 'price'">
            <span>{{ record.curPrice }}</span>
          </template>
          <template v-if="column.dataIndex === 'counts'">
            <span>{{ record.quantity }}</span>
          </template>
          <template v-if="column.dataIndex === 'totalPrice'">
            <span>{{ record.realPay }}</span>
          </template>
          <template v-if="column.dataIndex === 'totalPayPrice'">
            <span>{{ record.realPay }}</span>
          </template>
        </template>
      </a-table>
    </div>
    <!-- 收货信息 -->
    <div class="detail-content--address">
      <a-divider>
        <b>收货信息</b>
      </a-divider>
      <div class="card">
        <a-descriptions :column="1">
          <a-descriptions-item label="收货人">{{ orderData.receiverContact }}</a-descriptions-item>
          <a-descriptions-item label="联系方式">{{ orderData.receiverMobile }}</a-descriptions-item>
          <a-descriptions-item label="收货地址">
            {{ orderData.receiverAddress }}
          </a-descriptions-item>
        </a-descriptions>
      </div>
    </div>
    <!-- 支付方式和送货时间 -->
    <div class="detail-content--pay">
      <a-divider>
        <b>支付方式及送货时间</b>
      </a-divider>
      <div class="card">
        <a-descriptions :column="1">
          <a-descriptions-item label="支付方式">在线支付</a-descriptions-item>
          <a-descriptions-item label="送货时间">
            双休日、假日送货（适合于家庭地址）
          </a-descriptions-item>
        </a-descriptions>
      </div>
    </div>
    <!-- 发票信息 -->
    <div class="detail-content--invoice">
      <a-divider>
        <b>发票信息</b>
      </a-divider>
      <div class="card">
        <a-descriptions :column="1">
          <a-descriptions-item label="发票类型">电子发票</a-descriptions-item>
          <a-descriptions-item label="发票内容">日用品</a-descriptions-item>
          <a-descriptions-item label="发票抬头">个人</a-descriptions-item>
        </a-descriptions>
      </div>
    </div>
  </a-layout-content>
</template>

<script>
import { computed } from "vue"

const columns = [
  {
    title: "商品信息",
    dataIndex: "goods",
    className: "table-column-goods",
    width: 500,
    align: "left",
  },
  {
    title: "单价(¥)",
    dataIndex: "price",
  },
  {
    title: "数量",
    dataIndex: "counts",
  },
  {
    title: "小计(¥)",
    dataIndex: "totalPrice",
  },
  {
    title: "实付(¥)",
    dataIndex: "totalPayPrice",
  },
]
export default {
  props: {
    order: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const orderData = computed(() => props.order)
    const goodsData = computed(() => orderData.value.skus)
    const current = computed(() =>
      orderData.value.orderState === 6 ? 0 : orderData.value.orderState,
    )

    return {
      current,
      orderData,
      goodsData,
      columns,
    }
  },
}
</script>

<style lang="less" scoped>
.order_detail-content {
  padding: 10px 15px;
}
.detail-content--steps {
  padding: 0 40px;
  margin: 50px 0;
}
.table-column-goods {
  .ant-row {
    .goods-image {
      > img {
        width: 60px;
        height: 60px;
      }
    }
    .goods-info {
      &_description {
        color: var(--xtx-font-color-3);
      }
      span {
        display: block;
      }
    }
  }
}
</style>
