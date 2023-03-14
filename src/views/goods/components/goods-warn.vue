<template>
  <div class="goods-warn">
    <a-list item-layout="horizontal" :data-source="data">
      <template #header>注意事项</template>
      <template #renderItem="{ item }">
        <a-list-item>
          <a-list-item-meta :title="item.question">
            <template #description>
              <template v-for="item in item.answer" :key="item"><p>{{ item }}</p></template>
            </template>
          </a-list-item-meta>
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>

<script>
export default {
  setup () {
    const data = [{ question: '购买运费如何收取？', answer: ['单笔订单金额(不含运费)满88元免邮费；不满88元，每单收取10元运费。（港澳台地区需满500元免邮费；不满500元，每单收取30元运费)'] },
      { question: '使用什么快递发货?', answer: ['默认使用顺丰快递发货(个别商品使用其他快递）', '配送范围覆盖全国大部分地区(港澳台地区除外）'] },
      { question: '如何申请退货?', answer: ['1.自收到商品之日起30日内，顾客可申请无忧退货，退款将原路返还，不同的银行处理时间不同，预计1-5个工作日到账；', '2.内裤和食品等特殊商品无质量问题不支持退货；', '3.退货流程：确认收货-申请退货-客服审核通过-用户寄回商品-仓库签收验货-退款审核-退款完成；', '4.因小兔鲜儿产生的退货，如质量问题，退货邮费由小兔鲜儿承担，退款完成后会以现金券的形式报销。因客户个人原因产生的退货，购买和寄回运费由客户个人承担。'] }]
    return {
      data
    }
  }
}
</script>

<style lang="less" scoped>
.goods-warn {
  background: #fff;
  margin-top: 20px;
  padding: 0 32px 20px 32px;
}
</style>
