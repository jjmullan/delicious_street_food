import { characterImages } from '@features/product/libs/item';
import type { Product } from '@shared/types/api';
import { Input } from '@shared/ui/shadcn/input';

function SelectProductItemForCreateReview({
	productDetail,
	disabled,
	onChangeEvent,
	selectProducts,
}: {
	productDetail: Product;
	disabled: boolean;
	onChangeEvent(e: React.ChangeEvent<HTMLInputElement>): void;
	selectProducts: Product[];
}) {
	return (
		<div
			className={`flex flex-col items-center py-3 rounded-md ${selectProducts.some((p) => p.product_name_ko === productDetail.product_name_ko) ? 'border-2  border-brown-main' : 'border-2 border-[#fff]'}`}
		>
			<label htmlFor={productDetail.product_name_ko} className={`flex flex-col items-center justify-center gap-y-1`}>
				<img
					src={characterImages[productDetail.product_name_en]}
					alt={`${productDetail.product_name_en}-${productDetail.product_name_ko}`}
					className="h-8 aspect-square"
				/>
				<p
					className={`text-xs ${selectProducts.some((p) => p.product_name_ko === productDetail.product_name_ko) ? 'text-brown-main font-semibold' : 'text-muted-foreground '}`}
				>
					{productDetail.product_name_ko}
				</p>
			</label>
			<Input
				type="checkbox"
				name={`product_${productDetail.product_name_en}`}
				id={productDetail.product_name_ko}
				className="sr-only w-4 h-4"
				onChange={onChangeEvent}
				disabled={disabled}
			/>
		</div>
	);
}

export default SelectProductItemForCreateReview;
