import type { Location } from '@/features/location/fetch/types/types';

export function getLocationData(): Promise<Location> {
	return new Promise((resolve) => {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				resolve({
					lat: position.coords.latitude,
					lng: position.coords.longitude,
				});
				console.log('현재 위치 정보:', position);
			},
			(error) => {
				switch (error.code) {
					case error.PERMISSION_DENIED:
						console.error('위치 정보 제공이 거부되었습니다.');
						break;
					case error.POSITION_UNAVAILABLE:
						console.error('위치 정보를 사용할 수 없습니다.');
						break;
					case error.TIMEOUT:
						console.error('요청 시간이 초과되었습니다.');
						break;
				}
			},
			{
				maximumAge: 0, // 캐시에 저장한 위치정보를 대신 반환할 수 있는 최대 시간
				enableHighAccuracy: true, // 위치정보를 가장 높은 정확도로 수신하고 싶은지 여부, T -> 매우 정확(응답속도 감소, 전력 사용량 증가)
				timeout: 10_000, // 10초 안에 위치 정보를 가져오기 (무한 대기 상태 방지 목적)
			}
		);
	});
}
