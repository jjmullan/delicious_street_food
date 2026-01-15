import {
	DEGREES_TO_RADIANS,
	EARTH_RADIUS_METERS,
	MAXIMUM_DISTANCE_FROM_CURRENT_LOCATION_METERS,
	MINIMUM_LOCATION_DISTANCE_METERS,
} from '@entities/location/lib/distance';
import type { AbbrLocation } from '@entities/location/model/location';
import type { Location as SupabaseLocation } from '@shared/types/api';

/**
 * 하버사인 공식을 사용하여 두 지점 간의 거리를 계산합니다.
 * @param lat1 첫 번째 지점의 위도 (도 단위)
 * @param lng1 첫 번째 지점의 경도 (도 단위)
 * @param lat2 두 번째 지점의 위도 (도 단위)
 * @param lng2 두 번째 지점의 경도 (도 단위)
 * @returns 두 지점 간의 거리 (미터 단위)
 */
function calculateHaversineDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
	// 위도와 경도를 라디안으로 변환
	const lat1Rad = lat1 * DEGREES_TO_RADIANS;
	const lat2Rad = lat2 * DEGREES_TO_RADIANS;
	const deltaLat = (lat2 - lat1) * DEGREES_TO_RADIANS;
	const deltaLng = (lng2 - lng1) * DEGREES_TO_RADIANS;

	// 하버사인 공식 적용
	// a = sin²(Δφ/2) + cos(φ1) × cos(φ2) × sin²(Δλ/2)
	const a =
		Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
		Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(deltaLng / 2) * Math.sin(deltaLng / 2);

	// c = 2 × atan2(√a, √(1-a))
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

	// d = R × c
	const distance = EARTH_RADIUS_METERS * c;

	return distance;
}

/**
 * 클릭한 위치가 기존 위치들로부터 최소 10미터 이상 떨어져 있는지 검증합니다.
 * @param clickedLocation 클릭한 위치 (위도/경도가 숫자)
 * @param existingLocations 기존 위치 배열 (위도/경도가 문자열)
 * @param minimumDistance 최소 거리 (기본값: 10미터)
 * @returns 모든 기존 위치로부터 최소 거리 이상 떨어져있으면 true, 아니면 false
 */
export function validateLocationDistance(
	clickedLocation: AbbrLocation,
	existingLocations: SupabaseLocation[] | null | undefined,
	minimumDistance: number = MINIMUM_LOCATION_DISTANCE_METERS
): boolean {
	// 기존 위치가 없는 경우 (첫 번째 위치 생성), 생성 허용
	if (!existingLocations || existingLocations.length === 0) {
		return true;
	}

	// 각 기존 위치와의 거리를 확인
	for (const existingLocation of existingLocations) {
		// Supabase에서 가져온 위치 데이터는 latitude/longitude가 문자열이므로 숫자로 변환
		const existingLat = Number(existingLocation.latitude);
		const existingLng = Number(existingLocation.longitude);

		// 잘못된 좌표 데이터인 경우 해당 위치는 스킵
		if (Number.isNaN(existingLat) || Number.isNaN(existingLng)) {
			continue;
		}

		// 두 지점 간의 거리 계산
		const distance = calculateHaversineDistance(clickedLocation.lat, clickedLocation.lng, existingLat, existingLng);

		// 최소 거리보다 가까운 위치가 있으면 생성 불가
		if (distance < minimumDistance) {
			return false;
		}
	}

	// 모든 기존 위치가 최소 거리 이상 떨어져 있으면 생성 가능
	return true;
}

/**
 * 두 지점 간의 거리를 계산합니다.
 * @param location1 첫 번째 위치
 * @param location2 두 번째 위치
 * @returns 두 지점 간의 거리 (미터 단위)
 */
export function calculateDistanceFromLocation(location1: AbbrLocation, location2: AbbrLocation): number {
	// 위치가 없는 경우 0 반환
	if (!location1 || !location2) {
		return 0;
	}

	// 하버사인 공식을 사용하여 거리 계산
	const distance = calculateHaversineDistance(location1.lat, location1.lng, location2.lat, location2.lng);

	return distance;
}

/**
 * 클릭한 위치가 현재 위치로부터 최대 거리 이내에 있는지 검증합니다.
 * @param clickedLocation 클릭한 위치
 * @param currentLocation 현재 위치
 * @param maximumDistance 최대 거리 (기본값: 1000미터 = 1km)
 * @returns 현재 위치로부터 최대 거리 이내면 true, 아니면 false
 */
export function validateMaxDistanceFromCurrentLocation(
	clickedLocation: AbbrLocation,
	currentLocation: AbbrLocation,
	maximumDistance: number = MAXIMUM_DISTANCE_FROM_CURRENT_LOCATION_METERS
): boolean {
	// 현재 위치가 없는 경우 검증 실패
	if (!currentLocation) {
		return false;
	}

	// 두 지점 간의 거리 계산
	const distance = calculateHaversineDistance(
		clickedLocation.lat,
		clickedLocation.lng,
		currentLocation.lat,
		currentLocation.lng
	);

	// 최대 거리 이내면 생성 가능
	return distance <= maximumDistance;
}
