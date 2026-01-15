import supabase from '@shared/api/supabase/supabase';
import type { Favorite } from '@shared/types/api';

/**
 * @description 특정 위치에 대한 모든 즐겨찾기 데이터를 조회합니다.
 * @param {string} location_id - 조회할 위치 ID
 * @returns {Promise<Favorite[]>} 해당 위치의 모든 즐겨찾기 목록
 * @throws {Error} 데이터베이스 조회 실패 시 Supabase 에러 발생
 * @example
 * const favorites = await fetchFavoriteByLocation('loc-123');
 * console.log(`총 ${favorites.length}명이 즐겨찾기했습니다.`);
 */
export async function fetchFavoriteByLocation(location_id: string): Promise<Favorite[]> {
	const { data, error } = await supabase.from('favorite').select('*').eq('location_id', location_id);

	if (error) throw error;
	return data;
}

/**
 * @description 특정 사용자가 저장한 모든 즐겨찾기 데이터를 조회합니다.
 * @param {string} user_id - 조회할 사용자 ID
 * @returns {Promise<Favorite[]>} 해당 사용자의 모든 즐겨찾기 목록
 * @throws {Error} 데이터베이스 조회 실패 시 Supabase 에러 발생
 * @example
 * const myFavorites = await fetchFavoritebyUser('user-456');
 * myFavorites.forEach(fav => console.log(fav.location_id));
 */
export async function fetchFavoritebyUser(user_id: string): Promise<Favorite[]> {
	const { data, error } = await supabase.from('favorite').select('*').eq('user_id', user_id);

	if (error) throw error;
	return data;
}
