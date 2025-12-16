import supabase from '@/shared/api/supabase/supabase';
import type { Favorite } from '@/shared/types/types';

/**
 * 즐겨찾기 데이터 삭제 요청 API
 */
export async function deleteFavorite(favorite_id: string): Promise<Favorite> {
	const { data, error } = await supabase.from('favorite').delete().eq('favorite_id', favorite_id).select().single();

	if (error) throw error;
	return data;
}
