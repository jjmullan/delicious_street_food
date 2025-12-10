import supabase from '@/shared/api/supabase/supabase';
import type { API_Review } from '@/shared/types/types';

/**
 * 특정 위치에 대해 작성한 상세 리뷰 내용을 생성하는 API
 */
export async function createReview({
	user_id,
	location_id,
	review_title,
	review_text,
	is_recommended,
	visit_datetime,
}: API_Review) {
	const { data, error } = await supabase
		.from('review')
		.insert({
			user_id,
			location_id,
			review_title,
			review_text,
			is_recommended,
			visit_datetime,
		})
		.select()
		.single();

	if (error) throw error;
	return data;
}
