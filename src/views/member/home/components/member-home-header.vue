<template>
  <a-layout-header class="member-home--header" :style="BackgroundStyle">
    <a-row type="flex" justify="space-around" align="center">
      <a-col class="header--avatar">
        <img :src="profile.avatar" />
        <span>{{ profile.account }}</span>
      </a-col>
      <a-col class="header--option">
        <a-row type="flex" justify="space-around" align="center">
          <a-col class="header--members">
            <sketch-outlined />
            <span>会员中心</span>
          </a-col>
          <a-col class="header--security">
            <setting-outlined />
            <span>安全设置</span>
          </a-col>
          <a-col class="header--address">
            <environment-outlined />
            <span>地址管理</span>
          </a-col>
        </a-row>
      </a-col>
    </a-row>
  </a-layout-header>
</template>

<script>
import { SketchOutlined, SettingOutlined, EnvironmentOutlined } from "@ant-design/icons-vue"

import { getCurrentInstance } from "vue"
import backgroundImg from "@/assets/images/center-bg.png"

const BackgroundStyle = `background: url(${backgroundImg}) no-repeat center/cover`

export default {
  components: {
    SketchOutlined,
    SettingOutlined,
    EnvironmentOutlined,
  },
  setup() {
    const { proxy } = getCurrentInstance()
    const { profile } = proxy.$store.useState("user", ["profile"])
    return {
      profile,
      BackgroundStyle,
    }
  },
}
</script>

<style lang="less" scoped>
.member-home--header {
  background-color: var(--xtx-bg-color-1);
  padding: 0;
  height: 132px;
  .ant-row {
    width: 100%;
    height: 132px;
    line-height: 132px;
    overflow: hidden;
    .ant-col {
      text-align: center;
      height: 100%;
      span {
        color: white;
      }
    }
  }
  .header--avatar {
    img {
      width: 85px;
      height: 85px;
      border-radius: 50%;
    }
    span {
      font-size: 18px;
      width: 80px;
      display: inline-block;
    }
  }
  .header--option {
    width: 500px;
    .ant-col {
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      align-items: center;
      .anticon {
        width: 100%;
        > :deep(svg) {
          width: 40px;
          height: 40px;
          fill: white;
        }
      }
      :deep(span:last-child) {
        display: inline;
        line-height: 32px;
      }
    }
  }
}
</style>
