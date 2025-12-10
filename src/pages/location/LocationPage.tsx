import { Link, useParams } from 'react-router';
import useFetchReviewsByLocation from '@/features/review/fetch/hook/useFetchReviewsByLocation';

function LocationPage() {
	const param = useParams();
	const locationId = param.locationId;
	const { data: fetchReviews, isPending: isFetchReviewsPending } = useFetchReviewsByLocation(locationId!);

	// Pending 통합 상태 관리
	const isPending = isFetchReviewsPending;

	return (
		<>
			<div>
				{fetchReviews?.map((review) => (
					<div key={review.review_id}>
						<div>{review.review_title}</div>
						<div>{review.review_text}</div>
					</div>
				))}
			</div>
			<Link to={`/location/${locationId}/review/all`}>리뷰</Link>
		</>
	);
}

export default LocationPage;
