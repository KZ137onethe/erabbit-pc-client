<template>
  <header class="login-header">
    <div class="container">
      <a-row type="flex" justify="space-between" align="center">
        <a-col class="title">
          <a-space>
            <router-link to="/">
              <img src="@/assets/images/logo.png" alt="">
            </router-link>
            <h3>
              <slot name="subTitle"></slot>
            </h3>
          </a-space>
        </a-col>
        <a-col class="right-entry">
          <router-link to="/">
            <a-space>
              <span>进入网站首页</span>
              <DoubleRightOutlined />
            </a-space>
          </router-link>
        </a-col>
      </a-row>
    </div>
  </header>
</template>

<script>
import { DoubleRightOutlined } from '@ant-design/icons-vue'
export default {
  name: 'login-header',
  components: {
    DoubleRightOutlined
  }
}
</script>

<style scoped lang="less">
.container{
  height: 100%;
}

header.login-header{
  height: 110px;
  background-color: white;
  border-bottom: 1px solid #e4e4e4;
  .ant-row{
    width: 100%;
    height: inherit;
    .ant-col{
      height: 80px;
      display: flex;
      flex-flow: row nowrap;
      align-items: flex-end;
      margin: auto 0;
      &.title{
        img{
          width: 200px;
          height: inherit;
        }
        &:deep(h3){
          display: inline-block;
          transform: translateY(100%);
        }
      }
      &.right-entry{
        transform: translateY(-10%);
      }
    }
  }
}
</style>
