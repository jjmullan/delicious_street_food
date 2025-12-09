import supabase from '@/shared/api/supabase/supabase';
import type { Product } from '@/shared/types/types';

/**
 * 전체 상품 카테고리 목록 패칭을 요청하는 API
 */
export async function fetchProducts() {
	const request = supabase.from('product').select('*');
	const { data, error } = await request;

	if (error) throw error;
	return data.map((product: Product) => ({
		...product,
	}));
}

/**
 * 상품 카테고리 목록 중 특정 상품 영문명과 일치하는 데이터 하나의 패칭을 요청하는 API
 */
export async function fetchProduct(product_name_en: string) {
	const { data, error } = await supabase.from('product').select('*').eq('product_name_en', product_name_en).single();

	if (error) throw error;
	return data;
}
