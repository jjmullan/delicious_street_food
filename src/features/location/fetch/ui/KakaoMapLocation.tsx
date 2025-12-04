import { Activity, useState } from 'react';
import { CustomOverlayMap, Map, MarkerClusterer } from 'react-kakao-maps-sdk';
import { useLocation } from '@/app/store/locationStore';
import CreateLocation from '@/features/location/create/ui/CreateLocation';
import { initialLocation } from '@/features/location/fetch/libs/location';
import type { Location } from '@/features/location/fetch/types/types';
import CurrentLocation from '@/features/location/fetch/ui/CurrentLocation';
import ProductList from '@/features/product/item/ui/ProductList';

function KakaoMapLocation() {
	// LocalStorage 에서 현재 Location 데이터를 가져오기
	const location = useLocation();

	// 클릭한 경도, 위도 위치 상태
	const [clickedLocation, setClickedLocation] = useState<Location>({
		lat: location?.lat ?? initialLocation.lat,
		lng: location?.lng ?? initialLocation.lng,
	});

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

					const latDistance = Math.abs(clickedLocation.lat - lat) * 10_000;
					const lngDistance = Math.abs(clickedLocation.lng - lng) * 10_000;

					if (latDistance > 1 || lngDistance > 1) {
						setClickedLocation({
							lat,
							lng,
						});
					} else {
						return;
					}
				}}
			>
				{/* <MapMarker position={{ lat: location!.lat, lng: location!.lng }}>
					<div style={{ color: '#000' }}>현재 위치</div>
				</MapMarker> */}
				<MarkerClusterer averageCenter={true} minLevel={10}></MarkerClusterer>
				<CustomOverlayMap position={{ lat: location!.lat, lng: location!.lng }}>
					<CurrentLocation />
				</CustomOverlayMap>
				<CustomOverlayMap position={{ lat: clickedLocation.lat, lng: clickedLocation.lng }}>
					<Activity mode={clickedLocation === initialLocation ? 'hidden' : 'visible'}>
						<CreateLocation />
					</Activity>
				</CustomOverlayMap>
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
			<ProductList />
		</div>
	);
}

export default KakaoMapLocation;
