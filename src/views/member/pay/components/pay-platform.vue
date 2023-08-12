<template>
  <div class="payment-platform">
    <public-option title="支付平台">
      <template #content>
        <div class="main">
          <a-space size="middle">
            <a-button class="pay--Alipay" size="large" @click="open">
              <a :href="payUrl" target="_blank">
                <img :src="platform.Alipay.picture" title="支付宝支付" />
              </a>
            </a-button>
            <a-button class="pay--WeChat" size="large">
              <img :src="platform.WeChat.picture" title="微信支付" />
            </a-button>
          </a-space>
        </div>
      </template>
    </public-option>
    <a-modal v-model:visible="visible" title="正在支付..." centered :footer="null">
      <a-row type="flex" :wrap="false" align="middle" justify="space-around">
        <a-col class="order--loading" flex="1">
          <icon>
            <svg
              t="1681733929207"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="6256"
              width="64"
              height="64"
            >
              <path
                d="M512 61.44a40.96 40.96 0 0 1 40.96 40.96v122.88a40.96 40.96 0 1 1-81.92 0V102.4a40.96 40.96 0 0 1 40.96-40.96z"
                fill="#27BA9B"
                p-id="6257"
              ></path>
              <path
                d="M737.28 121.79456a40.96 40.96 0 0 1 14.99136 55.95136l-61.44 106.43456a40.96 40.96 0 1 1-70.94272-40.96l61.44-106.43456A40.96 40.96 0 0 1 737.28 121.79456z"
                fill="#27BA9B"
                p-id="6258"
              ></path>
              <path
                d="M902.20544 286.72a40.96 40.96 0 0 1-14.99136 55.95136l-106.43456 61.44a40.96 40.96 0 0 1-40.96-70.94272l106.43456-61.44a40.96 40.96 0 0 1 55.95136 14.99136z"
                fill="#27BA9B"
                p-id="6259"
              ></path>
              <path
                d="M962.56 512a40.96 40.96 0 0 1-40.96 40.96h-122.88a40.96 40.96 0 1 1 0-81.92h122.88a40.96 40.96 0 0 1 40.96 40.96z"
                fill="#27BA9B"
                p-id="6260"
              ></path>
              <path
                d="M902.20544 737.28a40.96 40.96 0 0 1-55.95136 14.99136l-106.43456-61.44a40.96 40.96 0 1 1 40.96-70.94272l106.43456 61.44A40.96 40.96 0 0 1 902.20544 737.28z"
                fill="#27BA9B"
                p-id="6261"
              ></path>
              <path
                d="M737.28 902.20544a40.96 40.96 0 0 1-55.95136-14.99136l-61.44-106.43456a40.96 40.96 0 0 1 70.94272-40.96l61.44 106.43456A40.96 40.96 0 0 1 737.28 902.20544z"
                fill="#27BA9B"
                p-id="6262"
              ></path>
              <path
                d="M512 962.56a40.96 40.96 0 0 1-40.96-40.96v-122.88a40.96 40.96 0 1 1 81.92 0v122.88a40.96 40.96 0 0 1-40.96 40.96z"
                fill="#27BA9B"
                p-id="6263"
              ></path>
              <path
                d="M286.72 902.20544a40.96 40.96 0 0 1-14.99136-55.95136l61.44-106.43456a40.96 40.96 0 1 1 70.94272 40.96l-61.44 106.43456a40.96 40.96 0 0 1-55.95136 14.99136z"
                fill="#27BA9B"
                p-id="6264"
              ></path>
              <path
                d="M121.79456 737.28a40.96 40.96 0 0 1 14.99136-55.95136l106.43456-61.44a40.96 40.96 0 0 1 40.96 70.94272l-106.43456 61.44A40.96 40.96 0 0 1 121.79456 737.28z"
                fill="#27BA9B"
                p-id="6265"
              ></path>
              <path
                d="M61.44 512a40.96 40.96 0 0 1 40.96-40.96h122.88a40.96 40.96 0 1 1 0 81.92H102.4a40.96 40.96 0 0 1-40.96-40.96z"
                fill="#27BA9B"
                p-id="6266"
              ></path>
              <path
                d="M121.79456 286.72a40.96 40.96 0 0 1 55.95136-14.99136l106.43456 61.44a40.96 40.96 0 1 1-40.96 70.94272l-106.43456-61.44A40.96 40.96 0 0 1 121.79456 286.72z"
                fill="#27BA9B"
                p-id="6267"
              ></path>
              <path
                d="M286.72 121.79456a40.96 40.96 0 0 1 55.95136 14.99136l61.44 106.43456a40.96 40.96 0 0 1-70.94272 40.96l-61.44-106.43456A40.96 40.96 0 0 1 286.72 121.79456z"
                fill="#27BA9B"
                p-id="6268"
              ></path>
            </svg>
          </icon>
        </a-col>
        <a-col class="order--detail" flex="1">
          <a-col>
            <span>如果支付成功：</span>
            <p><a href="">查看订单详情 >></a></p>
          </a-col>
          <a-col>
            <span>如果支付失败：</span>
            <p><a href="">查看相关疑问 >></a></p>
          </a-col>
        </a-col>
      </a-row>
    </a-modal>
  </div>
</template>

<script>
import Icon from "@ant-design/icons-vue"

import { ref, reactive, computed } from "vue"
import { useRoute } from "vue-router"
import PublicOption from "./public-option"
import { payUrlFn } from "./pay-platform.js"

export default {
  components: {
    PublicOption,
  },
  setup() {
    const route = useRoute()
    const orderId = computed(() => route.query.id)
    const payUrl = payUrlFn(orderId.value)
    const visible = ref(false)

    const open = () => {
      visible.value = true
    }

    return {
      Icon,
      platform,
      payUrl,
      visible,
      open,
    }
  },
}

const platform = reactive({
  Alipay: {
    picture: "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/7b6b02396368c9314528c0bbd85a2e06.png",
  },
  WeChat: {
    picture: "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/c66f98cff8649bd5ba722c2e8067c6ca.jpg",
  },
})
</script>

<style lang="less" scoped>
.main {
  .ant-btn {
    padding: 0;
    img {
      object-fit: fill;
    }
  }
}

.order--loading {
  text-align: center;
}
.order--detail {
  text-align: center;
  .ant-col {
    > p {
      color: @xtxColor;
      a {
        color: @xtxColor;
        font-size: 14px;
      }
    }
  }
}
</style>
