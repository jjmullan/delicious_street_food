import { fetchReviewProductsByLocation } from '@entities/review';
import { QUERY_KEYS } from '@shared/lib/query';
import { useQuery } from '@tanstack/react-query';

/**
 * 특정 위치의 모든 리뷰에 언급된 상품 목록을 조회하는 React Query 훅
 * @param location_id - 조회할 위치의 고유 ID
 * @returns 리뷰 상품 목록 데이터와 쿼리 상태를 포함하는 UseQueryResult 객체
 */
function useFetchReviewProductsByLocation(location_id: string) {
	return useQuery({
		queryKey: QUERY_KEYS.review.products.byLocationId(location_id),
		queryFn: () => fetchReviewProductsByLocation(location_id),
		enabled: !!location_id,
	});
}

export default useFetchReviewProductsByLocation;
