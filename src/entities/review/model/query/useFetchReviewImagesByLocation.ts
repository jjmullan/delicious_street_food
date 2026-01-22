import { fetchReviewImagesByLocation } from '@entities/review';
import { QUERY_KEYS } from '@shared/lib/query';
import { useQuery } from '@tanstack/react-query';

/**
 * 특정 위치의 모든 리뷰에 첨부된 이미지 목록을 조회하는 React Query 훅
 * @param location_id - 조회할 위치의 고유 ID
 * @returns 리뷰 이미지 목록 데이터와 쿼리 상태를 포함하는 UseQueryResult 객체
 */
function useFetchReviewImagesByLocation(location_id: string) {
	return useQuery({
		queryKey: QUERY_KEYS.review.images.byLocationId(location_id),
		queryFn: () => fetchReviewImagesByLocation(location_id),
		enabled: !!location_id,
	});
}

export default useFetchReviewImagesByLocation;
