import supabase from '@shared/api/supabase/supabase';
import type { Product } from '@shared/types/types';

/**
 * @description 모든 상품 카테고리 목록을 한글명 오름차순으로 조회합니다.
 * @returns {Promise<Product[]>} 전체 상품 목록 (product_name_ko 기준 정렬)
 * @throws {Error} 데이터베이스 조회 실패 시 Supabase 에러 발생
 * @example
 * const products = await fetchProducts();
 * // ['계란빵', '군밤', '붕어빵', ...] 순서로 정렬됨
 */
export async function fetchProducts() {
	const request = supabase.from('product').select('*').order('product_name_ko', { ascending: true });
	const { data, error } = await request;

	if (error) throw error;
	return data.map((product: Product) => ({
		...product,
	}));
}

/**
 * @description 특정 상품 ID로 단일 상품 데이터를 조회합니다.
 * @param {string} product_id - 조회할 상품 ID
 * @returns {Promise<Product[]>} 조회된 상품 데이터 배열
 * @throws {Error} 데이터베이스 조회 실패 시 Supabase 에러 발생
 * @example
 * const product = await fetchProduct('prod-붕어빵');
 * console.log(product[0].product_name_ko); // '붕어빵'
 */
export async function fetchProduct(product_id: string) {
	const { data, error } = await supabase.from('product').select('*').eq('product_id', product_id);

	if (error) throw error;
	return data;
}
