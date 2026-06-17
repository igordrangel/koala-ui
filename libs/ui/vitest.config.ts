import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['src/**/*.unit.spec.ts'],
    environment: 'node',
    globals: true,
    reporters: ['default'],
    passWithNoTests: true,
  },
});
