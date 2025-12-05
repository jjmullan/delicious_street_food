import supabase from '@/shared/api/supabase/supabase';
import type { Location } from '@/shared/types/types';

/**
 * 위치 정보 데이터 추가 요청 API
 */
export async function createLocation({ user_id, latitude, longitude, location_address, location_name }: Location) {
	const { data, error } = await supabase
		.from('location')
		.insert({
			user_id,
			latitude,
			longitude,
			location_address,
			location_name,
		})
		.select()
		.single();

	if (error) throw error;
	return data;
}
