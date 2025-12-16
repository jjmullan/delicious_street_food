import supabase from '@/shared/api/supabase/supabase';
import type { Favorite } from '@/shared/types/types';

/**
 * 특정 위치에 저장된 모든 즐겨찾기 데이터를 패칭하는 API
 */
export async function fetchFavorite(location_id: string): Promise<Favorite[]> {
	const { data, error } = await supabase.from('favorite').select('*').eq('location_id', location_id);

	if (error) throw error;
	return data;
}
