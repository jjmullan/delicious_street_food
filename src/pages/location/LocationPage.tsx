import { useParams } from 'react-router';
import NonMapHeader from '@/widgets/header/NonMapHeader';

function LocationPage() {
	const param = useParams();
	const locationId = param.locationId;

	return (
		<>
			<NonMapHeader mode={'extra'} />
			<h1>{locationId}의 장소 상세페이지</h1>
		</>
	);
}

export default LocationPage;
