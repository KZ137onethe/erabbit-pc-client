<template>
  <div class="home-panel">
    <div class="container">
      <div class="head">
        <h3>
          {{ title }}
          <small>{{ subTitle }}</small>
        </h3>
        <slot name="head-right"></slot>
      </div>
      <div class="main">
        <slot name="main"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomePanel",

  props: {
    title: {
      type: String,
      default: "一级标题",
    },
    subTitle: {
      type: String,
      default: "二级标题",
    },
  },
}
</script>

<style lang="less" scoped>
.home-panel {
  background-color: #fff;
  .head {
    padding: 40px 0;
    display: flex;
    align-items: flex-end;
    h3 {
      flex: 1;
      font-size: 32px;
      font-weight: normal;
      margin-left: 4px;
      height: 32px;
      line-height: 32px;
      small {
        font-size: 16px;
        color: #999;
        margin-left: 20px;
      }
    }
  }
}
</style>
