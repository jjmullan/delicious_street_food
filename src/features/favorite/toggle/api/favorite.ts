import supabase from '@/shared/api/supabase/supabase';
import type { API_Favorite, Favorite } from '@/shared/types/types';

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
