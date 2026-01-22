import { characterImages } from '@shared/lib/characterImages';
import type { Product, ReviewProduct } from '@shared/types/api';

function ReviewProductItem({
	review_product_id,
	order_quantity,
	order_price,
	product_name_ko,
	product_name_en,
}: ReviewProduct & Partial<Product>) {
	return (
		<div key={review_product_id} className="flex items-center gap-x-1">
			<img src={characterImages[product_name_en!]} alt="" className="h-4 aspect-square" />
			<p className="">{product_name_ko}</p>
			<span>・</span>
			<p>{order_quantity}개</p>
			<span>・</span>
			<p>{order_price?.toLocaleString()}원</p>
		</div>
	);
}

export default ReviewProductItem;
