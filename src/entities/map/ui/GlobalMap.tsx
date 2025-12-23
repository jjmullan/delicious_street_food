import { useIsCreateMode, useLocationForCreate, useSetCreateLocation } from '@app/store/createLocationStore';
import { useLocation } from '@app/store/locationStore';
import { useProductFilter } from '@app/store/productFilterStore';
import CreateLocation from '@features/location/create/ui/CreateLocation';
import {
	validateLocationDistance,
	validateMaxDistanceFromCurrentLocation,
} from '@features/location/create/utils/validateLocationDistance';
import useFetchLocations from '@features/location/fetch/hooks/useFetchLocations';
import useFetchLocationsByProducts from '@features/location/fetch/hooks/useFetchLocationsByProducts';
import { initialLocation } from '@features/location/fetch/libs/location';
import type { AbbrLocation } from '@features/location/fetch/types/location';
import LocationFinder from '@features/location/fetch/ui/LocationFinder';
import { getLocationAddress } from '@features/location/fetch/utils/getLocationAddress';
import useFecthUserData from '@features/user/fetch/hooks/useFecthUserData';
import type { Session } from '@supabase/supabase-js';
import MapAsideBar from '@widgets/aside/MapAsideBar';
import { TriangleIcon } from 'lucide-react';
import { Activity, useEffect, useState } from 'react';
import { CustomOverlayMap, Map, MarkerClusterer } from 'react-kakao-maps-sdk';
import { useOutletContext, useSearchParams } from 'react-router';
import { toast } from 'sonner';

function GlobalMap() {
	// 세션 데이터 받아오기
	const { session } = useOutletContext<{ session: Session }>();
	const { data: fetchUser } = useFecthUserData(session?.user.id);
	const user_id = fetchUser?.user_id;

	// LocalStorage 에서 현재 나의 위치 데이터를 가져오기
	const [searchParams, setSearchParams] = useSearchParams();
	const location = useLocation() ?? initialLocation;
	const address = getLocationAddress(location);

	// 위치 패칭 API 호출
	const { data: fetchLocation, isPending: isFetchLocationPending } = useFetchLocations();

	// 상품 필터링 데이터 패칭 API 호출
	const productFilter = useProductFilter();
	const filteredProductEnName = productFilter?.product_name_en;
	const { data: fetchFilteredLocations } = useFetchLocationsByProducts(productFilter?.product_id);

	// product_id가 있으면 필터링된 location, 없으면 전체 location 사용
	const displayLocations = productFilter?.product_id ? fetchFilteredLocations : fetchLocation;

	// 클릭한 위치 및 기타 정보를 전역 상태로 관리
	const isCreateMode = useIsCreateMode();
	const [isCreateLocationUIOpen, setIsCreateLocationUIOpen] = useState(false);
	const createLocation = useLocationForCreate() ?? location;
	const setCreateLocation = useSetCreateLocation();

	// 3초 후 열린 모달 닫기
	const [clickedTime, setClickedTime] = useState<number>(0);
	useEffect(() => {
		const timer = setTimeout(() => {
			const currentTime = Date.now();
			if (currentTime - clickedTime < 3000) return;

			setIsCreateLocationUIOpen(false);
		}, 3_000);

		return () => clearTimeout(timer);
	}, [clickedTime]);

	// 지도 드래그 완료 시 중심점을 쿼리스트링에 저장
	const handleDragEnd = (map: kakao.maps.Map) => {
		const center = map.getCenter();
		const lat = center.getLat();
		const lng = center.getLng();

		setSearchParams({ lat: lat.toString(), lng: lng.toString() });
	};
	const draggedLocation: AbbrLocation = {
		lat: Number(searchParams.get('lat')),
		lng: Number(searchParams.get('lng')),
	};

	// 모달 닫기
	const handleCloseModal = () => {
		setIsCreateLocationUIOpen(false);
	};

	// isPending 상태 통합 관리
	const isPending = isFetchLocationPending;

	return (
		<div className="relative">
			<main className="relative">
				<Activity mode={isPending ? 'hidden' : 'visible'}>
					<Map
						center={draggedLocation ?? location}
						level={3}
						className="h-svh"
						onDragEnd={handleDragEnd}
						onDoubleClick={() => {
							return;
						}}
						onClick={(_, mouseEvent) => {
							if (!isCreateMode) return;

							const latLng = mouseEvent.latLng;
							const lat = latLng.getLat();
							const lng = latLng.getLng();
							const newLocation: AbbrLocation = { lat, lng };

							// 현재 위치로부터 최대 거리 검증 (1km 이내)
							const isWithinMaxDistance = validateMaxDistanceFromCurrentLocation(newLocation, location!);
							if (!isWithinMaxDistance) {
								toast.warning('현재 위치로부터 3km 이내만 등록할 수 있습니다.', { position: 'top-center' });
								return;
							}

							// 기존 위치들과의 거리 검증 (최소 10미터 이상)
							const isValidDistance = validateLocationDistance(newLocation, fetchLocation!);
							if (!isValidDistance) {
								toast.warning('기존 포장마차로부터 10미터 이내인 곳은 등록이 불가합니다.', { position: 'top-center' });
								return;
							}

							// 지도 위치 클릭 시, 생성 UI 강제 팝업 및 클릭 위치 저장
							setIsCreateLocationUIOpen(true);
							setCreateLocation(newLocation);

							const time = Date.now();
							setClickedTime(time);

							console.log('생성 위치 위도/경도 :', newLocation);
						}}
						isPanto={true}
						disableDoubleClick={isPending}
						disableDoubleClickZoom={isPending}
					>
						<MarkerClusterer averageCenter={true} minLevel={6}>
							{/* 전체 위치 마커 또는 필터링된 위치 마커 */}
							{displayLocations?.map((location) => (
								<CustomOverlayMap
									key={location.location_id}
									position={{ lat: Number(location.latitude), lng: Number(location.longitude) }}
									clickable={true}
								>
									<LocationFinder
										is_my_location={false}
										location={location}
										user_id={location.user_id ?? undefined}
										product_name_en={filteredProductEnName!}
									/>
								</CustomOverlayMap>
							))}

							{/* 현재 위치 마커 */}
							<CustomOverlayMap position={{ lat: location!.lat, lng: location!.lng }} clickable={true}>
								<div className="relative flex flex-col items-center gap-y-1">
									<TriangleIcon
										className="rotate-180 w-3.5 h-3.5 fill-black animate-bounce absolute -top-5 z-2"
										strokeWidth={1.8}
									/>
									<LocationFinder is_my_location={true} user_id={user_id} />
								</div>
							</CustomOverlayMap>
							{/* 신규 위치 마커 */}
							<Activity mode={isCreateLocationUIOpen ? 'visible' : 'hidden'}>
								<CreateLocation createLocation={createLocation} handleCloseModal={handleCloseModal} />
							</Activity>
						</MarkerClusterer>
					</Map>
				</Activity>
			</main>
			<MapAsideBar />
		</div>
	);
}

export default GlobalMap;
