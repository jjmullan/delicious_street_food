import { useParams } from 'react-router';

function LocationPage() {
	const param = useParams();
	const locationId = param.locationId;

	return <h1>{locationId}의 장소 상세페이지</h1>;
}

export default LocationPage;
