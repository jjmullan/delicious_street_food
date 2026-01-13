import { items } from '@features/product/item/libs/item';
import ProductItem from '@features/product/item/ui/ProductItem';

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
