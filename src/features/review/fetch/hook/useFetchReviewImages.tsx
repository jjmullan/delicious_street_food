import { useQuery } from '@tanstack/react-query';
import { fetchReviewImages } from '@/features/review/fetch/api/review';
import { QUERY_KEYS } from '@/shared/lib/query';

function useFetchReviewImagesByReview(review_id: string) {
	return useQuery({
		queryKey: QUERY_KEYS.review.images.byReviewId(review_id),
		queryFn: () => fetchReviewImages(review_id),
		enabled: !!review_id,
	});
}

export default useFetchReviewImagesByReview;
