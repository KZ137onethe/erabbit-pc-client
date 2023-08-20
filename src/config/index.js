const env = import.meta.env.MODE || "production"
const EnvConfig = {
  development: {
    BaseApi: "/dev-api",
    MockApi: "/mock-api",
  },
  production: {
    BaseApi: "/",
    MockApi: "/",
  },
}
export default {
  env,
  mock: true,
  namespace: "heigo-pc",
  ...EnvConfig[env],
}
