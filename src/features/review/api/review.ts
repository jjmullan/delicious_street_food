import type { ImageURL } from '@features/review/types/image';
import supabase from '@shared/api/supabase/supabase';
import type {
	API_Review,
	API_ReviewImage,
	API_ReviewProduct,
	Review,
	ReviewImage,
	ReviewProduct,
} from '@shared/types/types';

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
 * @throws {Error} 데이터베이스 삽입 실패 시 Supabase 에러 발생
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

/**
 * @description 후기에 포함된 개별 상품 정보를 생성합니다.
 * @param {API_ReviewProduct} params - 후기 상품 생성 파라미터
 * @param {string} params.review_id - 후기 ID
 * @param {string} params.product_id - 상품 ID
 * @param {boolean} params.is_recommend - 해당 상품 추천 여부
 * @param {number} params.order_price - 구매 가격
 * @param {number} params.order_quantity - 구매 수량
 * @returns {Promise<ReviewProduct>} 생성된 후기 상품 데이터
 * @throws {Error} 데이터베이스 삽입 실패 시 Supabase 에러 발생
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
}: API_ReviewProduct) {
	const { data, error } = await supabase
		.from('review_product')
		.insert({
			review_id,
			product_id,
			is_recommend,
			order_price,
			order_quantity,
		})
		.select()
		.single();

	if (error) throw error;
	return data;
}

/**
 * @description 후기에 첨부할 이미지들을 Supabase Storage에 업로드하고 DB에 저장합니다.
 *
 * 동작 과정:
 * 1. 각 이미지에 대해 고유한 파일명 생성 (review_id + timestamp + random)
 * 2. Supabase Storage 'review_images' 버킷에 업로드
 * 3. Public URL 생성
 * 4. review_image 테이블에 URL 정보 삽입
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
}) {
	if (images.length === 0) return [];

	const uploadedImages: API_ReviewImage[] = [];
	for (const image of images) {
		// 1. 고유한 파일명 생성 (timestamp + random string)
		const timestamp = Date.now();
		const randomString = Math.random().toString(36).substring(2, 9);
		const fileExtension = image.file.name.split('.').pop() || 'webp';
		const fileName = `${review_id}_${timestamp}_${randomString}.${fileExtension}`;
		const filePath = `user/${user_id}/review/${review_id}/${fileName}`;

		// 2. Supabase Storage에 이미지 업로드
		const { error: uploadError } = await supabase.storage.from('review_images').upload(filePath, image.file, {
			cacheControl: '3600',
			upsert: false,
		});

		if (uploadError) {
			console.error('이미지 업로드 실패:', uploadError);
			throw uploadError;
		}

		// 3. 업로드된 파일의 public URL 가져오기
		const {
			data: { publicUrl },
		} = supabase.storage.from('review_images').getPublicUrl(filePath);

		// 4. review_image 테이블에 삽입
		const { data: imageData, error: insertError } = await supabase
			.from('review_image')
			.insert({
				review_id,
				review_image_url: publicUrl,
			})
			.select()
			.single();

		if (insertError) {
			console.error('이미지 DB 삽입 실패:', insertError);
			throw insertError;
		}

		uploadedImages.push(imageData);
	}

	return uploadedImages;
}

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

/**
 * @description 특정 후기를 삭제합니다.
 * @param {string} review_id - 삭제할 후기 ID
 * @returns {Promise<Review>} 삭제된 후기 데이터
 * @throws {Error} 데이터베이스 삭제 실패 시 Supabase 에러 발생
 * @example
 * const deleted = await deleteReview('review-789');
 * console.log(`"${deleted.review_title}" 후기가 삭제되었습니다.`);
 */
export async function deleteReview(review_id: string) {
	const { data, error } = await supabase.from('review').delete().eq('review_id', review_id).select().single();

	if (error) throw error;
	return data;
}
