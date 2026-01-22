import supabase from '@shared/api/supabase/supabase';
import type { API_Location } from '@shared/types/api';

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
