import { fetchProducts } from '@entities/product';
import { QUERY_KEYS } from '@shared/lib/query';
import { useQuery } from '@tanstack/react-query';

/**
 * 모든 상품 목록을 조회하는 React Query 훅
 * @returns 상품 목록 데이터와 쿼리 상태를 포함하는 UseQueryResult 객체
 */
export default function useFetchProducts() {
	return useQuery({
		queryKey: QUERY_KEYS.item.all,
		queryFn: fetchProducts,
	});
}
