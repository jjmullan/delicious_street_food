import supabase from '@/shared/api/supabase/supabase';
import type { API_ReviewImage, Review, ReviewProduct } from '@/shared/types/types';

/**
 * 특정 위치에 작성된 모든 리뷰 정보를 패칭하는 API
 */
export async function fetchReviewsByLocation(location_id: string): Promise<Review[]> {
	const { data, error } = await supabase
		.from('review')
		.select('*')
		.eq('location_id', location_id)
		.order('created_at', { ascending: false });

	if (error) throw error;
	return data;
}

/**
 * 특정 유저가 작성한 모든 리뷰 정보를 패칭하는 API
 */
export async function fetchReviewsByUser(user_id: string) {
	const { data, error } = await supabase
		.from('location')
		.select('*')
		.eq('user_id', user_id)
		.order('created_at', { ascending: false });

	if (error) throw error;
	return data;
}

/**
 * 특정 리뷰에 해당하는 모든 상품 목록을 패칭하는 API
 * @param review_id
 */
export async function fetchReviewProducts(review_id: string): Promise<ReviewProduct[]> {
	const { data, error } = await supabase
		.from('review_product')
		.select('*')
		.eq('review_id', review_id)
		.order('product_id', { ascending: false });

	if (error) throw error;
	return data;
}

export async function fetchReviewImages(review_id: string): Promise<API_ReviewImage[]> {
	const { data, error } = await supabase
		.from('review_image')
		.select('*')
		.eq('review_id', review_id)
		.order('created_at');

	if (error) throw error;
	return data;
}
