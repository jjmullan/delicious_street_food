import { items } from '@/features/product/item/libs/item';
import ProductItem from '@/features/product/item/ui/ProductItem';

/**
 * 길거리 음식 상품 리스트
 */
function ProductList() {
	return (
		<ul className="absolute top-18 z-1 px-4 overflow-x-auto flex gap-x-2 snap-mandatory w-screen h-10 snap-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
			{items.map((item) => (
				<ProductItem key={item.image_url} {...item} />
			))}
		</ul>
	);
}

export default ProductList;
