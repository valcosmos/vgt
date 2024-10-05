import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/cli/bin/cli.ts'],
  bundle: true,
  splitting: true,
  outDir: 'dist',
  format: ['cjs', 'esm'],
  dts: true,
  shims: true,
  clean: true,
})
