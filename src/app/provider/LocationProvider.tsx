import { type ReactNode, useEffect } from 'react';
import { toast } from 'sonner';
import { useSetLocation } from '@/app/store/location';

function LocationProvider({ children }: { children: ReactNode }) {
	const setLocation = useSetLocation();

	useEffect(() => {
		// 예외 처리
		if (!navigator.geolocation) {
			toast.error('해당 지역은 위치 서비스를 지원하지 않습니다.');
			return;
		}

		// 현재 위치 정보 가져오기
		navigator.geolocation.getCurrentPosition(
			(position) => {
				console.log('현재 위치 정보:', position);

				setLocation({
					lat: position.coords.latitude,
					lng: position.coords.longitude,
				});
			},
			(error) => {
				switch (error.code) {
					case error.PERMISSION_DENIED:
						toast.error('위치 정보 제공이 거부되었습니다.', { position: 'top-center' });
						break;
					case error.POSITION_UNAVAILABLE:
						toast.error('위치 정보를 사용할 수 없습니다.', { position: 'top-center' });
						break;
					case error.TIMEOUT:
						toast.error('요청 시간이 초과되었습니다.', { position: 'top-center' });
						break;
				}
			},
			{
				maximumAge: 0, // 캐시에 저장한 위치정보를 대신 반환할 수 있는 최대 시간
				enableHighAccuracy: false, // 위치정보를 가장 높은 정확도로 수신하고 싶은지 여부, T -> 매우 정확(응답속도 감소, 전력 사용량 증가)
			}
		);
	}, [setLocation]);

	return children;
}

export default LocationProvider;
