// 支付地址 => 后台支付基准地址 + 支付页面地址 + 订单ID
const redirect = encodeURIComponent("http://www.corho.com:8080/#/pay/callback")
const payUrlFn = (orderId) => {
  return `${import.meta.env.VITE_APP_BASE_API}/pay/aliPay?orderId=${orderId}&redirect=${redirect}`
}

export { payUrlFn }
