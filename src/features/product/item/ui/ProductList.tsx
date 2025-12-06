import { items } from '@/features/product/item/libs/item';
import ProductItem from '@/features/product/item/ui/ProductItem';

/**
 * 길거리 음식 상품 리스트
 */
function ProductList() {
	return (
		<ul className="overflow-x-auto flex gap-x-2 snap-mandatory h-10 snap-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
			{items.map((item) => (
				<ProductItem key={item.name_ko} {...item} />
			))}
		</ul>
	);
}

export default ProductList;
