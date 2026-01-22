import type { Item } from '@entities/product/model/types';
import { characterImages } from '@shared/lib/characterImages';

/**
 * 길거리 음식 개별 상품
 */
function ProductItem({ name_ko, name_en }: Item) {
	// name_en에 해당하는 이미지 가져오기
	const characterImage = characterImages[name_en];

	return (
		<li
			// className="h-fit shrink-0 bg-white/80 rounded-full flex items-center justify-center gap-x-2 px-3 py-2 border-2"
			className={`h-7 shrink-0 rounded-full px-2 py-1 flex items-center justify-center glass`}
		>
			<button type="button" className="flex items-center justify-center gap-x-1.5">
				<img src={characterImage} alt={name_ko} className="h-4 w-auto object-contain aspect-square" />
				<p className="text-[12px] align-text-bottom">{name_ko}</p>
			</button>
		</li>
	);
}

export default ProductItem;
