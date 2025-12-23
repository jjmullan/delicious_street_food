import { useQuery } from '@tanstack/react-query';
import { fetchLocationByProducts } from '@/features/location/fetch/api/location';
import { QUERY_KEYS } from '@/shared/lib/query';

function useFetchLocationsByProducts(product_id: string | undefined) {
	return useQuery({
		queryKey: QUERY_KEYS.location.byProducts(product_id ?? ''),
		queryFn: () => fetchLocationByProducts(product_id!),
		enabled: !!product_id,
	});
}

export default useFetchLocationsByProducts;
