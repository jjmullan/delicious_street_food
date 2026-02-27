import { bffPatch, bffPost } from '@shared/api/bff/client';
import type { User } from '@shared/types/api';

/**
 * @description 신규 사용자를 생성하고 랜덤 닉네임을 할당합니다.
 * @param {string} userId - 생성할 사용자 ID (Supabase Auth ID)
 * @returns {Promise<User>} 생성된 사용자 데이터
 * @throws {Error} 요청 실패 시 에러 발생
 * @example
 * const newUser = await createProfile('auth-user-123');
 * console.log(`새 사용자 생성: ${newUser.nickname}`);
 */
export async function createUserProfile(userId: string): Promise<User> {
	return bffPost<User>('/api/profile', { user_id: userId });
}

/**
 * @description 사용자의 프로필 정보(닉네임, 한 줄 소개)를 업데이트합니다.
 * @param {Object} params - 프로필 업데이트 파라미터
 * @param {string} params.user_id - 업데이트할 사용자 ID
 * @param {string} params.nickname - 변경할 닉네임
 * @param {string} [params.bio] - 변경할 한 줄 소개 (선택)
 * @returns {Promise<User>} 업데이트된 사용자 데이터
 * @throws {Error} 요청 실패 시 에러 발생
 * @example
 * const updatedProfile = await updateProfile({
 *   user_id: 'user-123',
 *   nickname: '붕어빵 매니아',
 *   bio: '전국 포장마차 탐방 중'
 * });
 */
export async function updateUserProfile({
	user_id,
	nickname,
	bio,
}: {
	user_id: string;
	nickname: string;
	bio?: string;
}): Promise<User> {
	return bffPatch<User>('/api/profile', { user_id, nickname, bio });
}
