import { fetchLocationByProduct } from '@entities/location/api/location';
import { QUERY_KEYS } from '@shared/lib/query';
import { useQuery } from '@tanstack/react-query';

function useFetchLocationsByProducts(product_id: string | undefined) {
	return useQuery({
		queryKey: QUERY_KEYS.location.byProducts(product_id ?? ''),
		queryFn: () => fetchLocationByProduct(product_id!),
		enabled: !!product_id,
	});
}

export default useFetchLocationsByProducts;
