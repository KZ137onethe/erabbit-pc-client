<template>
  <div v-if="appraisalInfo" class="goods-tabs-comment">
    <header>
      <div class="comment-data">
        <div class="buy">
          <span>{{ appraisalInfo.salesCount }}</span>
          <span>人购买</span>
        </div>
        <div class="good-rate">
          <span>{{ appraisalInfo.praisePercent }}</span>
          <span>好评率</span>
        </div>
      </div>
      <div class="comment-tags">
        <a-row type="flex" :wrap="false">
          <a-col flex="100px" class="title">大家都在说：</a-col>
          <a-col flex="auto" class="tags">
            <a
              v-for="(item, index) in appraisalInfo.tags"
              :key="item"
              href="javascript:;"
              :class="{ active: currentTagIndex === index }"
              @click="changeTagIndex(index)"
            >
              {{ item.title }}（{{ item.tagCount }}）
            </a>
          </a-col>
        </a-row>
      </div>
    </header>
    <a-tabs v-model:activeKey="commentKey">
      <template #leftExtra>排序：</template>
      <a-tab-pane
        v-for="nowKey in Object.keys(tabsKey)"
        :key="nowKey"
        :tab="tabsKey[nowKey].message"
      >
        <template v-if="commentData">
          <a-comment v-for="data in commentData[pagination.currentPage - 1]" :key="data.id">
            <template #actions>
              <!-- 点赞部分 -->
              <span key="comment-basic-like">
                <span class="timer">
                  {{ data.createTime }}
                </span>
                <!-- 已点赞 -->
                <template v-if="action === 'liked'">
                  <svg-icon name="thumbs-up" size="18" color="#27BA9B" @click="like"></svg-icon>
                </template>
                <!-- 未点赞 -->
                <template v-else-if="action === 'like'">
                  <svg-icon name="thumbs-up" size="18" color="#333" @click="like"></svg-icon>
                </template>
                <!-- 点赞数 -->
                <span style="padding-left: 8px; cursor: auto; vertical-align: top">
                  {{ data.praiseCount }}
                </span>
              </span>
            </template>
            <template #author>
              <!-- 评价星级 -->
              <div class="star">
                <svg-icon name="star" size="18" color="#ff9240"></svg-icon>
                <svg-icon name="star" size="18" color="#ff9240"></svg-icon>
                <svg-icon name="star" size="18" color="#ff9240"></svg-icon>
                <svg-icon name="star" size="18" color="#ff9240"></svg-icon>
                <svg-icon name="star" size="18" color="#ff9240"></svg-icon>
              </div>
              <!-- 标签， 比如：颜色：白色；尺寸：10cm; 产地：美国 -->
              <template v-if="data.orderInfo">
                <span v-for="label in data.orderInfo?.specs" :key="label">
                  {{ `${label.name}: ${label.nameValue} ` }}
                </span>
              </template>
            </template>
            <!-- 用户头像 -->
            <template #avatar>
              <a-avatar :src="data.member?.avatar" alt="Han Solo" />
              <span>{{ data.member?.nickname }}</span>
            </template>
            <!-- 评论内容 -->
            <template #content>
              <p>
                {{ data.content }}
              </p>
              <!-- 预览图片 -->
              <goods-tabs-comment-preview-img
                v-if="data.pictures.length"
                :picture="data.pictures"
              />
            </template>
          </a-comment>
        </template>
      </a-tab-pane>
    </a-tabs>
    <!-- 分页组件 -->
    <a-pagination
      v-model:current="pagination.currentPage"
      :page-size="pagination.pageSize"
      :total="pagination.totalPage"
      @change="pageChange"
    />
  </div>
</template>

<script>
import { inject, ref, reactive, watch, toRefs } from "vue"
import GoodsTabsCommentPreviewImg from "./goods-tabs-comment-previewImg"
import productApi from "@/api/product"

export default {
  components: { GoodsTabsCommentPreviewImg },
  setup() {
    const goods = inject("goods")
    const appraisalInfo = goodsCommentCount(goods.value.id)
    const currentTagIndex = ref(0)

    // 评论状态
    const action = ref("liked")
    // 点赞数
    const likes = ref(0)
    // 评论所有排序方式的标签
    const tabsKey = reactive({
      default: {
        sortField: null,
        message: "默认",
      },
      newest: {
        sortField: "praiseCount",
        message: "最新",
      },
      hottest: {
        sortField: "createTime",
        message: "最热",
      },
    })
    // 当前评论排序的标签
    const commentKey = ref(Object.keys(tabsKey)[0])

    // 评论的筛选参数
    const commentParams = reactive({
      page: 1,
      pageSize: 10,
      hasPicture: null,
      tag: null,
      sortField: null,
    })

    const commentData = ref([])
    // 修改评论的 tag 和 hasPicture 的筛选参数
    const changeTagIndex = (index) => {
      currentTagIndex.value = index
      if (appraisalInfo.value.tags[index].type) {
        commentParams.tag = null
        commentParams.hasPicture = appraisalInfo.value.tags[index].type === "img"
      } else {
        commentParams.tag = appraisalInfo.value.tags[index].title
        commentParams.hasPicture = false
      }
    }

    // 监听commentKey， 修改评论的 sortField 的筛选参数
    watch(commentKey, (newValue) => {
      if (newValue) {
        commentParams.sortField = tabsKey[commentKey.value].sortField
      }
    })

    /**
     * 分页组件
     * 需要：当前页码，总页数，每页条数
     */
    const pagination = reactive({
      currentPage: 1,
      totalPage: undefined,
      pageSize: 2,
    })

    const { currentPage, totalPage, pageSize } = toRefs(pagination)

    // 修改当前页码， 第二个参数是 pageSize 的值
    const pageChange = (page, _) => {
      currentPage.value = page
    }

    // 监听commentParams
    watch(
      commentParams,
      async () => {
        // 获取商品评价分页数据
        const data = await productApi._findGoodsCommentData({
          id: goods.value.id,
          query: commentParams,
        })
        commentData.value = []
        const temp = ref([])
        data.result.items.forEach((item, index) => {
          const indexLen = data.result.items.length
          const len = index + 1
          temp.value.push(item)
          if (len % pageSize.value === 0 || len === indexLen) {
            commentData.value.push(temp.value)
            temp.value = []
          }
        })
        // 根据数据变化分组组件的属性
        totalPage.value = Math.ceil(data.result.items.length)
      },
      { immediate: true },
    )

    return {
      appraisalInfo,
      currentTagIndex,
      commentData,
      changeTagIndex,
      action,
      likes,
      tabsKey,
      commentKey,
      commentParams,
      pagination,
      pageChange,
    }
  },
}
// 获取商品评价的统计信息
const goodsCommentCount = (goodsId) => {
  const info = ref(null)
  productApi._findGoodsCommentInfo({ id: goodsId }).then((data) => {
    data.result.tags.unshift({
      type: "img",
      title: "有图",
      tagCount: data.result.hasPictureCount,
    })
    data.result.tags.unshift({
      type: "all",
      title: "全部评价",
      tagCount: data.result.praisePercent,
    })
    info.value = data.result
  })
  return info
}
</script>

<style lang="less" scoped>
.goods-tabs-comment {
  margin-bottom: 20px;

  header {
    display: flex;
    padding: 30px 0;

    .comment-data {
      display: flex;
      width: 340px;
      padding: 20px;
      border-right: 1px solid #ccc;

      > div {
        flex: 1;
        text-align: center;

        > span {
          display: block;

          &:first-child {
            font-size: 32px;
            color: @priceColor;
          }

          &:last-child {
            color: #999;
          }
        }
      }
    }

    .comment-tags {
      flex: 1;
      padding-right: 20px;

      .ant-row {
        width: 100%;
        height: 100%;

        .title {
          width: 100px;
          height: 100%;
          text-align: center;
        }

        .tags {
          display: flex;
          flex-flow: row wrap;

          a {
            width: 30%;
            height: 40px;
            margin: 0 auto 20px;
            border-radius: 4px;
            border: 1px solid #e4e4e4;
            background: var(--xtx-font-color-2);
            color: #999;
            text-align: center;
            line-height: 40px;

            &.active {
              border-color: @xtxColor;
              background: @xtxColor;
              color: #fff;
            }

            &:hover {
              border-color: @xtxColor;
              background: #e6faf6;
              color: @xtxColor;
            }
          }
        }
      }
    }
  }

  .ant-tabs {
    &:deep(.star) {
      display: inline;
      vertical-align: top;
      margin-right: 10px;
    }

    &:deep(.timer) {
      cursor: auto;
      vertical-align: top;
      margin-right: 10px;
    }

    // 去除鼠标hover， active等效果
    .ant-comment-actions > li > span {
      color: #595959;
      pointer-events: none;
      // 图标可正常使用
      span.i-icon {
        pointer-events: all;
        cursor: pointer;
      }
    }

    .ant-comment-avatar > span {
      margin-right: 5px;
    }
  }

  .ant-pagination {
    text-align: center;
  }
}
</style>
