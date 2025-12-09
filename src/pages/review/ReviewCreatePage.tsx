import { useParams } from 'react-router';

function ReviewCreatePage() {
	const param = useParams();
	const location_id = param.locationId;
	const user_id = param.userId;

	return (
		<>
			<p>{location_id}</p>
			<p>{user_id}</p>
		</>
	);
}

export default ReviewCreatePage;
