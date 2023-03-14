<template>
    <div class="home-skeleton">
        <a-row :gutter="16" type="flex">
            <a-col flex="1" v-for="num in itemNum" :key="num">
                <a-card>
                  <template #cover>
                      <XtxSkeleton  width="100%" height="306px" animation />
                  </template>
                  <a-card-meta>
                      <template #title>
                        <XtxSkeleton width="160px" height="24px" animation />
                      </template>
                      <template #description>
                        <XtxSkeleton width="120px" height="24px" animation />
                      </template>
                  </a-card-meta>
                </a-card>
             </a-col>
        </a-row>
    </div>
</template>

<script>

export default {
  // TODO:优化该骨架屏
  props: {
    itemNum: {
      type: Number,
      default: 4
    }
  }
}
</script>

<style lang="less" scoped>
.home-skeleton {
  width: 1240px;
  height: 406px;
  &:deep(.ant-card-meta){
    &-detail{
      text-align: center;
    }
  }
}
</style>
