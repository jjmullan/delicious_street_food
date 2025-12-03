import { LocateFixedIcon, TriangleIcon } from 'lucide-react';
import { CustomOverlayMap, Map, MarkerClusterer } from 'react-kakao-maps-sdk';
import { useLocation } from '@/app/store/locationStore';
import { initialLocation } from '@/features/location/fetch/libs/location';
import ProductList from '@/features/product/item/ui/ProductList';

function KakaoMapLocation() {
	// LocalStorage 에서 현재 Location 데이터를 가져오기
	const location = useLocation();

	return (
		<div className="relative">
			<Map center={location ?? initialLocation} level={3} className="min-h-screen">
				{/* <MapMarker position={{ lat: location!.lat, lng: location!.lng }}>
					<div style={{ color: '#000' }}>현재 위치</div>
				</MapMarker> */}
				<MarkerClusterer averageCenter={true} minLevel={10}></MarkerClusterer>
				<CustomOverlayMap position={{ lat: location!.lat, lng: location!.lng }}>
					<div className="flex flex-col items-center gap-y-1.5">
						<TriangleIcon className="rotate-180 w-4 h-4 fill-red-700 animate-bounce" />
						<div className="rounded-full bg-black w-6 h-6 border-4 border-white" />
					</div>
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
