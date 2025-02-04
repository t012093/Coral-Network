import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // モックAPIサーバーのアドレス (今回はvite devサーバー自身を指す)
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // '/api' を削除
        configure: (proxy, options) => {
          // proxy will be an instance of 'http-proxy'
        }
      }
    }
  }
})
