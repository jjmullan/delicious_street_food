// Supabase 클라이언트 설정
// Supabase 백엔드와 통신하기 위한 클라이언트입니다.

import { createClient } from '@supabase/supabase-js';

/**
 * Supabase 환경변수
 * .env 파일에 다음 변수들을 설정해야 합니다:
 * - VITE_SUPABASE_URL: Supabase 프로젝트 URL
 * - VITE_SUPABASE_ANON_KEY: Supabase anon/public key
 */
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
	console.warn(
		'Supabase 환경변수가 설정되지 않았습니다. .env 파일에 VITE_SUPABASE_URL과 VITE_SUPABASE_ANON_KEY를 추가해주세요.'
	);
}

/**
 * Supabase 클라이언트 인스턴스
 * - 인증, 데이터베이스, 스토리지, 실시간 기능 등에 접근 가능
 */
export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '', {
	auth: {
		// 세션 저장소 (기본값: localStorage)
		storage: localStorage,
		// 자동 토큰 갱신 활성화
		autoRefreshToken: true,
		// 탭 간 세션 감지 활성화
		detectSessionInUrl: true,
		// 세션 유지
		persistSession: true,
	},
});

/**
 * Database 타입 정의 (선택적)
 * Supabase CLI로 타입을 생성할 수 있습니다:
 * npx supabase gen types typescript --project-id "your-project-id" > src/shared/types/supabase.ts
 */
export type Database = {
	public: {
		Tables: Record<string, never>;
	};
};
