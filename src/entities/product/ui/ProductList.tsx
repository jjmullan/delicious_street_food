import { items, ProductItem } from '@entities/product';

/**
 * 길거리 음식 상품 리스트
 */
function ProductList() {
	return (
		<>
			{items.map((item) => (
				<ProductItem key={item.name_ko} {...item} />
			))}
		</>
	);
}

export default ProductList;
