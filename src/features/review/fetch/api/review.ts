import supabase from '@/shared/api/supabase/supabase';
import type { Review, ReviewImage, ReviewProduct } from '@/shared/types/types';

/**
 * 특정 위치에 작성된 모든 후기 정보를 패칭하는 API
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
 * 특정 유저가 작성한 모든 후기 정보를 패칭하는 API
 */
export async function fetchReviewsByUser(user_id: string) {
	const { data, error } = await supabase
		.from('review')
		.select('*')
		.eq('user_id', user_id)
		.order('created_at', { ascending: false });

	if (error) throw error;
	return data;
}

/**
 * 특정 후기에 해당하는 모든 상품 목록을 패칭하는 API
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

/**
 * 특정 후기에 해당하는 모든 이미지 목록을 패칭하는 API
 * @param review_id
 */
export async function fetchReviewImages(review_id: string): Promise<ReviewImage[]> {
	const { data, error } = await supabase
		.from('review_image')
		.select('*')
		.eq('review_id', review_id)
		.order('created_at');

	if (error) throw error;
	return data;
}

/**
 * 특정 위치의 모든 후기 이미지를 패칭하는 API
 * 1. review 테이블에서 location_id로 후기 조회
 * 2. 해당 후기들의 review_id로 review_image 테이블에서 이미지 조회
 * @param location_id
 */
export async function fetchReviewImagesByLocation(location_id: string): Promise<ReviewImage[]> {
	const { data, error } = await supabase
		.from('review')
		.select(`
			review_image (
				review_image_id,
				review_image_url,
				review_id,
				created_at
			)
		`)
		.eq('location_id', location_id)
		.order('created_at', { ascending: false });

	if (error) throw error;

	// 중첩된 배열 구조를 평탄화하여 ReviewImage[] 형태로 반환
	const images = data?.flatMap((review) => review.review_image || []) || [];
	return images;
}

/**
 * 특정 위치의 모든 후기 상품을 패칭하는 API
 * 1. review 테이블에서 location_id로 후기 조회
 * 2. 해당 후기들의 review_id로 review_product 테이블에서 상품 조회
 * @param location_id
 */
export async function fetchReviewProductsByLocation(location_id: string): Promise<ReviewProduct[]> {
	const { data, error } = await supabase
		.from('review')
		.select(`
			review_product (
				*
			)
		`)
		.eq('location_id', location_id)
		.order('created_at', { ascending: false });

	if (error) throw error;

	// 중첩된 배열 구조를 평탄화하여 ReviewProduct[] 형태로 반환
	const products = data?.flatMap((review) => review.review_product || []) || [];
	return products;
}
