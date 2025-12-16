import { useParams } from 'react-router';
import LocationReviewAll from '@/entities/location/ui/LocationReviewAll';

function ReviewAllPage() {
	const param = useParams();
	const location_id = param.locationId;

	return <LocationReviewAll location_id={location_id!} />;
}

export default ReviewAllPage;
