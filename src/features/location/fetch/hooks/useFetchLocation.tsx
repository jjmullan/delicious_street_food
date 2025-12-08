import { useQuery } from '@tanstack/react-query';
import { fetchLocations } from '@/features/location/fetch/api/location';
import { QUERY_KEYS } from '@/shared/lib/query';

function useFetchLocation() {
	return useQuery({
		queryKey: QUERY_KEYS.location.all,
		queryFn: () => fetchLocations(),
	});
}

export default useFetchLocation;
