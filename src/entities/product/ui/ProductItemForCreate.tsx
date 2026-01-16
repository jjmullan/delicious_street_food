import { characterImages } from '@entities/product/lib/item';
import type { Item } from '@entities/product/model/types';

function ProductItemForCreate({ name_ko, name_en }: Item) {
	// name_en에 해당하는 이미지 가져오기
	const characterImage = characterImages[name_en];

	return (
		<button key={characterImage} type="button" className="flex items-center justify-center gap-x-2 w-6 h-6">
			<img src={characterImage} alt={name_ko} className="h-5 w-auto object-contain aspect-square" />
		</button>
	);
}

export default ProductItemForCreate;
