import { useQuery } from '@tanstack/react-query';
import { fetchProduct } from '@/features/product/item/api/product';
import { QUERY_KEYS } from '@/shared/lib/query';

export default function useFetchProduct(product_id: string) {
	return useQuery({
		queryKey: QUERY_KEYS.item.byId(product_id),
		queryFn: () => fetchProduct(product_id),
	});
}
