<template>
  <a-modal
    v-model:visible="visible"
    class="checkout-address-switch"
    title="切换收货地址"
    @ok="onFinish"
    @cancel="onClose"
  >
    <div
      v-for="(address, index) in addressList"
      :key="address.id"
      class="address-item"
      :class="{ selected: address.selected }"
      @click="selected(address)"
    >
      <a-row align="middle" :wrap="false">
        <a-col :span="20">
          <a-descriptions size="small" :column="1">
            <a-descriptions-item label="收货人">{{ address.receiver }}</a-descriptions-item>
            <a-descriptions-item label="联系方式">{{ address.contact }}</a-descriptions-item>
            <a-descriptions-item label="收货地址">
              {{ address.fullLocation + address.address }}
            </a-descriptions-item>
          </a-descriptions>
        </a-col>
        <a-col :span="4">
          <a-popover
            v-model:visible="popoverVisible[index]"
            trigger="click"
            placement="bottomRight"
          >
            <template #title>
              <span style="color: blue">你确认删除该地址吗?</span>
            </template>
            <template #content>
              <a-space :size="8">
                <a-button size="small" type="text" @click="popoverControl(index, false)">
                  取消
                </a-button>
                <a-button size="small" danger @click="deleteAddress(address.id)">确认</a-button>
              </a-space>
            </template>
            <a-button type="dashed" @click="popoverControl(index, true)">删除</a-button>
          </a-popover>
        </a-col>
      </a-row>
    </div>
  </a-modal>
</template>

<script>
import { watch, computed, ref, toRefs } from "vue"
import orderApi from "@/api/order"

export default {
  props: {
    open: {
      type: Boolean,
      default: false,
    },
    addressGroup: {
      type: Array,
      required: true,
    },
  },
  setup(props, { emit }) {
    const visible = computed(() => props.open)
    const addressList = computed(() => {
      // 这里不能用解构赋值和Object.assign, 因为数组中的元素是对象会进行引用
      // 进行深拷贝
      const copy = ref(JSON.parse(JSON.stringify(props.addressGroup)))
      for (let i = 0; i < copy.value.length; i++) {
        copy.value[i] = toRefs(copy.value[i])
      }

      return copy.value
    })

    watch(
      () => addressList.value.filter((item) => item.isDefault),
      (_newList, _oldList) => {
        addressList.value.forEach((item) => {
          const value = item.isDefault
          // console.log('value:', value)
          item.selected = !value
        })
      },
    )

    const currentAddress = computed(() => {
      const [filter] = addressList.value.filter((item) => item.isDefault === 0)
      return filter
    })

    // 选中操作
    const selected = (address) => {
      if (address?.isDefault.value === 0) {
        return
      }
      if (Object.keys(address).length !== 0) {
        for (let i = 0; i < addressList.value.length; i++) {
          addressList.value[i].isDefault = ref(1)
        }
        const index = addressList.value.findIndex((item) => item.id === address.id)
        addressList.value[index].isDefault = ref(0)
        // console.log('addressList:', addressList)
      }
    }

    const deleteAddress = (addressId) => {
      const id = addressId ?? false
      if (id) {
        orderApi._removeAddress(id).then(() => {
          emit("delete", id)
        })
      }
    }

    const onFinish = () => {
      ;[currentAddress.value] = addressList.value.filter((item) => item.selected === true)
      const copy = { ...currentAddress.value }
      delete copy.selected
      emit("change", copy)
      onClose()
    }

    const onClose = () => {
      emit("close")
    }

    // 地址栏删除选项弹层
    const popoverVisible = ref([])
    watch(
      () => addressList.value.length,
      (newValue) => {
        const len = newValue
        popoverVisible.value = new Array(len).fill(false)
      },
    )
    const popoverControl = (index, status) => {
      popoverVisible.value[index] = status
    }
    return {
      visible,
      popoverVisible,
      addressList,
      currentAddress,
      onFinish,
      onClose,
      popoverControl,
      selected,
      deleteAddress,
    }
  },
}
</script>

<style lang="less" scoped>
.address--active {
  border-color: @xtxColor;
  background-color: var(--xtx-bg-success);
  cursor: pointer;
}
div.address-item {
  box-sizing: content-box;
  padding: 10px;
  border: 1px solid var(--xtx-borderColor-1);
  margin: 5px 0;
  &:hover {
    .address--active();
  }
  &.selected {
    .address--active();
  }
}
</style>
