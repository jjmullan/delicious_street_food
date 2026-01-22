import { fetchReviewsByLocation } from '@entities/review/api/review';
import { QUERY_KEYS } from '@shared/lib/query';
import { useQuery } from '@tanstack/react-query';

function useFetchReviewsByLocation(location_id: string) {
	return useQuery({
		queryKey: QUERY_KEYS.review.byLocationId(location_id),
		queryFn: () => fetchReviewsByLocation(location_id),
		enabled: !!location_id,
	});
}

export default useFetchReviewsByLocation;
