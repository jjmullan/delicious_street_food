import { useIsLocationUpdated, useSetLocation } from '@app/store/locationStore';
import { initialLocation } from '@features/location/libs/location';
import { useSetSession } from '@shared/model/session';
import { type ReactNode, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';

function LocationProvider({ children }: { children: ReactNode }) {
	// 세션
	const setSession = useSetSession();

	// 위치정보
	const isLocationUpdated = useIsLocationUpdated();
	const setLocation = useSetLocation();
	const [isLocationLoading, setIsLocationLoading] = useState(!isLocationUpdated);
	const [searchParam, setSearchParam] = useSearchParams();
	const navigate = useNavigate();

	useEffect(() => {
		// 이미 위치 정보를 가져왔으면 실행하지 않음 (최초 로그인 시에만 실행)
		if (isLocationUpdated) {
			setIsLocationLoading(false);
			return;
		}

		// 예외 처리: 브라우저가 위치 서비스를 지원하지 않는 경우
		if (!navigator.geolocation) {
			toast.error('해당 지역은 위치 서비스를 지원하지 않습니다.', { position: 'top-center' });
			setIsLocationLoading(false);
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
				setIsLocationLoading(false);
				setSearchParam({ lat: newLocation.lat.toString(), lng: newLocation.lng.toString() });
			},
			(error) => {
				switch (error.code) {
					case error.PERMISSION_DENIED:
						setLocation(initialLocation);
						setSearchParam({ lat: initialLocation.lat.toString(), lng: initialLocation.lng.toString() });
						setIsLocationLoading(false);
						toast.error('위치 정보 제공이 거부되었습니다. 기본 위치로 설정됩니다.', { position: 'top-center' });
						break;
					case error.POSITION_UNAVAILABLE:
						toast.error('위치 정보를 사용할 수 없습니다.', { position: 'top-center' });
						break;
					case error.TIMEOUT:
						setSession(null);
						navigate('/login');
						setIsLocationLoading(false);
						toast.error('요청 시간이 초과되었습니다.', { position: 'top-center' });
						break;
				}
				setIsLocationLoading(false);
			},
			{
				maximumAge: 0, // 캐시에 저장한 위치정보를 대신 반환할 수 있는 최대 시간
				enableHighAccuracy: true, // 위치정보를 가장 높은 정확도로 수신하고 싶은지 여부, T -> 매우 정확(응답속도 감소, 전력 사용량 증가)
				timeout: 10_000, // 10초 안에 위치 정보를 가져오기 (무한 대기 상태 방지 목적)
			}
		);
	}, [isLocationUpdated, setLocation]);

	if (isLocationLoading) {
		return (
			<div className="flex items-center justify-center min-h-svh">
				<div className="text-center">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
					<p className="text-gray-600">위치 정보를 가져오는 중...</p>
				</div>
			</div>
		);
	}

	return children;
}

export default LocationProvider;
