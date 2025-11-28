import supabase from '@/shared/api/supabase/supabase';

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
