import { defineConfig } from "vite"
import path from "path"
import createVitePlugins from "./vite/plugins"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: createVitePlugins(),
  css: {
    preprocessorOptions: {
      less: {
        // 自动导入 全局的less文件
        additionalData: `
          @import "./src/assets/styles/variables.less";
          @import "./src/assets/styles/mixin.less";
          @import "./src/assets/styles/effect.less";
        `,
        javascriptEnabled: true,
      },
    },
  },
  resolve: {
    // 使用别名'@'替代根目录
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    extensions: [".js", ".vue", ".json", ".ts", ".tsx", ".jsx", ".mjs", ".wasm"],
  },
  server: {
    port: 8080,
  },
  build: {
    rollupOptions: {
      external: {
        qc: "QC",
      },
    },
  },
})
