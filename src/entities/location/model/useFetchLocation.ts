import { fetchLocation } from '@entities/location/api/location';
import { QUERY_KEYS } from '@shared/lib/query';
import { useQuery } from '@tanstack/react-query';

function useFetchLocation(location_id: string) {
	return useQuery({
		queryKey: QUERY_KEYS.location.byId(location_id),
		queryFn: () => fetchLocation(location_id),
	});
}

export default useFetchLocation;
