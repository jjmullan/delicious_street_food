import { Link, useParams } from 'react-router';

function LocationPage() {
	// 포장마차 위치 정보 가져오기
	const param = useParams();
	const location_id = param.locationId;

	return (
		<>
			<h1>LocationPage Component</h1>
			<Link to={`/location/${location_id}/review/all`}>리뷰 목록</Link>
			<Link to={`/location/${location_id}/review/new`}>리뷰 작성</Link>
		</>
	);
}

export default LocationPage;
