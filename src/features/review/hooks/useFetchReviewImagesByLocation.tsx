import { fetchReviewImagesByLocation } from '@features/review/api/review';
import { QUERY_KEYS } from '@shared/lib/query';
import { useQuery } from '@tanstack/react-query';

function useFetchReviewImagesByLocation(location_id: string) {
	return useQuery({
		queryKey: QUERY_KEYS.review.images.byLocationId(location_id),
		queryFn: () => fetchReviewImagesByLocation(location_id),
		enabled: !!location_id,
	});
}

export default useFetchReviewImagesByLocation;
