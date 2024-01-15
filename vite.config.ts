import {defineConfig} from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
    base: '/',

    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `
              @import "./src/assets/styles/main.scss";
            `
            }
        }
    }
})
