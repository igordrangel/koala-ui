import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['**/*.unit.spec.ts'],
    environment: 'node',
    globals: true,
    reporters: ['default'],
  },
});
