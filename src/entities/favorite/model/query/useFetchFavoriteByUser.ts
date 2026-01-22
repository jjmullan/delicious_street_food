import { fetchFavoriteByUser } from '@entities/favorite';
import { QUERY_KEYS } from '@shared/lib/query';
import { useQuery } from '@tanstack/react-query';

/**
 * 특정 사용자의 즐겨찾기 목록을 조회하는 React Query 훅
 * @param user_id - 조회할 사용자의 고유 ID
 * @returns 즐겨찾기 목록 데이터와 쿼리 상태를 포함하는 UseQueryResult 객체
 * @throws 즐겨찾기 패칭 오류 발생 시 에러를 throw
 */
function useFetchFavoriteByUser(user_id: string) {
	return useQuery({
		queryKey: QUERY_KEYS.favorite.byUserId(user_id),
		queryFn: async () => {
			try {
				const user = await fetchFavoriteByUser(user_id);
				return user;
			} catch (error) {
				console.error('즐겨찾기 패칭 오류:', error);
				if (error instanceof Error) throw error;
			}
		},
		enabled: !!user_id,
	});
}

export default useFetchFavoriteByUser;
