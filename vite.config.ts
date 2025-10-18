import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import ServerUrlCopy from 'vite-plugin-url-copy'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
    ServerUrlCopy(),
  ],
  server: {
        host: '0.0.0.0',
        port: 5174,
        proxy: {
          '/api': {
            target: 'http://localhost:8020/',
            changeOrigin: true
          }
        }
    },
  build: {
      target: 'es2015',
      cssTarget: 'chrome31',
      outDir: 'dist',
      rollupOptions: {
        plugins: [visualizer()],//编译的时候进行包分析
        // 拆包
        output: {
          manualChunks: {
            'react-chunks': ['react']
          }
        }
      },
      cssCodeSplit: !(true),
    }
})
