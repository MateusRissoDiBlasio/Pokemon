import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

// LOCAL
// export default defineConfig({
//   plugins: [svgr(), react()],
//   base: "/",
//   build: {
//     target: 'esnext'
//   }
// })



// GITHUB

export default defineConfig({
  plugins: [svgr(), react()],
  base: "/Pokemon/",
  build: {
    target: 'esnext'
  }
})