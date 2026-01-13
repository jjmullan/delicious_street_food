import CreateReviewTitle from '@features/review/ui/CreateReviewTitle';
import type { API_ReviewProduct, Product } from '@shared/types/types';
import { Input } from '@shared/ui/shadcn/input';

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
			<CreateReviewTitle
				title={selectProduct.product_name_ko}
				subtitle="의 구매 수량과 총 금액을 작성해주세요"
				isNecessary={true}
			/>
			<div className="flex gap-x-8">
				<div className="flex-1 flex justify-between items-center gap-x-2">
					<label htmlFor={`${selectProduct.product_name_ko}_order_quantity`} className="sr-only">
						구매 수량
					</label>
					<Input
						type="text"
						id={`${selectProduct.product_name_ko}_order_quantity`}
						max="100"
						inputMode="numeric"
						value={
							selectedProductsDetail.find((item) => item.product_id === selectProduct.product_id)?.order_quantity ?? ''
						}
						/* onBlur={(e) => { if (Number(e.target.value) === 0) { onChangeQuantity(selectProduct.product_id, 1); } }} */
						onChange={(e) => {
							const value = e.target.value;
							if (value === '' || /^\d+$/.test(value)) {
								onChangeQuantity(selectProduct.product_id, value === '' ? 0 : Number(value));
							}
						}}
					/>
					<p>개</p>
				</div>
				<div className="flex-1 flex justify-between items-center gap-x-2">
					<label htmlFor={`${selectProduct.product_name_ko}_order_price`} className="sr-only">
						총 금액
					</label>
					<Input
						type="text"
						id={`${selectProduct.product_name_ko}_order_price`}
						max="100000"
						step="100"
						inputMode="numeric"
						/* onBlur={(e) => { if (Number(e.target.value) === 0) { onChangePrice(selectProduct.product_id, 1000); }}} */
						value={
							selectedProductsDetail.find((item) => item.product_id === selectProduct.product_id)?.order_price ?? ''
						}
						onChange={(e) => {
							const value = e.target.value;
							if (value === '' || /^\d+$/.test(value)) {
								onChangePrice(selectProduct.product_id, value === '' ? 0 : Number(value));
							}
						}}
					/>
					<p>원</p>
				</div>
			</div>
		</section>
	);
}

export default SelectProductItemDetailForCreateReview;
