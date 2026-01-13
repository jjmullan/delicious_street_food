import supabase from '@shared/api/supabase/supabase';
import type { API_Favorite, Favorite } from '@shared/types/types';

/**
 * 즐겨찾기 데이터 추가 요청 API
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
 * 즐겨찾기 데이터 삭제 요청 API
 * 결과가 없을 수 있으므로 maybeSingle() 사용
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

/**
 * 특정 위치에 저장된 모든 즐겨찾기 데이터를 패칭하는 API
 */
export async function fetchFavorite(location_id: string): Promise<Favorite[]> {
	const { data, error } = await supabase.from('favorite').select('*').eq('location_id', location_id);

	if (error) throw error;
	return data;
}

/**
 * 특정 유저가 저장된 모든 즐겨찾기 데이터를 패칭하는 API
 */
export async function fetchFavoritebyUser(user_id: string): Promise<Favorite[]> {
	const { data, error } = await supabase.from('favorite').select('*').eq('user_id', user_id);

	if (error) throw error;
	return data;
}
