// PWA 아이콘 자동 생성 설정 - logo.svg를 소스로 사용
// @vite-pwa/assets-generator를 통해 public/ 폴더에 PNG 아이콘 생성

import { defineConfig, minimalPreset } from '@vite-pwa/assets-generator/config';

export default defineConfig({
	// 헤드리스 브라우저 없이 svg 변환 (resvg 사용)
	headLessChrome: false,
	preset: {
		...minimalPreset,
		apple: {
			sizes: [180],
		},
	},
	// logo.svg를 소스로 아이콘 생성 (public/logo.svg → public/ 폴더에 PNG 출력)
	images: ['public/logo.svg'],
});
