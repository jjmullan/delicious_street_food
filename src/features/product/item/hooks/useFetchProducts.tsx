import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '@/features/product/item/api/product';
import { QUERY_KEYS } from '@/shared/lib/query';

export default function useFetchProducts() {
	return useQuery({
		queryKey: QUERY_KEYS.item.all,
		queryFn: fetchProducts,
	});
}
