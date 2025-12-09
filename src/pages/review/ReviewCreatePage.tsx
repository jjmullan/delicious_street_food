import { useState } from 'react';
import { useParams } from 'react-router';
import { useSession } from '@/app/store/sessionStore';
import useFetchProducts from '@/features/product/item/hooks/useFetchProducts';
import { characterImages } from '@/features/product/item/libs/item';
import type { Product } from '@/shared/types/types';
import { Input } from '@/shared/ui/shadcn/input';

function ReviewCreatePage() {
	// 포장마차 위치 정보 가져오기
	const param = useParams();
	const location_id = param.locationId;

	// 전체 상품 목록 패칭
	const { data: products, isPending: isFetchProductsPending } = useFetchProducts();
	const [selectProducts, setSelectProducts] = useState<Product['product_name_ko'][]>([]);
	const toggleChangeProducts = (e: React.ChangeEvent<HTMLInputElement>) => {
		const productKoName = e.target.id as Product['product_name_ko'];
		setSelectProducts((prev) =>
			e.target.checked ? [...prev, productKoName] : prev.filter((products) => products !== productKoName)
		);
	};

	// 유저 아이디 패칭
	const session = useSession();
	const user_id = session?.user.id;

	// Pending 통합 상태 관리
	const isPending = isFetchProductsPending;

	return (
		<div className="flex flex-col gap-y-5">
			<h3 className="text-center text-2xl flex flex-col">어떤 음식을 구매하셨나요?</h3>
			<section className="flex flex-col gap-y-2">
				<h4 className="text-sm text-black">구매하신 상품을 선택해주세요</h4>
				<div className="flex justify-between">
					{products?.map((product: Product) => (
						<div key={product.product_name_en} className="flex flex-col items-center gap-y-1.5 w-1/8">
							<label htmlFor={product.product_name_ko} className="flex flex-col items-center justify-center gap-y-0.5">
								<div className="w-fit h-fit">
									<img
										src={characterImages[product.product_name_en]}
										alt={`${product.product_name_en}-${product.product_name_ko}`}
										className="h-6 aspect-square"
									/>
								</div>
								<p className="text-[10px] text-muted-foreground">{product.product_name_ko}</p>
							</label>
							<Input
								type="checkbox"
								name={`product_${product.product_name_en}`}
								id={product.product_name_ko}
								className="sr-only"
								onChange={toggleChangeProducts}
								disabled={isPending}
							/>
						</div>
					))}
				</div>
			</section>
			<section className="flex flex-col gap-y-2">
				{selectProducts.map((selectProduct) => (
					<div key={selectProduct}>
						<h4 className="text-sm text-black">구매하신 {selectProduct}은 어떠셨나요?</h4>
						<div className="flex justify-between">
							<Input type="text" placeholder="제목" />
						</div>
					</div>
				))}
			</section>
		</div>
	);
}

export default ReviewCreatePage;
