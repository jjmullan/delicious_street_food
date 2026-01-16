import { fetchReviewImages } from '@entities/review/api/review';
import { QUERY_KEYS } from '@shared/lib/query';
import { useQuery } from '@tanstack/react-query';

function useFetchReviewImages(review_id: string) {
	return useQuery({
		queryKey: QUERY_KEYS.review.images.byReviewId(review_id),
		queryFn: () => fetchReviewImages(review_id),
		enabled: !!review_id,
	});
}

export default useFetchReviewImages;
