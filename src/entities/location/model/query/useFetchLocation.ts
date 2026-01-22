import { fetchLocation } from '@entities/location';
import { QUERY_KEYS } from '@shared/lib/query';
import { useQuery } from '@tanstack/react-query';

/**
 * 특정 위치 정보를 조회하는 React Query 훅
 * @param location_id - 조회할 위치의 고유 ID
 * @returns 위치 데이터와 쿼리 상태를 포함하는 UseQueryResult 객체
 */
function useFetchLocation(location_id: string) {
	return useQuery({
		queryKey: QUERY_KEYS.location.byId(location_id),
		queryFn: () => fetchLocation(location_id),
	});
}

export default useFetchLocation;
