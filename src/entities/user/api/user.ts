import supabase from '@shared/api/supabase/supabase';

/**
 * @description 특정 사용자의 프로필 정보를 조회합니다.
 * @param {string} userId - 조회할 사용자 ID
 * @returns {Promise<User>} 조회된 사용자 프로필 데이터
 * @throws {Error} 데이터베이스 조회 실패 또는 사용자 미존재 시 Supabase 에러 발생
 * @example
 * const profile = await fetchProfile('user-123');
 * console.log(`닉네임: ${profile.nickname}, 소개: ${profile.bio}`);
 */
export async function fetchUserProfile(userId: string) {
	const { data, error } = await supabase.from('user').select('*').eq('user_id', userId).single();

	if (error) throw error;
	return data;
}
