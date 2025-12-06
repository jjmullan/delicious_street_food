import { useQuery } from '@tanstack/react-query';
import { fetchLocation } from '@/features/location/fetch/api/location';
import { QUERY_KEYS } from '@/shared/lib/query';

function useFetchLocation() {
	return useQuery({
		queryKey: QUERY_KEYS.location.all,
		queryFn: () => fetchLocation(),
	});
}

export default useFetchLocation;
