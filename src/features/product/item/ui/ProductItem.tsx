import type { Item } from '@/features/product/item/types/item.type';

/**
 * 길거리 음식 개별 상품
 */
function ProductItem({ name, image_url }: Item) {
	return (
		<li
			// className="h-fit shrink-0 bg-white/80 rounded-full flex items-center justify-center gap-x-2 px-3 py-2 border-2"
			className={`h-fit shrink-0 rounded-full gap-x-1.5 px-3 py-1.5 flex items-center justify-center glass`}
		>
			<button type="button" className="flex items-center justify-center gap-x-2">
				<img src={image_url} alt="eggbun" className="h-5 w-auto object-contain aspect-square" />
				<p className="text-sm align-text-bottom font-EbsHunminjeongeum">{name}</p>
			</button>
		</li>
	);
}

export default ProductItem;
