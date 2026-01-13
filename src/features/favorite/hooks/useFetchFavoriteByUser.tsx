import { fetchFavoritebyUser } from '@features/favorite/api/favorite';
import { QUERY_KEYS } from '@shared/lib/query';
import { useQuery } from '@tanstack/react-query';

function useFetchFavoriteByUser(user_id: string) {
	return useQuery({
		queryKey: QUERY_KEYS.favorite.byUserId(user_id),
		queryFn: async () => {
			try {
				const user = await fetchFavoritebyUser(user_id);
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
