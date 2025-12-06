import { useEffect, useState } from 'react';
import { CustomOverlayMap, Map, MarkerClusterer } from 'react-kakao-maps-sdk';
import { toast } from 'sonner';
import { useLocation } from '@/app/store/locationStore';
import { useSession } from '@/app/store/sessionStore';
import useCreateLocation from '@/features/location/create/hooks/useCreateLocation';
import useFetchLocation from '@/features/location/fetch/hooks/useFetchLocation';
import { initialLocation } from '@/features/location/fetch/libs/location';
import type { Location } from '@/features/location/fetch/types/types';
import CurrentLocation from '@/features/location/fetch/ui/CurrentLocation';
import LocationFinder from '@/features/location/fetch/ui/LocationFinder';
import LocationFinderSkeleton from '@/features/location/fetch/ui/LocationFinderSkeleton';
import useFecthUserData from '@/features/user/fetch/hooks/useFecthUserData';
import LoggedInUserOnlyAsideBar from '@/widgets/aside/LoggedInUserOnlyAsideBar';

function KakaoMapLocation() {
	// LocalStorage 에서 현재 나의 위치 데이터를 가져오기
	const location = useLocation();

	// 위치 패칭 API 호출
	const { data: fetchLocation, error: isFetchLocationError, isPending: isFetchLocationPending } = useFetchLocation();
	if (isFetchLocationError) {
		toast.error('포장마차 위치를 가져올 수 없습니다. 개발자에게 문의해주세요!', { position: 'top-center' });
	}

	// 클릭한 경도, 위도 위치 상태
	const [clickedLocation, setClickedLocation] = useState<Location>({
		lat: location?.lat ?? initialLocation.lat,
		lng: location?.lng ?? initialLocation.lng,
	});

	// 위치 생성 API 호출
	const { mutate: createLocation, isPending: isCreateLocationPending } = useCreateLocation({
		onSuccess: () => {
			toast.info('위치 등록이 성공했습니다.', { position: 'top-center' });
		},
		onError: (error) => {
			toast.error('위치 등록이 실패했습니다.', { position: 'top-center' });
			throw error;
		},
	});

	// 세션 데이터 추출
	const session = useSession();
	const user_id = session!.user.id;
	const { error } = useFecthUserData(session?.user.id);

	if (error) {
		toast.error('유저 데이터 패칭에 실패했습니다.', { position: 'top-center' });
	}

	return (
		<div className="relative">
			<Map
				center={location ?? initialLocation}
				level={3}
				className="min-h-screen"
				onClick={(_, mouseEvent) => {
					const latLng = mouseEvent.latLng;
					const lat = latLng.getLat();
					const lng = latLng.getLng();
					console.log('위도:', lat);
					console.log('경도:', lng);

					// 이전에 클릭한 위치와 현재 클릭한 위치의 값을 절대값으로 치환
					const latDistance = Math.abs(clickedLocation.lat - lat) * 10_000;
					const lngDistance = Math.abs(clickedLocation.lng - lng) * 10_000;

					setClickedLocation({
						lat,
						lng,
					});

					// 인접한 위치에 있는 경우, 등록을 취소
					if (latDistance > 1 || lngDistance > 1) {
						createLocation({
							user_id,
							latitude: String(lat),
							longitude: String(lng),
						});
					} else {
						return;
					}
				}}
				isPanto={true}
				disableDoubleClick={isCreateLocationPending}
				disableDoubleClickZoom={isCreateLocationPending}
			>
				<MarkerClusterer averageCenter={true} minLevel={10}></MarkerClusterer>
				{/* 현재 위치 마커 */}
				<CustomOverlayMap position={{ lat: location!.lat, lng: location!.lng }}>
					<CurrentLocation />
				</CustomOverlayMap>
				{/* 저장된 지도 위치 마커 */}
				{isFetchLocationPending ? (
					<LocationFinderSkeleton />
				) : (
					fetchLocation?.map((location) => (
						<CustomOverlayMap
							key={location.location_id}
							position={{ lat: Number(location.latitude), lng: Number(location.longitude) }}
						>
							{/* 포장마차 이미지 */}
							<LocationFinder is_my_location={false} user_Id={user_id} />
						</CustomOverlayMap>
					))
				)}
				{/* <CustomOverlayMap position={{ lat: clickedLocation.lat, lng: clickedLocation.lng }}>
					<Activity mode={clickedLocation === initialLocation ? 'hidden' : 'visible'}>
						<CreateLocation />
					</Activity>
				</CustomOverlayMap> */}
			</Map>
			<LoggedInUserOnlyAsideBar />
		</div>
	);
}

export default KakaoMapLocation;
