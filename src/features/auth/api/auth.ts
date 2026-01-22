import supabase from '@shared/api/supabase/supabase';
import type { Provider } from '@supabase/supabase-js';

/**
 * @description 이메일과 비밀번호로 신규 사용자 회원가입을 처리합니다.
 * @param {Object} params - 회원가입 파라미터
 * @param {string} params.email - 사용자 이메일 주소
 * @param {string} params.password - 사용자 비밀번호 (최소 6자 이상)
 * @returns {Promise<AuthResponse>} 회원가입 성공 시 사용자 데이터 및 세션 정보
 * @throws {Error} 회원가입 실패 시 Supabase 에러 발생
 * @example
 * const result = await SignUpWithEmail({
 *   email: 'user@example.com',
 *   password: 'secure123'
 * });
 */
export async function SignUpWithEmail({ email, password }: { email: string; password: string }) {
	const { data, error } = await supabase.auth.signUp({
		email,
		password,
	});

	if (error) throw error;
	return data;
}

/**
 * @description 이메일과 비밀번호를 사용하여 기존 사용자 로그인을 처리합니다.
 * @param {Object} params - 로그인 파라미터
 * @param {string} params.email - 사용자 이메일 주소
 * @param {string} params.password - 사용자 비밀번호
 * @returns {Promise<AuthResponse>} 로그인 성공 시 사용자 데이터 및 세션 정보
 * @throws {Error} 로그인 실패 시 Supabase 에러 발생 (잘못된 자격 증명, 계정 미인증 등)
 * @example
 * const result = await SignInWithPassword({
 *   email: 'user@example.com',
 *   password: 'secure123'
 * });
 */
export async function SignInWithPassword({ email, password }: { email: string; password: string }) {
	const { data, error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});

	if (error) throw error;
	return data;
}

/**
 * @description OAuth 제공자를 통한 소셜 로그인 인증을 처리합니다.
 * @param {Provider} provider - OAuth 제공자 ('google', 'kakao', 'github' 등)
 * @returns {Promise<OAuthResponse>} OAuth 인증 URL 및 제공자 정보
 * @throws {Error} OAuth 인증 요청 실패 시 Supabase 에러 발생
 * @example
 * const result = await SignInWithOAuth('google');
 * // 사용자를 OAuth 제공자의 로그인 페이지로 리디렉션
 */
export async function SignInWithOAuth(provider: Provider) {
	const { data, error } = await supabase.auth.signInWithOAuth({
		provider,
		options: {
			queryParams: {
				access_type: 'offline',
				prompt: 'consent',
			},
		},
	});

	if (error) throw error;
	return data;
}

/**
 * @description 현재 로그인된 사용자의 세션을 종료하고 로그아웃을 처리합니다.
 * @returns {Promise<void>} 로그아웃 완료 시 반환값 없음
 * @throws {Error} 로그아웃 실패 시에도 로컬 세션을 강제로 삭제하여 에러를 방지
 * @example
 * await signOut();
 * // 사용자 세션 종료 및 로컬 스토리지 액세스 토큰 삭제
 */
export async function SignOut() {
	const { error } = await supabase.auth.signOut();

	// 에러가 발생하면, 로컬 스토리지에 보관된 엑세스 토큰을 삭제
	if (error) {
		await supabase.auth.signOut({
			scope: 'local',
		});
	}
}
