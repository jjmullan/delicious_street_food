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
