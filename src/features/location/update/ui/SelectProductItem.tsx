import { Activity, useState } from 'react';
import useFetchProducts from '@/features/product/item/hooks/useFetchProducts';
import { characterImages } from '@/features/product/item/libs/item';
import type { Item } from '@/features/product/item/types/item.type';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/shared/ui/shadcn/select';

function SelectProductItem() {
	// 상품 목록 가져오기
	const { data: products } = useFetchProducts();

	// 선택된 상품 카테고리 목록 관리
	const [selectProduct, setSelectProduct] = useState<Item['name_en']>('');

	return (
		<Select value={selectProduct} onValueChange={setSelectProduct}>
			<SelectTrigger
				className={`shrink-0 rounded-full px-3 py-1.5 text-sm border ${selectProduct !== '' && 'border-2 border-brown-main'}`}
			>
				<SelectValue placeholder="카테고리" className="text-sm" />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					{/* <SelectLabel>카테고리</SelectLabel> */}
					{products?.map((product) => (
						<SelectItem
							key={product.product_id}
							value={product.product_name_en}
							onClick={() => {
								if (selectProduct === product.product_name_en) {
									setSelectProduct('');
								} else {
									return;
								}
							}}
						>
							<img
								src={characterImages[product.product_name_en]}
								alt={product.product_name_en}
								className="h-4 w-auto object-contain aspect-square"
							/>
							{product.product_name_ko}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}

export default SelectProductItem;
