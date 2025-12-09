import { Link, useParams } from 'react-router';

function ReviewListPage() {
	// 포장마차 위치 정보 가져오기
	const param = useParams();
	const location_id = param.locationId;

	return (
		<>
			<h1>ReviewListPage Component</h1>
			<Link to={`/location/${location_id}/review/new`}>리뷰 작성</Link>
		</>
	);
}

export default ReviewListPage;
