import { HomeIcon, LocateFixedIcon } from 'lucide-react';
import { Link, useParams } from 'react-router';
import { toast } from 'sonner';
import { useSetLocation } from '@/app/store/locationStore';
import { getLocationData } from '@/features/location/fetch/utils/getLocationData';

function HomeButton() {
	// 쿼리스트링 데이터가 없을 때, 현재 위치로 이동하도록 동작
	const param = useParams();
	const isHome = Object.keys(param).length === 0;
	const setLocation = useSetLocation();
	const handleGoBackToCurrentLocation = async () => {
		try {
			const location = await getLocationData();
			setLocation(location);
		} catch (error) {
			if (error instanceof GeolocationPositionError) {
				switch (error.code) {
					case error.PERMISSION_DENIED:
						toast.error('위치 정보 제공이 거부되었습니다.');
						break;
					case error.POSITION_UNAVAILABLE:
						toast.error('위치 정보를 사용할 수 없습니다.');
						break;
					case error.TIMEOUT:
						toast.error('요청 시간이 초과되었습니다.');
						break;
				}
			} else {
				throw error;
			}
		}
	};

	return (
		<div>
			<h1 className="sr-only">포장맛차</h1>
			<button
				type="button"
				className="w-18 h-18 flex justify-center items-center text-center text-2xl"
				aria-label="현재 위치로 이동"
				onClick={handleGoBackToCurrentLocation}
			>
				<div className="flex flex-col items-center gap-y-1">
					<LocateFixedIcon width={24} height={24} />
					<p className="text-xs font-medium">현재 위치</p>
				</div>
			</button>
		</div>
	);
}

export default HomeButton;
