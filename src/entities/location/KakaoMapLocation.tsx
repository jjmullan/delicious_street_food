import { LocateFixedIcon } from 'lucide-react';
import { Map } from 'react-kakao-maps-sdk';
import { useLocation } from '@/app/store/location';
import { initialLocation } from '@/entities/location/lib/location';

function KakaoMapLocation() {
	// LocalStorage 에서 현재 Location 데이터를 가져오기
	const location = useLocation();

	return (
		<div className="relative">
			<Map center={location ?? initialLocation} level={3} className="min-w-screen min-h-screen"></Map>
			<div className="absolute left-1/2 bottom-6 z-1 flex gap-x-4">
				<button
					type="button"
					className="w-16 h-16 rounded-full bg-white/80 flex items-center justify-center"
					onClick={() => {}}
				>
					<LocateFixedIcon className="w-8 h-8" />
				</button>
			</div>
		</div>
	);
}

export default KakaoMapLocation;
