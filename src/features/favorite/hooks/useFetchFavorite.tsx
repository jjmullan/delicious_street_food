import { fetchFavorite } from '@features/favorite/api/favorite';
import { QUERY_KEYS } from '@shared/lib/query';
import { useQuery } from '@tanstack/react-query';

function useFetchFavorite(locationId: string) {
	return useQuery({
		queryKey: QUERY_KEYS.favorite.byLocationId(locationId),
		queryFn: async () => {
			try {
				const user = await fetchFavorite(locationId);
				return user;
			} catch (error) {
				console.error('즐겨찾기 패칭 오류:', error);
				if (error instanceof Error) throw error;
			}
		},
		enabled: !!locationId,
	});
}

export default useFetchFavorite;
