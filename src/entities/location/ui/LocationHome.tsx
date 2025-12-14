import { ClockIcon, MapPinIcon, TimerIcon } from 'lucide-react';
import { Activity } from 'react';
import { CustomOverlayMap } from 'react-kakao-maps-sdk';
import { useParams } from 'react-router';
import LocationMap from '@/entities/map/ui/LocationMap';
import useFetchLocation from '@/features/location/fetch/hooks/useFetchLocation';
import LocationFinder from '@/features/location/fetch/ui/LocationFinder';
import { getFullLocationAddress } from '@/features/location/fetch/utils/getLocationAddress';
import useFetchReviewsByLocation from '@/features/review/fetch/hook/useFetchReviewsByLocation';

function LocationHome() {
	const param = useParams();
	const location_id = param.locationId;
	const { data: fetchLocation, isPending: isFetchLocationPending } = useFetchLocation(location_id!);
	const { data: fetchReviews, isPending: isFetchReviewsPending } = useFetchReviewsByLocation(location_id!);

	// 위도/경도 기반 주소 데이터 추출
	const lat = Number(fetchLocation?.latitude);
	const lng = Number(fetchLocation?.longitude);
	const address = getFullLocationAddress({ lat: lat!, lng: lng! });

	// Pending 통합 상태 관리
	const isPending = isFetchLocationPending || isFetchReviewsPending;

	return (
		<Activity mode={isPending ? 'hidden' : 'visible'}>
			<div className="p-3">
				<section className="flex flex-col gap-y-2">
					<div className="flex items-center gap-x-2">
						<div className="flex items-center justify-center w-6">
							<ClockIcon width={18} height={18} strokeWidth={1.8} />
						</div>
						<p>영업시간</p>
					</div>
					<div className="flex items-center gap-x-2">
						<div className="flex items-center justify-center w-6">
							<MapPinIcon width={20} height={20} strokeWidth={1.8} />
						</div>
						<p>{address}</p>
					</div>
				</section>
				<LocationMap lat={lat} lng={lng}>
					<CustomOverlayMap position={{ lat, lng }} clickable={true}>
						<LocationFinder is_my_location={false} {...location} />
					</CustomOverlayMap>
				</LocationMap>
			</div>
		</Activity>
	);
}

export default LocationHome;
