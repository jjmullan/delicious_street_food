import { fetchProduct } from '@entities/product';
import { QUERY_KEYS } from '@shared/lib/query';
import { useQuery } from '@tanstack/react-query';

/**
 * 특정 상품 정보를 조회하는 React Query 훅
 * @param product_id - 조회할 상품의 고유 ID
 * @returns 상품 데이터와 쿼리 상태를 포함하는 UseQueryResult 객체
 */
export default function useFetchProduct(product_id: string) {
	return useQuery({
		queryKey: QUERY_KEYS.item.byId(product_id),
		queryFn: () => fetchProduct(product_id),
	});
}
