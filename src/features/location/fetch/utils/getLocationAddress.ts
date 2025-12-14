import { useState } from 'react';
import type { AbbrLocation } from '@/features/location/fetch/types/location';

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
