<template>
  <div class="login-tabs-QRcode">
    <img src="@/assets/images/qrcode.jpg" alt="">
    <p>打开 <a href="javascript:;">小兔鲜App</a> 扫码登录</p>
  </div>
</template>

<script>
export default {
  name: 'login-tabs-QR'
}
</script>

<style scoped lang="less">
.login-tabs-QRcode{
  text-align: center;
  padding: 40px 0;
  p{
    margin-top: 20px;
    a{
      color: @xtxColor;
      font-size: 16px;
    }
  }
}
</style>
