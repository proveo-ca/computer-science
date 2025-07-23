import { defineConfig } from 'vite'
import { resolve } from 'path'
import { glob } from 'glob'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'Algorithms',
      fileName: 'algorithms'
    },
    rollupOptions: {
      input: Object.fromEntries(
        glob.sync('src/**/*.ts', {
          ignore: ['src/**/*.spec.ts', 'src/**/*.test.ts']
        }).map(file => [
          // This remove `src/` as well as the file extension from each file, so e.g.
          // src/nested/foo.ts becomes nested/foo
          file.slice(4, file.length - 3),
          // This expands the relative paths to absolute paths, so e.g.
          // src/nested/foo.ts becomes /project/src/nested/foo.ts
          resolve(__dirname, file)
        ])
      )
    }
  }
})
