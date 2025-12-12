import { useQuery } from '@tanstack/react-query';
import { fetchReviewImages } from '@/features/review/fetch/api/review';
import { QUERY_KEYS } from '@/shared/lib/query';

function useFetchReviewImages(review_id: string) {
	return useQuery({
		queryKey: QUERY_KEYS.review.list,
		queryFn: () => fetchReviewImages(review_id),
	});
}

export default useFetchReviewImages;
