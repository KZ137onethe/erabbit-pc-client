import { defineConfig } from "vite"
import path from "path"
import createVitePlugins from "./vite/plugins"

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    plugins: createVitePlugins(),
    resolve: {
      // 使用别名'@'替代根目录
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
      extensions: [".js", ".vue", ".json", ".ts", ".tsx", ".jsx", ".mjs", ".wasm"],
    },
    css: {
      loaderOptions: {},
      preprocessorOptions: {
        less: {
          additionalData: `
          @import "./src/assets/styles/mixin.less";
          @import "./src/assets/styles/variables.less";
          `,
          javascriptEnabled: true,
        },
      },
    },
    server: {
      port: 8080,
      host: true,
      open: true,
      proxy: {
        "/dev-api": {
          // 备用地址: 'http://pcapi-xiaotuxian-front-devtest.itheima.net/'
          target: "https://apipc-xiaotuxian-front.itheima.net",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/dev-api/, ""),
        },
      },
    },
    build: {
      rollupOptions: {
        external: {
          qc: "QC",
        },
      },
    },
  }
})
