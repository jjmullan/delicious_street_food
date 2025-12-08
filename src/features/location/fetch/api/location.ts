import supabase from '@/shared/api/supabase/supabase';
import type { Location } from '@/shared/types/types';

/**
 * 전체 위치 목록 패칭을 요청하는 API
 */
export async function fetchLocations() {
	const request = supabase.from('location').select('*');
	const { data, error } = await request;

	if (error) throw error;
	return data.map((location: Location) => ({
		...location,
	}));
}
