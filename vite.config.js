import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// 自动按需导入antd组件
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [AntDesignVueResolver()]
    })
  ],
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
      '@': path.resolve( __dirname, './src' )
    },
    extensions: ['.js', '.vue', '.json', '.ts', '.tsx', '.jsx', '.mjs', '.wasm']
  }
})
