import { fetchReviewProductsByLocation } from '@entities/review/api/review';
import { QUERY_KEYS } from '@shared/lib/query';
import { useQuery } from '@tanstack/react-query';

function useFetchReviewProductsByLocation(location_id: string) {
	return useQuery({
		queryKey: QUERY_KEYS.review.products.byLocationId(location_id),
		queryFn: () => fetchReviewProductsByLocation(location_id),
		enabled: !!location_id,
	});
}

export default useFetchReviewProductsByLocation;
