<script>
// 使用JavaScript的完全编程能力
import { h } from 'vue'
import { RightOutlined } from '@ant-design/icons-vue'
export default {
  name: 'XtxBread',
  components: {
    RightOutlined
  },
  setup (props, { slots }) {
    const items = slots.default()
    const dynamicItems = items.map((item, index) => {
      // 最后一个不返回右箭头图标
      if (index !== items.length - 1) return [item, h(RightOutlined)]
      return item
    })
    return () => {
      return h('div', { class: 'xtx-bread' }, dynamicItems)
    }
  }
}
</script>

<style lang='less'>
.xtx-bread{
  display: flex;
  padding: 25px 10px;
  &-item {
      a {
        color: #666;
        transition: all .4s;
        &:hover {
            color: @xtxColor;
        }
      }
  }
  i {
      font-size: 12px;
      margin-left: 5px;
      margin-right: 5px;
      line-height: 22px;
  }
}
</style>
