<template>
  <div class="pay-methods">
    <public-option title="支付方式">
      <template #content>
        <div class="main">
          <a-space size="middle">
            <a-button size="large">工商银行</a-button>
            <a-button size="large">招商银行</a-button>
            <a-button size="large">建设银行</a-button>
            <a-button size="large">农业银行</a-button>
            <a-button size="large" disabled>交通银行</a-button>
          </a-space>
        </div>
      </template>
    </public-option>
  </div>
</template>

<script>
import PublicOption from "./public-option"

export default {
  components: {
    PublicOption,
  },
  setup() {
    return {}
  },
}
</script>

<style lang="less" scoped></style>
