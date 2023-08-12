<template>
  <a-modal
    v-model:visible="visible"
    class="checkout-address-modify"
    title="修改收货地址"
    @ok="onFinish"
    @cancel="onClose"
  >
    <a-form :model="formState" v-bind="layout" name="nest-messages" autocomplete="off">
      <a-form-item name="receiver" :label="formFormat.receiver.label" :rules="[{ required: true }]">
        <a-input
          v-model:value="formState.receiver"
          :placeholder="formFormat.receiver.placeholder"
        />
      </a-form-item>
      <a-form-item name="contact" :label="formFormat.contact.label" :rules="[{ required: true }]">
        <a-input v-model:value="formState.contact" :placeholder="formFormat.contact.placeholder" />
      </a-form-item>
      <a-form-item
        name="fullLocation"
        :label="formFormat.fullLocation.label"
        :rules="[{ required: true }]"
      >
        <XtxCity
          v-model:placeholder="formState.fullLocation"
          v-model:fullLocation="formFormat.fullLocation"
          @change="modifyAddress"
        ></XtxCity>
      </a-form-item>
      <a-form-item name="address" :label="formFormat.address.label" :rules="[{ required: true }]">
        <a-input v-model:value="formState.address" :placeholder="formFormat.address.placeholder" />
      </a-form-item>
      <a-form-item
        name="postalCode"
        :label="formFormat.postalCode.label"
        :rules="[{ required: true }]"
      >
        <a-input
          v-model:value="formState.postalCode"
          :placeholder="formFormat.postalCode.placeholder"
        />
      </a-form-item>
      <a-form-item name="addressTags" :label="formFormat.addressTags.label">
        <a-input
          v-model:value="formState.addressTags"
          :placeholder="formFormat.addressTags.placeholder"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import { computed, reactive } from "vue"
import { message } from "ant-design-vue"
import { orderApi } from "@/api"
import "ant-design-vue/es/message/style/css"

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 20,
  },
}
const formFormat = reactive({
  receiver: {
    label: "收货人",
    placeholder: "请输入收货人",
  },
  contact: {
    label: "联系方式",
    placeholder: "请输入手机号",
  },
  fullLocation: {
    label: "地区",
    placeholder: "请选择所在地区",
  },
  address: {
    label: "详细地址",
    placeholder: "请输入你所在地区的详细位置",
  },
  postalCode: {
    label: "邮政编码",
    placeholder: "请输入邮政编码",
  },
  addressTags: {
    label: "地址标签",
    placeholder: "请输入地址标签，逗号分隔",
  },
})
const { _modifyAddress } = orderApi
export default {
  props: {
    open: {
      type: Boolean,
      default: false,
    },
    address: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit }) {
    const visible = computed(() => props.open)
    const formState = computed(() => {
      const copy = { ...props.address }
      return copy
    })
    const onClose = () => {
      emit("close")
    }
    const onFinish = () => {
      const addressId = formState.value?.id
      if (addressId) {
        _modifyAddress({ addressId, address: formState.value })
          .then(() => {
            emit("change", formState.value)
            onClose()
            message.success("修改收货地址成功")
          })
          .catch((e) => {
            throw new Error(e)
          })
      }
    }
    const modifyAddress = (path) => {
      const { provinceCode, cityCode, countryCode, fullLocation } = path
      formState.value.provinceCode = provinceCode
      formState.value.cityCode = cityCode
      formState.value.countyCode = countryCode
      formState.value.fullLocation = fullLocation
    }

    return {
      layout,
      formState,
      formFormat,
      visible,
      onClose,
      onFinish,
      modifyAddress,
    }
  },
}
</script>

<style lang="less" scoped></style>
