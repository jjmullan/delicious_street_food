import { Activity } from 'react';
import { CustomOverlayMap, Map, MarkerClusterer } from 'react-kakao-maps-sdk';
import { toast } from 'sonner';
import { useLocation } from '@/app/store/locationStore';
import { useSession } from '@/app/store/sessionStore';
import useCreateLocation from '@/features/location/create/hooks/useCreateLocation';
import {
	validateLocationDistance,
	validateMaxDistanceFromCurrentLocation,
} from '@/features/location/create/utils/validateLocationDistance';
import useFetchLocation from '@/features/location/fetch/hooks/useFetchLocation';
import { initialLocation } from '@/features/location/fetch/libs/location';
import type { AbbrLocation } from '@/features/location/fetch/types/location';
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
		toast.error('위치 정보를 가져올 수 없습니다.', { position: 'top-center' });
	}

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
		toast.error('현재 사용자 정보를 가져올 수 없습니다.', { position: 'top-center' });
	}

	// 내 프로필 아이콘 클릭 이벤트
	const handleClickMyLocation = () => {
		console.log('프로필 클릭');
	};

	// isPending 상태 통합 관리
	const isPending = isFetchLocationPending || isCreateLocationPending;

	return (
		<div className="relative">
			<Map
				center={location ?? initialLocation}
				level={3}
				className="min-h-screen"
				onDoubleClick={() => {
					return;
				}}
				onClick={(_, mouseEvent) => {
					const latLng = mouseEvent.latLng;
					const lat = latLng.getLat();
					const lng = latLng.getLng();
					const newLocation: AbbrLocation = { lat, lng };

					// 현재 위치로부터 최대 거리 검증 (1km 이내)
					const isWithinMaxDistance = validateMaxDistanceFromCurrentLocation(newLocation, location!);
					if (!isWithinMaxDistance) {
						toast.warning('현재 위치로부터 3km 이내인 경우 등록할 수 있습니다.', { position: 'top-center' });
						return;
					}

					// 기존 위치들과의 거리 검증 (최소 10미터 이상)
					const isValidDistance = validateLocationDistance(newLocation, fetchLocation);
					if (!isValidDistance) {
						toast.warning('등록된 매장의 위치로부터 10미터 이내이면 등록이 불가합니다.', { position: 'top-center' });
						return;
					}

					// 모든 검증 통과 시 위치 생성
					createLocation({
						user_id,
						latitude: String(lat),
						longitude: String(lng),
					});
				}}
				isPanto={true}
				disableDoubleClick={isPending}
				disableDoubleClickZoom={isPending}
			>
				<MarkerClusterer averageCenter={true} minLevel={6}>
					{/* Fallback UI */}
					<Activity mode={isFetchLocationPending ? 'visible' : 'hidden'}>
						<LocationFinderSkeleton />
					</Activity>
					{/* 전체 위치 마커 */}
					<Activity mode={isFetchLocationPending ? 'hidden' : 'visible'}>
						{fetchLocation?.map((location) => (
							<CustomOverlayMap
								key={location.location_id}
								position={{ lat: Number(location.latitude), lng: Number(location.longitude) }}
								clickable={true}
							>
								<LocationFinder is_my_location={false} user_Id={user_id} {...location} />
							</CustomOverlayMap>
						))}
					</Activity>
					{/* 현재 위치 마커 */}
					<CustomOverlayMap position={{ lat: location!.lat, lng: location!.lng }} clickable={true}>
						<button type="button" onClick={handleClickMyLocation}>
							<CurrentLocation />
						</button>
					</CustomOverlayMap>
				</MarkerClusterer>
			</Map>
			<LoggedInUserOnlyAsideBar />
		</div>
	);
}

export default KakaoMapLocation;
