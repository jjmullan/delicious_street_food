import supabase from '@/shared/api/supabase/supabase';

/**
 * 사용자 ID 와 일치하는 회원 정보 가져오기
 * @param userId 사용자 ID
 * @returns
 */
export async function fetchUser(userId: string) {
	const { data, error } = await supabase.from('user').select('*').eq('user_id', userId).single();

	if (error) throw error;
	return data;
}
