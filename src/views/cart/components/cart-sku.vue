<template>
  <div ref="target" class="cart-sku">
    <div class="attrs" @click="toggle()">
      <span class="text ellipsis">{{ attrsText }}</span>
      <down-outlined class="icon"></down-outlined>
    </div>
    <div v-if="visible" class="layer">
      <a-spin v-if="layerLoading" :indicator="indicator" />
      <div v-else class="result">
        <goods-sku :sku-id="skuId" :goods="skuData" @amend="changeSku($event)"></goods-sku>
        <XtxButton type="primary" size="mini" @click="submit">确认</XtxButton>
      </div>
    </div>
  </div>
</template>
<script>
import { DownOutlined, LoadingOutlined } from "@ant-design/icons-vue"

import { h, ref } from "vue"
import { onClickOutside } from "@vueuse/core"
import GoodsSku from "@/views/goods/components/goods-sku.vue"
import { cartApi } from "@/api"

const { _getCartSku } = cartApi
export default {
  name: "CartSku",
  components: { DownOutlined, GoodsSku },
  props: {
    attrsText: {
      type: String,
      required: true,
    },
    skuId: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit }) {
    const target = ref(null)
    const visible = ref(false)
    const layerLoading = ref(false)

    const skuData = ref(null)
    const open = () => {
      visible.value = true
      layerLoading.value = true

      // 获取sku数据
      _getCartSku(props.skuId).then((res) => {
        skuData.value = res.result
        layerLoading.value = false
      })
    }
    const close = () => {
      visible.value = false
      skuData.value = null
    }

    // 切换
    const toggle = () => (visible.value ? close() : open())

    // 点击其他区域关闭模态框
    onClickOutside(target, () => {
      close()
    })

    const indicator = h(LoadingOutlined, {
      style: {
        fontSize: "24px",
      },
      spin: true,
    })

    const CurrentSku = ref(null)
    const changeSku = (event) => {
      CurrentSku.value = event
    }

    const submit = () => {
      if (CurrentSku.value?.skuId !== skuId.value) {
        emit("amend", CurrentSku.value)
        close()
      }
    }

    return {
      target,
      visible,
      layerLoading,
      skuData,
      toggle,
      indicator,
      CurrentSku,
      changeSku,
      submit,
    }
  },
}
</script>
<style scoped lang="less">
.cart-sku {
  height: 28px;
  border: 1px solid #f5f5f5;
  padding: 0 6px;
  position: relative;
  margin-top: 10px;
  display: inline-block;
  .attrs {
    line-height: 24px;
    display: flex;
    > span {
      color: #999;
      &.text {
        max-width: 230px;
        font-size: 14px;
      }
      &.icon {
        padding-left: 5px;
        &:deep(svg) {
          line-height: 100%;
          height: 24px;
        }
      }
    }
  }
  .layer {
    position: absolute;
    left: -1px;
    top: 40px;
    z-index: 10;
    width: 400px;
    border: 1px solid @xtxColor;
    box-shadow: 2px 2px 4px lighten(@xtxColor, 50%);
    background: #fff;
    border-radius: 4px;
    font-size: 14px;
    padding: 20px;
    &::before {
      content: "";
      width: 12px;
      height: 12px;
      border-left: 1px solid @xtxColor;
      border-top: 1px solid @xtxColor;
      position: absolute;
      left: 12px;
      top: -8px;
      background: #fff;
      transform: scale(0.8, 1) rotate(45deg);
    }
  }
}
</style>
