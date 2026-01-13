import supabase from '@shared/api/supabase/supabase';
import type { Provider } from '@supabase/supabase-js';

/**
 * 이메일과 비밀번호로 회원가입하는 기능
 * @param email 이메일 주소
 * @param password 비밀번호
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
 * 이메일 회원가입 이용자 전용 로그인을 위한 데이터 전송
 * @param email 이메일
 * @param password 비밀번호
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
 * 소셜 로그인 회원가입 전용 데이터 전송
 * @param provider: 소셜 로그인 주체 (@example 'google', 'kakao', ...)
 * @returns
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
 * 로그인 이용자 로그아웃 데이터 전송
 */
export async function signOut() {
	const { error } = await supabase.auth.signOut();

	// 에러가 발생하면, 로컬 스토리지에 보관된 엑세스 토큰을 삭제
	if (error) {
		await supabase.auth.signOut({
			scope: 'local',
		});
	}
}
