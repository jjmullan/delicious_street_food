// TailwindCSS v4 Vite 플러그인 추가

import path from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
	// TailwindCSS 플러그인을 React 플러그인과 함께 사용
	plugins: [react(), tailwindcss()],
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
	resolve: {
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
