<template>
  <div class="checkout-address">
    <a-divider>收货地址</a-divider>
    <div class="address-box">
      <a-row class="address-box--wrapper" align="middle" :wrap="false">
        <a-col :span="18" class="now">
          <a-row v-if="currentAddress" type="flex" justify="space-between" class="now-content">
            <a-col class="now-info">
              <p>收货人: {{ currentAddress?.receiver }}</p>
              <p>联系方式: {{ currentAddress?.contact }}</p>
              <p>收货地址: {{ currentAddress?.fullLocation + currentAddress?.address }}</p>
            </a-col>
            <a-col class="now-modify">
              <a-button type="link" @click="open('modifyAddress')">修改地址</a-button>
            </a-col>
          </a-row>
          <a-row v-else class="empty" type="flex" justify="center" align="center">
            <span>你需要添加收货地址才可提交订单</span>
          </a-row>
        </a-col>
        <a-divider type="vertical" style="height: 100%" />
        <a-col :span="5" class="option">
          <a-row type="flex" align="middle" justify="space-around">
            <a-button v-model:disabled="actionsBtn.switchAddress" @click="open('switchAddress')">
              切换地址
            </a-button>
            <a-button @click="open('appendAddress')">添加地址</a-button>
          </a-row>
        </a-col>
      </a-row>
    </div>
    <checkout-address-append
      v-model:open="actions.appendAddress"
      @close="close('appendAddress')"
      @submit="appendAddress"
    />
    <checkout-address-switch
      v-model:addressGroup="addressGroup"
      v-model:open="actions.switchAddress"
      @change="switchAddress"
      @delete="removeAddress"
      @close="close('switchAddress')"
    />
    <checkout-address-modify
      v-model:open="actions.modifyAddress"
      :address="currentAddress"
      @change="modifyAddress"
      @close="close('modifyAddress')"
    />
  </div>
</template>

<script>
import { computed, reactive, onMounted } from "vue"
import CheckoutAddressAppend from "./checkout-address-append.vue"
import CheckoutAddressSwitch from "./checkout-address-switch.vue"
import CheckoutAddressModify from "./checkout-address-modify.vue"

export default {
  components: {
    CheckoutAddressAppend,
    CheckoutAddressSwitch,
    CheckoutAddressModify,
  },
  props: {
    address: {
      type: Array,
      required: true,
    },
  },
  setup(props, { emit }) {
    const addressGroup = computed(() => {
      if (props.address === undefined) {
        return []
      }
      return props.address
    })
    const currentAddress = computed(() => {
      const valueArr = computed(() =>
        addressGroup.value.map((item) => {
          return item?.isDefault
        }),
      )
      const index = computed(() => valueArr.value.findIndex((value) => value === 0))
      return addressGroup.value[index.value]
    })

    // 弹层状态（开和闭）
    const actions = reactive({
      appendAddress: false,
      modifyAddress: false,
      switchAddress: false,
    })

    // 操作的按钮
    const actionsBtn = reactive({
      switchAddress: computed(() => !addressGroup.value.length),
    })

    const open = (modal) => {
      if (Boolean(modal in actions) === false) return
      for (const key in actions) {
        actions[key] = false
      }
      actions[modal] = true
    }
    const close = (modal) => {
      console.log("modal:", modal)
      if (Boolean(modal in actions) === false) return
      actions[modal] = false
    }

    const appendAddress = (submitData) => {
      const copyData = reactive({ ...submitData })
      if (addressGroup.value.length === 0) {
        copyData.isDefault = 0
      }
      addressGroup.value.unshift(copyData)
    }

    const switchAddress = (address) => {
      if (!address) {
        return
      }
      const oldIndex = addressGroup.value.findIndex((item) => item?.isDefault === 0)
      const newIndex = addressGroup.value.findIndex((item) => item.id === address.id)
      console.log(oldIndex, newIndex)
      if (oldIndex !== -1) {
        addressGroup.value[oldIndex].isDefault = 1
      }
      addressGroup.value[newIndex].isDefault = 0
      console.log("addressGroup:", addressGroup.value)
      emit("change", currentAddress.value?.id)
    }

    const removeAddress = (addressId) => {
      const index = addressGroup.value.findIndex((item) => item.id === addressId)
      addressGroup.value.splice(index, 1)
      emit("change", currentAddress.value?.id)
    }

    const modifyAddress = (address) => {
      const index = addressGroup.value.findIndex((item) => item.id === address.id)
      addressGroup.value[index] = address
      emit("change", currentAddress.value?.id)
    }

    onMounted(() => {
      emit("change", currentAddress.value?.id)
    })
    return {
      addressGroup,
      actions,
      actionsBtn,
      currentAddress,
      open,
      close,
      appendAddress,
      switchAddress,
      removeAddress,
      modifyAddress,
    }
  },
}
</script>

<style lang="less" scoped>
.checkout-address {
  .ant-divider {
    font-size: 18px;
    font-weight: bold;
  }
}

.address-box {
  padding: 10px;
  border: 1px solid var(--xtx-borderColor-1);
  .address-box--wrapper {
    height: 100px;
    .now {
      .now-info {
        > p {
          margin: 0;
          padding: 5px 0;
        }
      }
      .now-modify {
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
      }
    }
    .empty {
      > span {
        color: var(--xtx-font-color-3);
      }
    }
    .option {
      .ant-row {
        height: inherit;
      }
    }
  }
}
</style>
