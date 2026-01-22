import type { AbbrLocation } from '@entities/location';
import { useState } from 'react';

/**
 * 좌표를 기반으로 간략한 주소(시/구/동)를 조회하는 함수
 * @param params - 위치 좌표 객체
 * @param params.lng - 경도
 * @param params.lat - 위도
 * @returns 시/구/동 형태의 간략한 주소 문자열
 * @example
 * const address = getLocationAddress({ lng: 127.0, lat: 37.5 });
 * // "서울특별시 강남구 역삼동"
 */
export function getLocationAddress({ lng, lat }: AbbrLocation) {
	const [address, setAddress] = useState('');

	const geocoder = new kakao.maps.services.Geocoder();
	geocoder.coord2Address(lng, lat, (result, status) => {
		if (status === kakao.maps.services.Status.OK) {
			const addressInfo = result[0];
			setAddress(
				`${addressInfo.address.region_1depth_name} ${addressInfo.address.region_2depth_name} ${addressInfo.address.region_3depth_name}`
			);
		}
	});

	return address;
}

/**
 * 좌표를 기반으로 전체 도로명/지번 주소를 조회하는 함수
 * @param params - 위치 좌표 객체
 * @param params.lng - 경도
 * @param params.lat - 위도
 * @returns 전체 주소 문자열
 * @example
 * const address = getFullLocationAddress({ lng: 127.0, lat: 37.5 });
 * // "서울특별시 강남구 테헤란로 123"
 */
export function getFullLocationAddress({ lng, lat }: AbbrLocation) {
	const [address, setAddress] = useState('');

	const geocoder = new kakao.maps.services.Geocoder();
	geocoder.coord2Address(lng, lat, (result, status) => {
		if (status === kakao.maps.services.Status.OK) {
			const addressInfo = result[0];
			setAddress(`${addressInfo.address.address_name}`);
		}
	});

	return address;
}
