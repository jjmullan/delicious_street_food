import { useQuery } from '@tanstack/react-query';
import { fetchReviewProducts } from '@/features/review/fetch/api/review';
import { QUERY_KEYS } from '@/shared/lib/query';

function useFetchReviewProducts(review_id: string) {
	return useQuery({
		queryKey: QUERY_KEYS.review.byId(review_id),
		queryFn: () => fetchReviewProducts(review_id),
	});
}

export default useFetchReviewProducts;
