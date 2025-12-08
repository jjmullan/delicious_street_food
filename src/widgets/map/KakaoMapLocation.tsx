import { Activity, useEffect, useState } from 'react';
import { CustomOverlayMap, Map, MarkerClusterer } from 'react-kakao-maps-sdk';
import { toast } from 'sonner';
import { useLocation } from '@/app/store/locationStore';
import { useSession } from '@/app/store/sessionStore';
import CreateLocation from '@/features/location/create/ui/CreateLocation';
import {
	validateLocationDistance,
	validateMaxDistanceFromCurrentLocation,
} from '@/features/location/create/utils/validateLocationDistance';
import useFetchLocations from '@/features/location/fetch/hooks/useFetchLocations';
import { initialLocation } from '@/features/location/fetch/libs/location';
import type { AbbrLocation } from '@/features/location/fetch/types/location';
import CurrentLocation from '@/features/location/fetch/ui/CurrentLocation';
import LocationFinder from '@/features/location/fetch/ui/LocationFinder';
import useFecthUserData from '@/features/user/fetch/hooks/useFecthUserData';
import LoggedInUserOnlyAsideBar from '@/widgets/aside/LoggedInUserOnlyAsideBar';

function KakaoMapLocation() {
	// LocalStorage 에서 현재 나의 위치 데이터를 가져오기
	const location = useLocation();

	// 위치 패칭 API 호출
	const { data: fetchLocation, error: isFetchLocationError, isPending: isFetchLocationPending } = useFetchLocations();
	if (isFetchLocationError) {
		toast.error('위치 정보를 가져올 수 없습니다.', { position: 'top-center' });
	}

	// 세션 데이터 추출
	const session = useSession();
	const user_id = session!.user.id;
	const { error } = useFecthUserData(session?.user.id);
	if (error) {
		toast.error('현재 사용자 정보를 가져올 수 없습니다.', { position: 'top-center' });
	}

	// 클릭한 위치를 전역 상태로 관리
	const [isCreateLocationOpen, setIsCreateLocationOpen] = useState(false);
	const [createLocation, setCreateLocation] = useState<AbbrLocation>();

	// 3초 후 클릭 상태 전환
	useEffect(() => {
		const timer = setTimeout(() => {
			setIsCreateLocationOpen(false);
		}, 3_000);

		return () => clearTimeout(timer);
	}, [isCreateLocationOpen]);

	// 모달 닫기
	const handleCloseModal = () => {
		setIsCreateLocationOpen(false);
	};

	// isPending 상태 통합 관리
	const isPending = isFetchLocationPending;

	return (
		<div className="relative">
			<Activity mode={isPending ? 'hidden' : 'visible'}>
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
						const isValidDistance = validateLocationDistance(newLocation, fetchLocation!);
						if (!isValidDistance) {
							toast.warning('등록된 매장의 위치로부터 10미터 이내이면 등록이 불가합니다.', { position: 'top-center' });
							return;
						}

						// 지도 위치 클릭 시, 생성 UI 강제 팝업 및 클릭 위치 저장
						setIsCreateLocationOpen(true);
						setCreateLocation(newLocation);
						console.log('생성 위치 위도/경도 :', newLocation);
					}}
					isPanto={true}
					disableDoubleClick={isPending}
					disableDoubleClickZoom={isPending}
				>
					<MarkerClusterer averageCenter={true} minLevel={6}>
						{/* 전체 위치 마커 */}
						{fetchLocation?.map((location) => (
							<CustomOverlayMap
								key={location.location_id}
								position={{ lat: Number(location.latitude), lng: Number(location.longitude) }}
								clickable={true}
							>
								<LocationFinder is_my_location={false} user_Id={user_id} {...location} />
							</CustomOverlayMap>
						))}

						{/* 현재 위치 마커 */}
						<CustomOverlayMap position={{ lat: location!.lat, lng: location!.lng }} clickable={true}>
							<button type="button">
								<CurrentLocation />
							</button>
						</CustomOverlayMap>
						{/* 신규 위치 마커 */}
						<Activity mode={isCreateLocationOpen ? 'visible' : 'hidden'}>
							<CreateLocation createLocation={createLocation!} handleCloseModal={handleCloseModal} />
						</Activity>
					</MarkerClusterer>
				</Map>
				<LoggedInUserOnlyAsideBar />
			</Activity>
		</div>
	);
}

export default KakaoMapLocation;
