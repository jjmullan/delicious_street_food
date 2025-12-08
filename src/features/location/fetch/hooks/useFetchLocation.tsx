import { useQuery } from '@tanstack/react-query';
import { fetchLocation } from '@/features/location/fetch/api/location';
import { QUERY_KEYS } from '@/shared/lib/query';

function useFetchLocation(lat: string, lng: string) {
	return useQuery({
		queryKey: QUERY_KEYS.location.byLatLng(lat, lng),
		queryFn: () => fetchLocation(lat, lng),
	});
}

export default useFetchLocation;
