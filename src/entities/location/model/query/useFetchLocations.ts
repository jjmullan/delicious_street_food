import { fetchLocations } from '@entities/location';
import { QUERY_KEYS } from '@shared/lib/query';
import { useQuery } from '@tanstack/react-query';

/**
 * 모든 위치 목록을 조회하는 React Query 훅
 * @returns 위치 목록 데이터와 쿼리 상태를 포함하는 UseQueryResult 객체
 */
function useFetchLocations() {
	return useQuery({
		queryKey: QUERY_KEYS.location.all,
		queryFn: () => fetchLocations(),
	});
}

export default useFetchLocations;
