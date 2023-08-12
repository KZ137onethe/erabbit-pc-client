<template>
  <div class="sub-sort">
    <div class="sort-label">
      <a-checkable-tag :class="{ ...onlySelected(null) }" @change="sortHandle(null)">
        默认排序
      </a-checkable-tag>
      <a-checkable-tag
        :class="{ ...onlySelected('publishTime') }"
        @change="sortHandle('publishTime')"
      >
        最新商品
      </a-checkable-tag>
      <a-checkable-tag :class="{ ...onlySelected('orderNum') }" @change="sortHandle('orderNum')">
        最高人气
      </a-checkable-tag>
      <a-checkable-tag
        :class="{ ...onlySelected('evaluateNum') }"
        @change="sortHandle('evaluateNum')"
      >
        评论最多
      </a-checkable-tag>
      <div class="sort-price">
        <a-checkable-tag @change="sortHandle('price')">
          <span>价格排序</span>
          <div class="selectIcon">
            <caret-up-outlined :class="{ ...onlySelected('price', (sort = 'asc')) }" />
            <caret-down-outlined :class="{ ...onlySelected('price', (sort = 'desc')) }" />
          </div>
        </a-checkable-tag>
      </div>
    </div>
    <div class="sort-checkbox">
      <a-checkbox v-model:checked="sortParams.inventory" @change="checkboxHandle">
        仅显示有货商品
      </a-checkbox>
      <a-checkbox v-model:checked="sortParams.onlyDiscount" @change="checkboxHandle">
        仅显示特惠商品
      </a-checkbox>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue"
import { CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons-vue"

export default {
  components: {
    CaretUpOutlined,
    CaretDownOutlined,
  },
  setup(props, { emit }) {
    // 1. 根据后台需要的参数定义数据对象
    // 2. 根据数据对象，绑定组件（复选框，排序按钮）
    // 3. 在操作排序组件的时候，需要反馈给数据对象
    // sortField ==> publishTime,orderNum,price,evaluateNum
    // sortMethod====>asc为正序 desc为倒序
    const sortParams = reactive({
      inventory: false,
      onlyDiscount: false,
      sortField: null,
      sortMethod: null,
    })
    const onlySelected = (attribute, sort = null) => {
      const active = { active: sortParams.sortField === attribute }
      if (sort === "asc" || sort === "desc") {
        active.active = active.active && sortParams.sortMethod === sort
      }
      return active
    }
    const sortHandle = (sortField) => {
      // 处理其余正常的标签逻辑
      if (sortField !== "price") {
        // 1.重复点击同一标签 2.切换标签
        if (sortField === sortParams.sortField) return
        sortParams.sortField = sortField
        sortParams.sortMethod = null
      }
      // 处理价格排序逻辑
      if (sortField === "price") {
        sortParams.sortField = "price"
        // 如果第一次点击，取倒序，否则顺序取反
        if (sortParams.sortMethod === null) {
          sortParams.sortMethod = "desc"
        } else {
          sortParams.sortMethod = sortParams.sortMethod === "desc" ? "asc" : "desc"
        }
      }
      // 通知父组件排序已改变
      emit("sortChange", sortParams)
    }
    const checkboxHandle = () => {
      // 通知父组件筛选条件已改变
      emit("sortChange", sortParams)
    }
    return {
      sortParams,
      onlySelected,
      sortHandle,
      checkboxHandle,
    }
  },
}
</script>

<style lang="less" scoped>
.sub-sort {
  display: flex;
  flex-flow: row nowrap;
  height: 80px;
  align-items: center;
  justify-content: space-between;
  color: var(--xtx-font-color-2);
  .sort-label {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    :deep(.ant-tag) {
      border: 1px solid #aaa;
      border-radius: 2px;
      height: 30px;
      line-height: 28px;
      padding: 0 10px;
      margin-right: 20px;
      font-size: 12px;
      transition: all 0.3s;
      &.active {
        color: #fff;
        background: @xtxColor;
        border: 1px solid @xtxColor;
      }
      .selectIcon {
        height: 16px;
        display: inline-block;
        vertical-align: text-top;
        > span {
          display: block;
          color: var(--xtx-font-color-2);
          padding-left: 3px;
          font-size: 9px;
          &.active {
            color: @xtxColor;
          }
        }
      }
    }
  }
}
</style>
