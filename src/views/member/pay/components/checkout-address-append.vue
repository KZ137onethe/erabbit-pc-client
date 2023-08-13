<template>
  <!-- 添加收货地址弹框 -->
  <a-modal
    v-model:visible="visible"
    class="checkout-address-append"
    title="添加收货地址"
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
          v-model:fullLocation="cityFullLocation"
          :placeholder="formFormat.fullLocation.placeholder"
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
import { reactive, computed } from "vue"
import { message } from "ant-design-vue"
import orderApi from "@/api/order"
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
export default {
  props: {
    open: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const visible = computed(() => props.open)
    const formState = reactive({
      receiver: "",
      contact: "",
      address: "",
      postalCode: "",
      addressTags: "",
      isDefault: 1,
      provinceCode: "",
      cityCode: "",
      countyCode: "",
      fullLocation: "",
    })

    const cityFullLocation = computed(
      () => formState.fullLocation || formFormat.fullLocation.placeholder,
    )
    const onFinish = () => {
      const copyFormState = reactive({ ...formState })
      delete copyFormState.fullLocation
      orderApi
        ._appendAddress(copyFormState)
        .then((res) => {
          copyFormState.id = res.result.id
          copyFormState.fullLocation = formState.fullLocation
          onClose()
          emit("submit", copyFormState)
          // 清空表单
          for (const key in formState) {
            if (key !== "isDefault") {
              formState[key] = ""
            }
          }
          message.success("地址添加成功!")
        })
        .catch((e) => {
          console.log(e)
          message.error(e.response.data.message)
        })
    }
    const onClose = () => {
      emit("close")
    }

    // 修改City城市组件时才会修改formState的地址编码
    const modifyAddress = (path) => {
      const { provinceCode, cityCode, countryCode, fullLocation } = path
      formState.provinceCode = provinceCode
      formState.cityCode = cityCode
      formState.countyCode = countryCode
      formState.fullLocation = fullLocation
    }
    return {
      layout,
      visible,
      formState,
      formFormat,
      cityFullLocation,
      onFinish,
      onClose,
      modifyAddress,
    }
  },
}
</script>

<style lang="less" scoped></style>
