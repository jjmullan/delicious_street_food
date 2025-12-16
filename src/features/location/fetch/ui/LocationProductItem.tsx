import { Activity } from 'react';
import useFetchProducts from '@/features/product/item/hooks/useFetchProducts';
import { characterImages } from '@/features/product/item/libs/item';

function LocationProductItem({ product_id }: { product_id: string }) {
	// product_id로 해당 product 찾기
	const { data: fetchProducts, isPending: isFetchProductPending } = useFetchProducts();
	const product = fetchProducts?.find((p) => p.product_id === product_id);

	// Pending 통합 상태 관리
	const isPending = isFetchProductPending;

	return (
		<Activity mode={isPending ? 'hidden' : 'visible'}>
			{product && (
				<div className="flex items-center gap-x-2">
					<div className="flex items-center justify-center w-8">
						<img src={characterImages[product.product_name_en]} alt="" className="h-4 aspect-square" />
					</div>
					<p className="">{product.product_name_ko}</p>
				</div>
			)}
		</Activity>
	);
}

export default LocationProductItem;
