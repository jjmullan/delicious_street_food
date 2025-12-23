import { type ReactNode, useEffect } from 'react';
import { toast } from 'sonner';
import { useIsLocationUpdated, useSetLocation } from '@/app/store/locationStore';
import { useIsSessionLoaded, useSession } from '@/app/store/sessionStore';

function LocationProvider({ children }: { children: ReactNode }) {
	const session = useSession();
	const userId = session?.user.id;
	const isSessionLoaded = useIsSessionLoaded();

	// 위치정보
	const isLocationUpdated = useIsLocationUpdated();
	const setLocation = useSetLocation();

	useEffect(() => {
		// 세션이 로드되지 않았거나 userId가 없으면 실행하지 않음
		if (!isSessionLoaded || !userId) {
			return;
		}

		// 이미 위치 정보를 가져왔으면 실행하지 않음 (최초 로그인 시에만 실행)
		if (isLocationUpdated) {
			return;
		}

		// 예외 처리: 브라우저가 위치 서비스를 지원하지 않는 경우
		if (!navigator.geolocation) {
			toast.error('해당 지역은 위치 서비스를 지원하지 않습니다.', { position: 'top-center' });
			return;
		}

		// 최초 로그인 시 위치 정보 동의 요청 및 현재 위치 가져오기
		navigator.geolocation.getCurrentPosition(
			(position) => {
				console.log('현재 위치 정보:', position);

				const newLocation = {
					lat: position.coords.latitude,
					lng: position.coords.longitude,
				};

				// 전역 상태에 위치 저장
				setLocation(newLocation);
			},
			(error) => {
				switch (error.code) {
					case error.PERMISSION_DENIED:
						toast.error('위치 정보 제공이 거부되었습니다. 기본 위치로 설정됩니다.', { position: 'top-center' });
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
				enableHighAccuracy: true, // 위치정보를 가장 높은 정확도로 수신하고 싶은지 여부, T -> 매우 정확(응답속도 감소, 전력 사용량 증가)
				timeout: 10_000, // 10초 안에 위치 정보를 가져오기 (무한 대기 상태 방지 목적)
			}
		);
	}, [userId, isSessionLoaded, isLocationUpdated, setLocation]);

	return children;
}

export default LocationProvider;
