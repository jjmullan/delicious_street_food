import supabase from '@/shared/api/supabase/supabase';
import type { API_ProductList } from '@/shared/types/types';

/**
 * 위치별 상품 목록 데이터 생성 요청 API
 */
export async function createProductList({ location_id, product_id, is_selling = true }: API_ProductList) {
	const { data, error } = await supabase.from('product_list').insert({
		location_id,
		product_id,
		is_selling,
	});

	if (error) throw error;
	return data;
}
