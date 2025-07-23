import { defineConfig } from 'vite'
import { resolve } from 'path'
import { glob } from 'glob'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'Algorithms',
      fileName: 'algorithms',
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: false
      }
    },
  },
});
