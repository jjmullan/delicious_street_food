import supabase from '@shared/api/supabase/supabase';
import type { API_Favorite, Favorite } from '@shared/types/api';

/**
 * @description 특정 위치를 사용자의 즐겨찾기 목록에 추가합니다.
 * @param {API_Favorite} params - 즐겨찾기 생성 파라미터
 * @param {string} params.location_id - 즐겨찾기에 추가할 위치 ID
 * @param {string} params.user_id - 사용자 ID
 * @returns {Promise<Favorite>} 생성된 즐겨찾기 데이터
 * @throws {Error} 데이터베이스 삽입 실패 시 Supabase 에러 발생
 * @example
 * const favorite = await createFavorite({
 *   location_id: 'loc-123',
 *   user_id: 'user-456'
 * });
 */
export async function createFavorite({ location_id, user_id }: API_Favorite): Promise<Favorite> {
	const { data, error } = await supabase
		.from('favorite')
		.insert({
			location_id,
			user_id,
		})
		.select()
		.single();

	if (error) throw error;
	return data;
}

/**
 * @description 즐겨찾기 ID를 사용하여 특정 즐겨찾기를 삭제합니다.
 * @param {string} favorite_id - 삭제할 즐겨찾기 ID
 * @returns {Promise<Favorite | null>} 삭제된 즐겨찾기 데이터 (없을 경우 null 반환)
 * @throws {Error} 데이터베이스 삭제 실패 시 Supabase 에러 발생
 * @example
 * const deleted = await deleteFavorite('fav-123');
 * if (deleted) {
 *   console.log('즐겨찾기가 삭제되었습니다.');
 * }
 */
export async function deleteFavorite(favorite_id: string): Promise<Favorite | null> {
	const { data, error } = await supabase
		.from('favorite')
		.delete()
		.eq('favorite_id', favorite_id)
		.select()
		.maybeSingle();

	if (error) throw error;
	return data;
}
