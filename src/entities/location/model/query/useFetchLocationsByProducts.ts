import { fetchLocationByProduct } from '@entities/location';
import { QUERY_KEYS } from '@shared/lib/query';
import { useQuery } from '@tanstack/react-query';

/**
 * 특정 상품을 판매하는 위치 목록을 조회하는 React Query 훅
 * @param product_id - 조회할 상품의 고유 ID (undefined일 경우 쿼리 비활성화)
 * @returns 위치 목록 데이터와 쿼리 상태를 포함하는 UseQueryResult 객체
 */
function useFetchLocationsByProducts(product_id: string | undefined) {
	return useQuery({
		queryKey: QUERY_KEYS.location.byProducts(product_id ?? ''),
		queryFn: () => fetchLocationByProduct(product_id!),
		enabled: !!product_id,
	});
}

export default useFetchLocationsByProducts;
