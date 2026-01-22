import { fetchReviewProducts } from '@entities/review';
import { QUERY_KEYS } from '@shared/lib/query';
import { useQuery } from '@tanstack/react-query';

/**
 * 특정 리뷰에 언급된 상품 목록을 조회하는 React Query 훅
 * @param review_id - 조회할 리뷰의 고유 ID
 * @returns 리뷰 상품 목록 데이터와 쿼리 상태를 포함하는 UseQueryResult 객체
 */
function useFetchReviewProducts(review_id: string) {
	return useQuery({
		queryKey: QUERY_KEYS.review.products.byReviewId(review_id),
		queryFn: () => fetchReviewProducts(review_id),
		enabled: !!review_id,
	});
}

export default useFetchReviewProducts;
