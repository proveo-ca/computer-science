import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true,
    }),
  ],
  resolve: {
    extensions: ['.ts', '.js', '.json'],
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'index.ts'),
      name: 'CSDatatypes',
      formats: ['es', 'cjs'],
      fileName: (format: string) => `index.${format === 'es' ? 'mjs' : 'cjs'}`,
    },
    rollupOptions: {
      external: [],
      output: {
        preserveModules: false,
      },
    },
  },
});
