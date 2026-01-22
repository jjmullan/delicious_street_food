import { fetchReviewProducts } from '@entities/review';
import { QUERY_KEYS } from '@shared/lib/query';
import { useQuery } from '@tanstack/react-query';

function useFetchReviewProducts(review_id: string) {
	return useQuery({
		queryKey: QUERY_KEYS.review.products.byReviewId(review_id),
		queryFn: () => fetchReviewProducts(review_id),
		enabled: !!review_id,
	});
}

export default useFetchReviewProducts;
