import { useQuery } from '@tanstack/react-query';
import { fetchReviewsByLocation } from '@/features/review/fetch/api/review';
import { QUERY_KEYS } from '@/shared/lib/query';

function useFetchReviewsByLocation(location_id: string) {
	return useQuery({
		queryKey: QUERY_KEYS.review.byLocationId(location_id),
		queryFn: () => fetchReviewsByLocation(location_id),
		enabled: !!location_id,
	});
}

export default useFetchReviewsByLocation;
