import supabase from '@/shared/api/supabase/supabase';

/**
 * 특정 위치에 작성된 모든 리뷰 정보를 패칭하는 API
 */
export async function fetchReviewsByLocation(location_id: string) {
	const { data, error } = await supabase.from('location').select('*').eq('location_id', location_id);

	if (error) throw error;
	return data;
}

/**
 * 특정 유저가 작성한 모든 리뷰 정보를 패칭하는 API
 */
export async function fetchReviewsByUser(user_id: string) {
	const { data, error } = await supabase.from('location').select('*').eq('user_id', user_id);

	if (error) throw error;
	return data;
}
