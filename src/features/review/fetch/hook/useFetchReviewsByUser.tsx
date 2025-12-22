import { useQuery } from '@tanstack/react-query';
import { fetchReviewsByUser } from '@/features/review/fetch/api/review';
import { QUERY_KEYS } from '@/shared/lib/query';

function useFetchReviewsByUser(user_id: string) {
	return useQuery({
		queryKey: QUERY_KEYS.review.byUserId(user_id),
		queryFn: () => fetchReviewsByUser(user_id),
		enabled: !!user_id,
	});
}

export default useFetchReviewsByUser;
