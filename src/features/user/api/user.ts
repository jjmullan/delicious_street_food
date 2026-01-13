import supabase from '@shared/api/supabase/supabase';
import { getRandomUserNickname } from '@shared/lib/utils';

/**
 * @description 신규 사용자를 생성하고 랜덤 닉네임을 할당합니다.
 * @param {string} userId - 생성할 사용자 ID (Supabase Auth ID)
 * @returns {Promise<User>} 생성된 사용자 데이터
 * @throws {Error} 데이터베이스 삽입 실패 시 Supabase 에러 발생
 * @example
 * const newUser = await createUser('auth-user-123');
 * console.log(`새 사용자 생성: ${newUser.nickname}`);
 */
export async function createUser(userId: string) {
	const { data, error } = await supabase
		.from('user')
		.insert({ user_id: userId, nickname: getRandomUserNickname() })
		.select()
		.single();

	if (error) throw error;
	return data;
}

/**
 * @description 특정 사용자의 프로필 정보를 조회합니다.
 * @param {string} userId - 조회할 사용자 ID
 * @returns {Promise<User>} 조회된 사용자 프로필 데이터
 * @throws {Error} 데이터베이스 조회 실패 또는 사용자 미존재 시 Supabase 에러 발생
 * @example
 * const profile = await fetchProfile('user-123');
 * console.log(`닉네임: ${profile.nickname}, 소개: ${profile.bio}`);
 */
export async function fetchProfile(userId: string) {
	const { data, error } = await supabase.from('user').select('*').eq('user_id', userId).single();

	if (error) throw error;
	return data;
}

/**
 * @description 사용자의 프로필 정보(닉네임, 한 줄 소개)를 업데이트합니다.
 * @param {Object} params - 프로필 업데이트 파라미터
 * @param {string} params.user_id - 업데이트할 사용자 ID
 * @param {string} params.nickname - 변경할 닉네임
 * @param {string} [params.bio] - 변경할 한 줄 소개 (선택)
 * @returns {Promise<User>} 업데이트된 사용자 데이터
 * @throws {Error} 데이터베이스 업데이트 실패 시 Supabase 에러 발생
 * @example
 * const updatedProfile = await updateProfile({
 *   user_id: 'user-123',
 *   nickname: '붕어빵 매니아',
 *   bio: '전국 포장마차 탐방 중'
 * });
 */
export async function updateProfile({ user_id, nickname, bio }: { user_id: string; nickname: string; bio?: string }) {
	const { data, error } = await supabase
		.from('user')
		.update({ nickname, bio })
		.eq('user_id', user_id)
		.select()
		.single();

	if (error) throw error;
	return data;
}
