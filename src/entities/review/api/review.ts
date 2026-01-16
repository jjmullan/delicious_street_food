import supabase from '@shared/api/supabase/supabase';
import type { Review, ReviewImage, ReviewProduct } from '@shared/types/api';

/**
 * @description 특정 위치에 작성된 모든 후기를 최신순으로 조회합니다.
 * @param {string} location_id - 조회할 위치 ID
 * @returns {Promise<Review[]>} 해당 위치의 후기 목록 (created_at 내림차순 정렬)
 * @throws {Error} 데이터베이스 조회 실패 시 Supabase 에러 발생
 * @example
 * const reviews = await fetchReviewsByLocation('loc-456');
 * console.log(`${reviews.length}개의 후기가 있습니다.`);
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
 * @description 특정 사용자가 작성한 모든 후기를 최신순으로 조회합니다.
 * @param {string} user_id - 조회할 사용자 ID
 * @returns {Promise<Review[]>} 해당 사용자의 후기 목록 (created_at 내림차순 정렬)
 * @throws {Error} 데이터베이스 조회 실패 시 Supabase 에러 발생
 * @example
 * const myReviews = await fetchReviewsByUser('user-123');
 * myReviews.forEach(review => console.log(review.review_title));
 */
export async function fetchReviewsByUser(user_id: string): Promise<Review[]> {
	const { data, error } = await supabase
		.from('review')
		.select('*')
		.eq('user_id', user_id)
		.order('created_at', { ascending: false });

	if (error) throw error;
	return data;
}

/**
 * @description 특정 후기에 포함된 모든 상품 목록을 조회합니다.
 * @param {string} review_id - 조회할 후기 ID
 * @returns {Promise<ReviewProduct[]>} 후기에 포함된 상품 목록 (product_id 내림차순 정렬)
 * @throws {Error} 데이터베이스 조회 실패 시 Supabase 에러 발생
 * @example
 * const products = await fetchReviewProducts('review-789');
 * products.forEach(p => console.log(`${p.product_id}: ${p.order_quantity}개`));
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
 * @description 특정 후기에 첨부된 모든 이미지를 조회합니다.
 * @param {string} review_id - 조회할 후기 ID
 * @returns {Promise<ReviewImage[]>} 후기 이미지 목록 (created_at 오름차순 정렬)
 * @throws {Error} 데이터베이스 조회 실패 시 Supabase 에러 발생
 * @example
 * const images = await fetchReviewImages('review-789');
 * images.forEach(img => console.log(img.review_image_url));
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
 * @description 특정 위치에 작성된 모든 후기의 이미지를 조회합니다.
 *
 * 동작 과정:
 * 1. review 테이블에서 location_id로 후기 조회
 * 2. 해당 후기들의 review_id로 review_image 테이블에서 이미지 조회
 * 3. 중첩된 배열 구조를 평탄화하여 반환
 *
 * @param {string} location_id - 조회할 위치 ID
 * @returns {Promise<ReviewImage[]>} 해당 위치의 모든 후기 이미지 목록
 * @throws {Error} 데이터베이스 조회 실패 시 Supabase 에러 발생
 * @example
 * const images = await fetchReviewImagesByLocation('loc-456');
 * console.log(`총 ${images.length}개의 이미지가 있습니다.`);
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
 * @description 특정 위치에 작성된 모든 후기의 상품 정보를 조회합니다.
 *
 * 동작 과정:
 * 1. review 테이블에서 location_id로 후기 조회
 * 2. 해당 후기들의 review_id로 review_product 테이블에서 상품 조회
 * 3. 중첩된 배열 구조를 평탄화하여 반환
 *
 * @param {string} location_id - 조회할 위치 ID
 * @returns {Promise<ReviewProduct[]>} 해당 위치의 모든 후기 상품 목록
 * @throws {Error} 데이터베이스 조회 실패 시 Supabase 에러 발생
 * @example
 * const products = await fetchReviewProductsByLocation('loc-456');
 * console.log(`총 ${products.length}개의 상품 리뷰가 있습니다.`);
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
