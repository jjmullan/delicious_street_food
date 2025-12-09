import supabase from '@/shared/api/supabase/supabase';
import type { API_ReviewImage } from '@/shared/types/types';

/**
 * 특정 위치에 대해 업로드하려는 이미지 목록 데이터를 추가하는 API
 */
export async function createReviewImages({ review_id, review_image_url }: API_ReviewImage) {
	const { data, error } = await supabase
		.from('review_image')
		.insert({
			review_id,
			review_image_url,
		})
		.select()
		.single();

	if (error) throw error;
	return data;
}
