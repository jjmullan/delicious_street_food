import { useParams } from 'react-router';
import NonMapHeader from '@/widgets/header/NonMapHeader';

function ReviewCreatePage() {
	const param = useParams();
	const location_id = param.locationId;
	const user_id = param.userId;

	return (
		<>
			<NonMapHeader mode={'extra'} />
			<p>{location_id}</p>
			<p>{user_id}</p>
		</>
	);
}

export default ReviewCreatePage;
