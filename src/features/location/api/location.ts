import supabase from '@shared/api/supabase/supabase';
import type { API_Location, Location } from '@shared/types/api';

/**
 * @description 새로운 위치 정보를 데이터베이스에 추가합니다.
 * @param {API_Location} params - 위치 생성 파라미터
 * @param {string} params.user_id - 위치를 등록하는 사용자 ID
 * @param {string} params.latitude - 위도
 * @param {string} params.longitude - 경도
 * @param {string} [params.location_name] - 위치 이름 (선택)
 * @param {string} params.location_address - 위치 주소
 * @returns {Promise<Location>} 생성된 위치 데이터
 * @throws {Error} 데이터베이스 삽입 실패 시 Supabase 에러 발생
 * @example
 * const newLocation = await createLocation({
 *   user_id: 'user-123',
 *   latitude: '37.5665',
 *   longitude: '126.9780',
 *   location_name: '서울 포장마차',
 *   location_address: '서울특별시 중구'
 * });
 */
export async function createLocation({ user_id, latitude, longitude, location_name, location_address }: API_Location) {
	const { data, error } = await supabase
		.from('location')
		.insert({
			user_id,
			latitude,
			longitude,
			location_name,
			location_address,
		})
		.select()
		.single();

	if (error) throw error;
	return data;
}

/**
 * @description 데이터베이스에 등록된 모든 위치 목록을 조회합니다.
 * @returns {Promise<Location[]>} 전체 위치 데이터 배열
 * @throws {Error} 데이터베이스 조회 실패 시 Supabase 에러 발생
 * @example
 * const allLocations = await fetchLocations();
 * console.log(`총 ${allLocations.length}개의 위치가 등록되어 있습니다.`);
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
 * @description 특정 위치 ID로 단일 위치 데이터를 조회합니다.
 * @param {string} location_id - 조회할 위치 ID
 * @returns {Promise<Location>} 조회된 위치 데이터
 * @throws {Error} 데이터베이스 조회 실패 또는 위치 미존재 시 Supabase 에러 발생
 * @example
 * const location = await fetchLocation('loc-123');
 * console.log(location.location_name);
 */
export async function fetchLocation(location_id: string): Promise<Location> {
	const { data, error } = await supabase.from('location').select('*').eq('location_id', location_id).single();

	if (error) throw error;
	return data;
}

/**
 * @description 특정 상품이 포함된 리뷰가 작성된 모든 위치를 조회합니다.
 *
 * 동작 과정:
 * 1. review_product 테이블에서 product_id로 필터링
 * 2. review 테이블과 조인하여 location_id 가져오기
 * 3. location 테이블과 조인하여 location 데이터 가져오기
 * 4. 중복된 위치 제거 후 반환
 *
 * @param {string} product_id - 조회할 상품 ID
 * @returns {Promise<Location[]>} 해당 상품이 판매되는 위치 목록 (중복 제거됨)
 * @throws {Error} 데이터베이스 조회 실패 시 Supabase 에러 발생
 * @example
 * const locations = await fetchLocationByProduct('prod-붕어빵');
 * console.log(`붕어빵을 판매하는 위치: ${locations.length}곳`);
 */
export async function fetchLocationByProduct(product_id: string): Promise<Location[]> {
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
