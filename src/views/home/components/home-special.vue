<template>
  <div ref="target" class="home-special">
    <home-panel title="最新专题" sub-title="">
      <template #head-right>
        <XtxMore />
      </template>
      <template #main>
        <a-row type="flex" :gutter="16" :wrap="false">
          <a-col v-for="item in special" :key="item.id" flex="1">
            <a-card>
              <template #cover>
                <RouterLink to="/" class="coverLink">
                  <img :src="item.cover" alt="" class="cover" />
                  <div class="meta">
                    <div class="introduce">
                      <span class="ellipsis">{{ item.title }}</span>
                      <span class="ellipsis">{{ item.summary }}</span>
                    </div>
                    <span class="price">&yen;{{ item.lowestPrice }}起</span>
                  </div>
                </RouterLink>
              </template>
              <template #actions>
                <div class="collection">
                  <heart-outlined />
                  &nbsp;
                  <span>{{ item.collectNum }}</span>
                </div>
                <div class="browse">
                  <eye-outlined />
                  &nbsp;
                  <span>{{ item.viewNum }}</span>
                </div>
                <div class="comments">
                  <message-outlined />
                  &nbsp;
                  <span>{{ item.replyNum }}</span>
                </div>
              </template>
            </a-card>
          </a-col>
        </a-row>
      </template>
    </home-panel>
  </div>
</template>

<script>
import { HeartOutlined, EyeOutlined, MessageOutlined } from "@ant-design/icons-vue"
import HomePanel from "./home-panel"
import { useLazyData } from "@/utils/heigo-pc"
import homeApi from "@/api/home"

export default {
  components: {
    HomePanel,
    HeartOutlined,
    EyeOutlined,
    MessageOutlined,
  },
  setup() {
    const { target, res } = useLazyData(homeApi._findSpecial)
    return {
      target,
      special: res,
    }
  },
}
</script>

<style lang="less" scoped>
.home-special {
  position: relative;
  .ant-card {
    .hoverShadow();
  }
  &:deep(.coverLink) {
    position: relative;
    .cover {
      width: 100%;
      height: 288px;
      object-fit: cover;
    }
    .meta {
      position: absolute;
      bottom: 0;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-around;
      padding: 5px 10px;
      .introduce {
        width: 250px;
        margin: 0;
        span {
          display: inline-block;
          width: 100%;
          &:first-child {
            color: #fff;
            font-size: 22px;
          }
          &:last-child {
            font-size: 19px;
            color: #999;
          }
        }
      }
      .price {
        display: inline-block;
        width: 80px;
        height: 80%;
        font-size: 17px;
        text-align: center;
        color: @priceColor;
        background-color: #fff;
        border-radius: 2px;
        padding: 4px 8px 4px 7px;
      }
    }
  }
}
</style>
