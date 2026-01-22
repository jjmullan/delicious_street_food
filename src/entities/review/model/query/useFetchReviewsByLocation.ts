import { fetchReviewsByLocation } from '@entities/review';
import { QUERY_KEYS } from '@shared/lib/query';
import { useQuery } from '@tanstack/react-query';

/**
 * 특정 위치에 작성된 리뷰 목록을 조회하는 React Query 훅
 * @param location_id - 조회할 위치의 고유 ID
 * @returns 리뷰 목록 데이터와 쿼리 상태를 포함하는 UseQueryResult 객체
 */
function useFetchReviewsByLocation(location_id: string) {
	return useQuery({
		queryKey: QUERY_KEYS.review.byLocationId(location_id),
		queryFn: () => fetchReviewsByLocation(location_id),
		enabled: !!location_id,
	});
}

export default useFetchReviewsByLocation;
