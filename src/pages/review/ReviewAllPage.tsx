import LocationReviewAll from '@entities/location/ui/LocationReviewAll';
import { useParams } from 'react-router';

export default function ReviewAllPage() {
	const param = useParams();
	const location_id = param.locationId;

	return <LocationReviewAll location_id={location_id!} />;
}
