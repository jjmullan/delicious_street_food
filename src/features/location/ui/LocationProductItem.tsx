import useFetchProducts from '@features/product/item/hooks/useFetchProducts';
import { characterImages } from '@features/product/item/libs/item';
import { Activity } from 'react';

interface LocationProductItemProps {
	product_id: string;
	isPopular?: boolean;
}

function LocationProductItem({ product_id, isPopular = false }: LocationProductItemProps) {
	// product_id로 해당 product 찾기
	const { data: fetchProducts, isPending: isFetchProductPending } = useFetchProducts();
	const product = fetchProducts?.find((p) => p.product_id === product_id);

	// Pending 통합 상태 관리
	const isPending = isFetchProductPending;

	return (
		<Activity mode={isPending ? 'hidden' : 'visible'}>
			{product && (
				<div className="flex items-center gap-x-2 w-full">
					<div className="flex items-center justify-center w-8">
						<img src={characterImages[product.product_name_en]} alt="" className="h-4 aspect-square" />
					</div>
					<p className="flex items-center gap-x-2">
						<span>{product.product_name_ko}</span>
						<Activity mode={isPopular ? 'visible' : 'visible'}>
							<span className="text-xs font-semibold text-brown-main px-2 py-0.5 bg-brown-main/10 rounded-full">
								hot🔥
							</span>
						</Activity>
					</p>
				</div>
			)}
		</Activity>
	);
}

export default LocationProductItem;
