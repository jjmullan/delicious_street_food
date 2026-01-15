import { useProductFilter, useResetProductFilter, useSetProductFilter } from '@app/store/productFilterStore';
import useFetchProducts from '@features/product/hooks/useFetchProducts';
import { characterImages } from '@features/product/libs/item';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@shared/ui/shadcn/components/select';
import { XCircleIcon } from 'lucide-react';

function SelectProductItem() {
	// 상품 목록 가져오기
	const { data: products } = useFetchProducts();

	// 선택된 상품 카테고리 목록 전역 상태 관리
	const productFilter = useProductFilter();
	const setProductFilter = useSetProductFilter();
	const resetProductFilter = useResetProductFilter();
	const handleValueChange = (productNameEn: string) => {
		const selectedProduct = products?.find((p) => p.product_name_en === productNameEn);
		if (selectedProduct) {
			setProductFilter(selectedProduct);
		} else {
			resetProductFilter();
		}
	};

	return (
		<Select value={productFilter?.product_name_en ?? ''} onValueChange={handleValueChange}>
			<SelectTrigger
				className={`shrink-0 rounded-full px-3 py-2 text-sm border ${productFilter !== null && 'border-2 border-brown-main'}`}
			>
				<SelectValue placeholder="카테고리" className="text-sm" />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					{/* <SelectLabel>카테고리</SelectLabel> */}
					{products?.map((product) => (
						<SelectItem key={product.product_id} value={product.product_name_en}>
							<img
								src={characterImages[product.product_name_en]}
								alt={product.product_name_en}
								className="h-4 w-auto object-contain aspect-square"
							/>
							{product.product_name_ko}
						</SelectItem>
					))}
					<SelectItem value={'none'}>
						{/* <div className="h-4 w-auto flex items-center"> */}
						<XCircleIcon width={16} height={16} strokeWidth={1.8} className="h-4 w-auto object-contain" />
						<p>선택 해제</p>
						{/* </div> */}
					</SelectItem>
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}

export default SelectProductItem;
