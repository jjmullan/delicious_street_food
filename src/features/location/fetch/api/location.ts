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
export async function fetchLocation(location_id: string): Promise<Location> {
	const { data, error } = await supabase.from('location').select('*').eq('location_id', location_id).single();

	if (error) throw error;
	return data;
}

/**
 * 특정 상품(product_id)이 포함된 리뷰가 작성된 모든 위치를 패칭하는 API
 * 1. review_product 테이블에서 product_id로 필터링
 * 2. review 테이블과 조인하여 location_id 가져오기
 * 3. location 테이블과 조인하여 location 데이터 가져오기
 * @param product_id
 */
export async function fetchLocationByProducts(product_id: string): Promise<Location[]> {
	const { data, error } = await supabase
		.from('review_product')
		.select(
			`
			review!inner (
				location!inner (*)
			)
		`
		)
		.eq('product_id', product_id);

	if (error) throw error;

	// 중첩된 구조에서 location 데이터만 추출
	const locations =
		data?.map((item) => {
			const reviewData = item as unknown as { review: { location: Location } };
			return reviewData.review.location;
		}) || [];

	// 중복된 location 제거 (같은 location_id를 가진 경우)
	const uniqueLocations = locations.filter(
		(location, index, self) => index === self.findIndex((l) => l.location_id === location.location_id)
	);

	return uniqueLocations;
}
