import { fetchReviewsByUser } from '@entities/review';
import { QUERY_KEYS } from '@shared/lib/query';
import { useQuery } from '@tanstack/react-query';

/**
 * 특정 사용자가 작성한 리뷰 목록을 조회하는 React Query 훅
 * @param user_id - 조회할 사용자의 고유 ID
 * @returns 리뷰 목록 데이터와 쿼리 상태를 포함하는 UseQueryResult 객체
 */
function useFetchReviewsByUser(user_id: string) {
	return useQuery({
		queryKey: QUERY_KEYS.review.byUserId(user_id),
		queryFn: () => fetchReviewsByUser(user_id),
		enabled: !!user_id,
	});
}

export default useFetchReviewsByUser;
