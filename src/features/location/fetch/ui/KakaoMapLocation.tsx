import { useState } from 'react';
import { CustomOverlayMap, Map, MarkerClusterer } from 'react-kakao-maps-sdk';
import { toast } from 'sonner';
import { useLocation } from '@/app/store/locationStore';
import { useSession } from '@/app/store/sessionStore';
import useCreateLocation from '@/features/location/create/hooks/useCreateLocation';
import { initialLocation } from '@/features/location/fetch/libs/location';
import type { Location } from '@/features/location/fetch/types/types';
import CurrentLocation from '@/features/location/fetch/ui/CurrentLocation';
import SearchLocationBar from '@/features/location/fetch/ui/SearchLocationBar';
import ProductList from '@/features/product/item/ui/ProductList';
import useFecthUserData from '@/features/user/fetch/hooks/useFecthUserData';

function KakaoMapLocation() {
	// LocalStorage 에서 현재 Location 데이터를 가져오기
	const location = useLocation();

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
				{/* <MapMarker position={{ lat: location!.lat, lng: location!.lng }}>
					<div style={{ color: '#000' }}>현재 위치</div>
				</MapMarker> */}
				<MarkerClusterer averageCenter={true} minLevel={10}></MarkerClusterer>
				<CustomOverlayMap position={{ lat: location!.lat, lng: location!.lng }}>
					<CurrentLocation />
				</CustomOverlayMap>
				{/* <CustomOverlayMap position={{ lat: clickedLocation.lat, lng: clickedLocation.lng }}>
					<Activity mode={clickedLocation === initialLocation ? 'hidden' : 'visible'}>
						<CreateLocation />
					</Activity>
				</CustomOverlayMap> */}
			</Map>
			{/* <div className="absolute left-1/2 translate-x-[-50%] bottom-6 z-1 flex gap-x-4">
				<button
					type="button"
					id="glass"
					className="w-16 h-16 rounded-full bg-white/80 flex items-center justify-center"
					onClick={() => {}}
				>
					<LocateFixedIcon className="w-8 h-8" />
				</button>
			</div> */}
			<SearchLocationBar />
			<ProductList />
		</div>
	);
}

export default KakaoMapLocation;
