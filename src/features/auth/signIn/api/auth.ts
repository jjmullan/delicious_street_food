import type { Provider } from '@supabase/supabase-js';
import supabase from '@/shared/api/supabase/supabase';

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
