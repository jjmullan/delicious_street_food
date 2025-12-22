import type { ImageURL } from '@/features/review/create/types/image';
import supabase from '@/shared/api/supabase/supabase';
import type { API_Review, API_ReviewImage, API_ReviewProduct } from '@/shared/types/types';

/**
 * 특정 위치에 대해 작성한 상세 후기 내용을 생성하는 API
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
 * 상세 후기 내용 중 구매한 상품에 대한 개별 목록을 생성하는 API
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
 * 특정 위치에 대해 업로드하려는 이미지 목록 데이터를 추가하는 API
 * 1. Supabase Storage에 이미지 파일 업로드
 * 2. review_image 테이블에 URL 삽입
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
