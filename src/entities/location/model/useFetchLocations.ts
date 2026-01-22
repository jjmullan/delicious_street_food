import { fetchLocations } from '@entities/location/api/location';
import { QUERY_KEYS } from '@shared/lib/query';
import { useQuery } from '@tanstack/react-query';

function useFetchLocations() {
	return useQuery({
		queryKey: QUERY_KEYS.location.all,
		queryFn: () => fetchLocations(),
	});
}

export default useFetchLocations;
