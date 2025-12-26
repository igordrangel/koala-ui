import { defineConfig } from 'vitest/config';
import angular from '@angular/platform-browser-dynamic';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['vitest.setup.ts'],
    include: ['projects/**/*.spec.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'dist/',
        '.angular/',
        '**/*.spec.ts',
        'projects/doc/**',
      ],
    },
  },
});
