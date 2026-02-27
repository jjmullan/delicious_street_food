import type { ImageURL } from '@features/review';
import { bffDelete, bffPost } from '@shared/api/bff/client';
import supabase from '@shared/api/supabase/supabase';
import type { API_Review, API_ReviewProduct, Review, ReviewImage, ReviewProduct } from '@shared/types/api';

/**
 * @description 특정 위치에 대한 상세 후기를 생성합니다.
 * @param {API_Review} params - 후기 생성 파라미터
 * @param {string} params.user_id - 후기 작성자 ID
 * @param {string} params.location_id - 후기 대상 위치 ID
 * @param {string} params.review_title - 후기 제목
 * @param {string} params.review_text - 후기 본문 내용
 * @param {boolean} params.is_recommended - 추천 여부
 * @param {string} params.visit_datetime - 방문 일시
 * @returns {Promise<Review>} 생성된 후기 데이터
 * @throws {Error} 요청 실패 시 에러 발생
 * @example
 * const review = await createReview({
 *   user_id: 'user-123',
 *   location_id: 'loc-456',
 *   review_title: '맛있어요!',
 *   review_text: '붕어빵이 정말 맛있었습니다.',
 *   is_recommended: true,
 *   visit_datetime: '2024-01-15T14:30:00'
 * });
 */
export async function createReview({
	user_id,
	location_id,
	review_title,
	review_text,
	is_recommended,
	visit_datetime,
}: API_Review): Promise<Review> {
	return bffPost<Review>('/api/review', {
		user_id,
		location_id,
		review_title,
		review_text,
		is_recommended,
		visit_datetime,
	});
}

/**
 * @description 후기에 포함된 개별 상품 정보를 생성합니다.
 * @param {API_ReviewProduct} params - 후기 상품 생성 파라미터
 * @param {string} params.review_id - 후기 ID
 * @param {string} params.product_id - 상품 ID
 * @param {boolean} params.is_recommend - 해당 상품 추천 여부
 * @param {number} params.order_price - 구매 가격
 * @param {number} params.order_quantity - 구매 수량
 * @returns {Promise<ReviewProduct>} 생성된 후기 상품 데이터
 * @throws {Error} 요청 실패 시 에러 발생
 * @example
 * const reviewProduct = await createReviewProduct({
 *   review_id: 'review-789',
 *   product_id: 'prod-붕어빵',
 *   is_recommend: true,
 *   order_price: 1000,
 *   order_quantity: 3
 * });
 */
export async function createReviewProduct({
	review_id,
	product_id,
	is_recommend,
	order_price,
	order_quantity,
}: API_ReviewProduct): Promise<ReviewProduct> {
	return bffPost<ReviewProduct>('/api/review/product', {
		review_id,
		product_id,
		is_recommend,
		order_price,
		order_quantity,
	});
}

/**
 * @description 후기에 첨부할 이미지들을 Supabase Storage에 업로드하고 BFF를 통해 DB에 저장합니다.
 *
 * 동작 과정:
 * 1. 각 이미지를 Supabase Storage 'review_images' 버킷에 업로드 (클라이언트 직접)
 * 2. Public URL 목록 수집
 * 3. BFF(/api/review/images)를 통해 review_image 테이블에 일괄 저장
 *
 * @param {Object} params - 이미지 업로드 파라미터
 * @param {string} params.review_id - 후기 ID
 * @param {string} params.user_id - 사용자 ID (파일 경로에 사용)
 * @param {ImageURL[]} params.images - 업로드할 이미지 파일 배열
 * @returns {Promise<API_ReviewImage[]>} 업로드된 이미지 정보 배열 (빈 배열 가능)
 * @throws {Error} 이미지 업로드 또는 DB 삽입 실패 시 에러 발생
 * @example
 * const uploadedImages = await createReviewImages({
 *   review_id: 'review-789',
 *   user_id: 'user-123',
 *   images: [{ file: imageFile1, previewUrl: 'blob:...' }]
 * });
 */
export async function createReviewImages({
	review_id,
	user_id,
	images,
}: {
	review_id: string;
	user_id: string;
	images: ImageURL[];
}): Promise<ReviewImage[]> {
	if (images.length === 0) return [];

	const image_urls: string[] = [];

	for (const image of images) {
		// 1. 고유한 파일명 생성 (timestamp + random string)
		const timestamp = Date.now();
		const randomString = Math.random().toString(36).substring(2, 9);
		const fileExtension = image.file.name.split('.').pop() || 'webp';
		const fileName = `${review_id}_${timestamp}_${randomString}.${fileExtension}`;
		const filePath = `user/${user_id}/review/${review_id}/${fileName}`;

		// 2. Storage 업로드 (클라이언트에서 직접)
		const { error: uploadError } = await supabase.storage.from('review_images').upload(filePath, image.file, {
			cacheControl: '3600',
			upsert: false,
		});

		if (uploadError) {
			console.error('이미지 업로드 실패:', uploadError);
			throw uploadError;
		}

		// 3. Public URL 수집
		const {
			data: { publicUrl },
		} = supabase.storage.from('review_images').getPublicUrl(filePath);

		image_urls.push(publicUrl);
	}

	// 4. DB 저장 → BFF 일괄 처리
	return bffPost<ReviewImage[]>('/api/review/images', { review_id, image_urls });
}

/**
 * @description 특정 후기를 삭제합니다.
 * @param {string} review_id - 삭제할 후기 ID
 * @returns {Promise<Review>} 삭제된 후기 데이터
 * @throws {Error} 요청 실패 시 에러 발생
 * @example
 * const deleted = await deleteReview('review-789');
 * console.log(`"${deleted.review_title}" 후기가 삭제되었습니다.`);
 */
export async function deleteReview(review_id: string): Promise<Review> {
	return bffDelete<Review>('/api/review', { review_id });
}
