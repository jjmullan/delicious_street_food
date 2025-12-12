import ReviewTitle from '@/features/review/create/ui/ReviewTitle';
import type { API_ReviewProduct, Product } from '@/shared/types/types';
import { Input } from '@/shared/ui/shadcn/input';

function SelectProductItemDetailForCreateReview({
	selectProduct,
	selectedProductsDetail,
	onChangeQuantity,
	onChangePrice,
}: {
	selectProduct: Product;
	selectedProductsDetail: Partial<API_ReviewProduct>[];
	onChangeQuantity(product_id: string, quantity: number): void;
	onChangePrice(product_id: string, price: number): void;
}) {
	return (
		<section key={selectProduct.product_name_ko} className="flex flex-col gap-y-2">
			<ReviewTitle
				title={selectProduct.product_name_ko}
				subtitle="의 구매 수량과 총 금액을 작성해주세요"
				isNecessary={true}
			/>
			<div className="flex gap-x-8">
				<div className="flex justify-between items-center gap-x-2">
					<label htmlFor={`${selectProduct.product_name_ko}_order_quantity`} className="sr-only">
						구매 수량
					</label>
					<Input
						type="number"
						id={`${selectProduct.product_name_ko}_order_quantity`}
						min="1"
						max="100"
						value={
							selectedProductsDetail.find((item) => item.product_id === selectProduct.product_id)?.order_quantity ?? 1
						}
						onChange={(e) => onChangeQuantity(selectProduct.product_id, Number(e.target.value))}
					/>
					<p>개</p>
				</div>
				<div className="flex-1 flex justify-between items-center gap-x-2">
					<label htmlFor={`${selectProduct.product_name_ko}_order_price`} className="sr-only">
						총 금액
					</label>
					<Input
						type="number"
						id={`${selectProduct.product_name_ko}_order_price`}
						min="1000"
						max="100000"
						step="100"
						value={
							selectedProductsDetail.find((item) => item.product_id === selectProduct.product_id)?.order_price ?? 1000
						}
						onChange={(e) => onChangePrice(selectProduct.product_id, Number(e.target.value))}
					/>
					<p>원</p>
				</div>
			</div>
		</section>
	);
}

export default SelectProductItemDetailForCreateReview;
