import { defineConfig } from 'tsup';

export default defineConfig({
    clean: true,
    target: 'esnext',
    treeshake: true,
    minify: true,
})