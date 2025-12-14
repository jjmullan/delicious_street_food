import { useParams } from 'react-router';
import LocationNavigation from '@/entities/location/ui/LocationNavigation';
import useFetchReviewsByLocation from '@/features/review/fetch/hook/useFetchReviewsByLocation';

function LocationHome() {
	const param = useParams();
	const location_id = param.locationId;
	const { data: fetchReviews, isPending: isFetchReviewsPending } = useFetchReviewsByLocation(location_id!);

	return (
		<>
			{/* 네비게이션 */}
			<LocationNavigation location_id={location_id!} />
			<main className="p-3"></main>
		</>
	);
}

export default LocationHome;
