import { useQuery } from '@tanstack/react-query';
import { fetchReviewProductsByLocation } from '@/features/review/fetch/api/review';
import { QUERY_KEYS } from '@/shared/lib/query';

function useFetchReviewProductsByLocation(location_id: string) {
	return useQuery({
		queryKey: QUERY_KEYS.review.productByLocationId(location_id),
		queryFn: () => fetchReviewProductsByLocation(location_id),
	});
}

export default useFetchReviewProductsByLocation;
