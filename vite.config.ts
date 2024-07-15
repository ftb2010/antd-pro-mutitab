import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '');
  return {
    plugins: [react()],
    server: {
      host: "0.0.0.0",
      proxy: {
        "/api/v1": {
          target: env.VITE_SERVER_URL,
          changeOrigin: true,
          ws: true,
        },
      },
      fs: {
        strict: false,
      },
    },
  }
})