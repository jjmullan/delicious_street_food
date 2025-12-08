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

/**
 * 특정 위치 하나 패칭을 요청하는 API
 */
export async function fetchLocation(lat: string, lng: string) {
	const { data, error } = await supabase.from('location').select('*').eq('latitude', lat).eq('longitude', lng).single();

	if (error) throw error;
	return data;
}
