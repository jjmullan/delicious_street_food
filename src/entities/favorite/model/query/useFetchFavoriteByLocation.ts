import { fetchFavoriteByLocation } from '@entities/favorite';
import { QUERY_KEYS } from '@shared/lib/query';
import { useQuery } from '@tanstack/react-query';

/**
 * 특정 위치에 대한 즐겨찾기 정보를 조회하는 React Query 훅
 * @param locationId - 조회할 위치의 고유 ID
 * @returns 즐겨찾기 데이터와 쿼리 상태를 포함하는 UseQueryResult 객체
 * @throws 즐겨찾기 패칭 오류 발생 시 에러를 throw
 */
export default function useFetchFavoriteByLocation(locationId: string) {
	return useQuery({
		queryKey: QUERY_KEYS.favorite.byLocationId(locationId),
		queryFn: async () => {
			try {
				const user = await fetchFavoriteByLocation(locationId);
				return user;
			} catch (error) {
				console.error('즐겨찾기 패칭 오류:', error);
				if (error instanceof Error) throw error;
			}
		},
		enabled: !!locationId,
	});
}
