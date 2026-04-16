// TailwindCSS v4 Vite 플러그인 추가
// vite-plugin-pwa: PWA 적용을 위한 Service Worker 자동 생성

import path from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
	// TailwindCSS 플러그인을 React 플러그인과 함께 사용
	plugins: [
		react(),
		tailwindcss(),
		VitePWA({
			// 앱 업데이트 시 자동으로 새 Service Worker 등록
			registerType: 'autoUpdate',
			// Workbox 기반 Service Worker 자동 생성
			strategies: 'generateSW',
			// 개발 모드에서도 PWA 동작 확인 가능
			devOptions: {
				enabled: true,
			},
			// Web App Manifest 설정
			manifest: {
				name: '포장맛차',
				short_name: '포장맛차',
				description: '주변 포장마차와 길거리 음식을 찾아보세요',
				lang: 'ko-KR',
				theme_color: '#d4944a',
				background_color: '#fafaf8',
				display: 'standalone',
				orientation: 'portrait',
				scope: '/',
				start_url: '/',
				icons: [
					{
						src: 'pwa-64x64.png',
						sizes: '64x64',
						type: 'image/png',
					},
					{
						src: 'pwa-192x192.png',
						sizes: '192x192',
						type: 'image/png',
					},
					{
						src: 'pwa-512x512.png',
						sizes: '512x512',
						type: 'image/png',
					},
					{
						src: 'maskable-icon-512x512.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'maskable',
					},
				],
			},
			// Workbox 캐싱 전략 설정
			workbox: {
				// SPA 전체 라우트를 index.html로 폴백 (오프라인 네비게이션 지원)
				navigateFallback: 'index.html',
				// API 요청은 네비게이션 폴백에서 제외
				navigateFallbackDenylist: [/^\/api\//],
				// 앱 셸(HTML, JS, CSS) 자동 프리캐시
				globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
				runtimeCaching: [
					{
						// 카카오 맵 API - Network First (지도 데이터 최신성 유지)
						urlPattern: /^https:\/\/dapi\.kakao\.com\/.*/i,
						handler: 'NetworkFirst',
						options: {
							cacheName: 'kakao-map-cache',
							expiration: {
								maxEntries: 10,
								maxAgeSeconds: 60 * 60 * 24, // 24시간
							},
						},
					},
					{
						// Supabase API - Network First (데이터 최신성 유지)
						urlPattern: /^https:\/\/.*\.supabase\.co\/.*/i,
						handler: 'NetworkFirst',
						options: {
							cacheName: 'supabase-api-cache',
							expiration: {
								maxEntries: 50,
								maxAgeSeconds: 60 * 60, // 1시간
							},
							networkTimeoutSeconds: 10,
						},
					},
					{
						// Google/CDN 폰트 - Cache First (정적 리소스)
						urlPattern: /^https:\/\/cdn\.jsdelivr\.net\/.*/i,
						handler: 'CacheFirst',
						options: {
							cacheName: 'cdn-font-cache',
							expiration: {
								maxEntries: 10,
								maxAgeSeconds: 60 * 60 * 24 * 365, // 1년
							},
						},
					},
				],
			},
		}),
	],
	build: {
		chunkSizeWarningLimit: 3_000, // KB
		rollupOptions: {
			output: {
				manualChunks: {
					'character-assets': [
						'./src/shared/assets/character/defaultavatar.svg',
						'./src/shared/assets/character/eggbun.svg',
						'./src/shared/assets/character/fishshapedbun.svg',
						'./src/shared/assets/character/foodstall.svg',
						'./src/shared/assets/character/hoppang.svg',
						'./src/shared/assets/character/hotteok.svg',
						'./src/shared/assets/character/roastedchestnuts.svg',
						'./src/shared/assets/character/roastedsweetpotato.svg',
						'./src/shared/assets/character/walnutcake.svg',
						'./src/shared/assets/character/tteokbokki.svg',
						'./src/shared/assets/character/peanutbread.svg',
						'./src/shared/assets/logo-email.svg',
						'./src/shared/assets/logo-google.svg',
						'./src/shared/assets/logo-kakao.svg',
						'./src/shared/assets/logo.svg',
					],
				},
			},
		},
	},
	server: {
		// 로컬 개발 시 /api/* 요청을 Vercel Functions 서버(3000)로 프록시
		proxy: {
			'/api': 'http://localhost:3000',
		},
	},
	resolve: {
		alias: {
			// '@': path.resolve(__dirname, './src'),
			'@app': path.resolve(__dirname, './src/app'),
			'@pages': path.resolve(__dirname, './src/pages'),
			'@widgets': path.resolve(__dirname, './src/widgets'),
			'@features': path.resolve(__dirname, './src/features'),
			'@entities': path.resolve(__dirname, './src/entities'),
			'@shared': path.resolve(__dirname, './src/shared'),
		},
	},
});
