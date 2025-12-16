import { useQuery } from '@tanstack/react-query';
import { fetchReviewProducts } from '@/features/review/fetch/api/review';
import { QUERY_KEYS } from '@/shared/lib/query';

function useFetchReviewProductsByReview(review_id: string) {
	return useQuery({
		queryKey: QUERY_KEYS.review.products.byReviewId(review_id),
		queryFn: () => fetchReviewProducts(review_id),
		enabled: !!review_id,
	});
}

export default useFetchReviewProductsByReview;
