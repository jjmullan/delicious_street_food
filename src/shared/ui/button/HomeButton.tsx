import { LocateFixedIcon } from 'lucide-react';
import { Activity } from 'react';
import { useSearchParams } from 'react-router';
import { toast } from 'sonner';
import { useIsCreateMode } from '@/app/store/createLocationStore';
import { useSetLocation } from '@/app/store/locationStore';
import { getLocationData } from '@/features/location/fetch/utils/getLocationData';

function HomeButton() {
	const [searchParams, setSearchParams] = useSearchParams();

	const isCreateMode = useIsCreateMode();
	const setLocation = useSetLocation();
	const handleGoBackToCurrentLocation = async () => {
		try {
			const location = await getLocationData();
			setSearchParams({ lat: location.lat.toString(), lng: location.lng.toString() });
			setLocation(location);
		} catch (error) {
			if (error instanceof GeolocationPositionError) {
				switch (error.code) {
					case error.PERMISSION_DENIED:
						toast.error('위치 정보 제공이 거부되어 있습니다.', {
							position: 'top-center',
						});
						break;
					case error.POSITION_UNAVAILABLE:
						toast.error('위치 정보를 사용할 수 없습니다.', { position: 'top-center' });
						break;
					case error.TIMEOUT:
						toast.error('요청 시간이 초과되었습니다.', { position: 'top-center' });
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
				<Activity mode={isCreateMode ? 'hidden' : 'visible'}>
					<div className="flex flex-col items-center gap-y-1">
						<LocateFixedIcon width={24} height={24} strokeWidth={1.8} />
						<p className="text-xs font-medium">현재 위치</p>
					</div>
				</Activity>
			</button>
		</div>
	);
}

export default HomeButton;
