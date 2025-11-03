// Vitest 테스트 설정 파일
// React 컴포넌트 및 유닛 테스트를 위한 설정을 정의합니다.

import path from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    // jsdom 환경을 사용하여 브라우저 환경 시뮬레이션
    environment: 'jsdom',
    // 테스트 실행 전 전역 설정 파일
    setupFiles: ['./src/shared/config/test-setup.ts'],
    // 테스트 파일 glob 패턴
    include: ['**/*.{test,spec}.{ts,tsx}'],
    // 코드 커버리지 설정
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'src/shared/config/', '**/*.config.ts', '**/*.d.ts'],
    },
  },
  resolve: {
    // Vite와 동일한 path alias 설정
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@app': path.resolve(__dirname, './src/app'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@widgets': path.resolve(__dirname, './src/widgets'),
      '@features': path.resolve(__dirname, './src/features'),
      '@entities': path.resolve(__dirname, './src/entities'),
      '@shared': path.resolve(__dirname, './src/shared'),
    },
  },
});
