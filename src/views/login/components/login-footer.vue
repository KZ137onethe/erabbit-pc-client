<template>
  <footer class="login-footer">
    <div class='container'>
      <p>
        <a href="javascript:;">关于我们</a>
        <a-divider type="vertical" />
        <a href="javascript:;">帮助中心</a>
        <a-divider type="vertical" />
        <a href="javascript:;">售后服务</a>
        <a-divider type="vertical" />
        <a href="javascript:;">配送与验收</a>
        <a-divider type="vertical" />
        <a href="javascript:;">商务合作</a>
        <a-divider type="vertical" />
        <a href="javascript:;">搜索推荐</a>
        <a-divider type="vertical" />
        <a href="javascript:;">友情链接</a>
      </p>
      <p>CopyRight &copy; 小兔鲜儿</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'login-footer'
}
</script>

<style scoped lang='less'>
.login-footer {
  padding: 30px 0 50px;
  background: #fff;
  p {
    text-align: center;
    color: #999;
    padding-top: 20px;
    a {
      line-height: 1;
      padding:0 10px;
      color: #999;
      display: inline-block;
    }
  }
}
</style>
