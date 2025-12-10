import { Activity, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { useSession } from '@/app/store/sessionStore';
import useFetchProducts from '@/features/product/item/hooks/useFetchProducts';
import { characterImages } from '@/features/product/item/libs/item';
import ReviewTitle from '@/features/review/create/ui/ReviewTitle';
import { getNowDateTimeKo } from '@/shared/lib/day';
import type { API_ReviewProduct, Product } from '@/shared/types/types';
import { Button } from '@/shared/ui/shadcn/button';
import { Input } from '@/shared/ui/shadcn/input';
import { Textarea } from '@/shared/ui/shadcn/textarea';

function ReviewCreatePage() {
	// 리뷰 페이지 상태 관리
	const [page, setPage] = useState(1);
	const handleClickNextPage = () => {
		setPage((state) => state + 1);
	};
	const handleClickPrevPage = () => {
		setPage((state) => state - 1);
	};

	// 등록할 위치
	const param = useParams();
	const location_id = param.locationId;

	// 등록할 유저 아이디
	const session = useSession();
	const user_id = session?.user.id;

	// 등록할 후기 제목
	const [reviewTitle, setReviewTitle] = useState('');

	// 등록할 상세 후기 내용
	const textareaRef = useRef<HTMLTextAreaElement>(null);
	const [reviewContent, setReviewContent] = useState('');

	// Textarea 의 내용에 따라 동적으로 크기를 늘려주기
	useEffect(() => {
		if (textareaRef.current) {
			textareaRef.current.style.height = 'auto';
			textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
		}
	}, [reviewContent]);

	// 방문 날짜 상태 및 요일 데이터 관리
	const now = getNowDateTimeKo();
	const [visitDateTime, setVisitDateTime] = useState(now);
	const handleChangeVisitDateTime = (e: React.ChangeEvent<HTMLInputElement>) => {
		setVisitDateTime(e.target.value);
	};

	// 등록할 날짜 데이터
	const visit_datetime = new Date(visitDateTime).toISOString();

	// 전체 상품 목록 패칭
	const { data: products, isPending: isFetchProductsPending } = useFetchProducts();
	const [selectProducts, setSelectProducts] = useState<Product[]>([]);

	// 등록할 상품 아이디 목록
	const [selectedProductsDetail, setSelectedProductDetail] = useState<Partial<API_ReviewProduct>[]>([]);

	// 상품 선택 시, 상품별 입력 데이터 UI 표시 및 상태 업데이트
	const toggleChangeProducts = (e: React.ChangeEvent<HTMLInputElement>) => {
		const productKoName = e.target.id as Product['product_name_ko'];
		const selectedProduct = products?.find((p) => p.product_name_ko === productKoName);

		if (!selectedProduct) return;

		setSelectProducts((prev) =>
			e.target.checked ? [...prev, selectedProduct] : prev.filter((p) => p.product_name_ko !== productKoName)
		);

		setSelectedProductDetail((prev) =>
			e.target.checked
				? [
						...prev,
						{ product_id: selectedProduct.product_id, order_quantity: 1, order_price: 1000, is_recommend: false },
					]
				: prev.filter((item) => item.product_id !== selectedProduct.product_id)
		);
	};

	// 구매 수량 변경 핸들러
	const handleChangeOrderQuantity = (product_id: string, quantity: number) => {
		setSelectedProductDetail((prev) =>
			prev.map((item) => (item.product_id === product_id ? { ...item, order_quantity: quantity } : item))
		);
	};

	// 구매 금액 변경 핸들러
	const handleChangeOrderPrice = (product_id: string, price: number) => {
		setSelectedProductDetail((prev) =>
			prev.map((item) => (item.product_id === product_id ? { ...item, order_price: price } : item))
		);
	};

	// 버튼 disabled 상태 통합 관리
	const nextButtonDisabled = reviewContent === '' || visitDateTime === '';
	const submitButtonDisabled = selectProducts.length === 0;

	// Pending 통합 상태 통합 관리
	const isPending = isFetchProductsPending;

	return (
		<div className="flex flex-col">
			{/* 진행 바 */}
			<div className="fixed grid grid-cols-2 h-2 rounded-full bg-muted auto-width">
				<div className={`rounded-full bg-brown-main ${page >= 2 && 'rounded-r-none'}`}></div>
				<div className={`rounded-full ${page >= 2 && 'bg-brown-main rounded-l-none'}`}></div>
			</div>

			{/* 작성 내용 */}
			<div className="mt-8 flex flex-col gap-y-6">
				{/* Part 1. */}
				<Activity mode={page === 1 ? 'visible' : 'hidden'}>
					{/* 1. 후기 제목 */}
					<section className="flex flex-col gap-y-2">
						<ReviewTitle title="후기 제목" subtitle="을 작성해주세요" isNecessary={false} />
						<label htmlFor="review_title" className="sr-only">
							후기 제목
						</label>
						<Input
							type="text"
							id="review_title"
							className="text-sm"
							maxLength={30}
							placeholder="30자 이내"
							value={reviewTitle}
							onChange={(e) => setReviewTitle(e.target.value)}
						/>
					</section>
					{/* 2. 상세 후기 */}
					<section className="flex flex-col gap-y-2">
						<ReviewTitle title="상세 후기" subtitle="를 작성해주세요" isNecessary={true} />
						<label htmlFor="review_title" className="sr-only">
							상세 후기
						</label>
						<Textarea
							placeholder="300자 이내"
							id="review_title"
							className="text-sm min-h-30"
							ref={textareaRef}
							value={reviewContent}
							onChange={(e) => setReviewContent(e.target.value)}
						/>
					</section>
					{/* 3. 방문 날짜 */}
					<section className="flex flex-col gap-y-2">
						<ReviewTitle title="방문 당시 날짜" subtitle="를 선택해주세요" isNecessary={true} />
						<label htmlFor="" className="sr-only">
							방문 날짜
						</label>
						<Input
							type="datetime-local"
							className="text-sm"
							defaultValue={visitDateTime}
							onChange={handleChangeVisitDateTime}
						/>
					</section>
				</Activity>

				{/* Part 2. 구매한 상품의 수량, 가격 정보 */}
				<Activity mode={page === 2 ? 'visible' : 'hidden'}>
					{/* 1. 구매한 상품 모두 선택 */}
					<section className="flex flex-col gap-y-2">
						<ReviewTitle title="구매하신 상품" subtitle="을 모두 선택해주세요" isNecessary={true} />
						<div className="grid grid-cols-4 grid-rows-2 gap-1">
							{/* 상품 목록 */}
							{products?.map((product: Product) => (
								<div
									key={product.product_name_en}
									className={`flex flex-col items-center py-3 rounded-md ${selectProducts.some((p) => p.product_name_ko === product.product_name_ko) ? 'border-2  border-brown-sub' : 'border-2 border-[#fff]'}`}
								>
									<label
										htmlFor={product.product_name_ko}
										className={`flex flex-col items-center justify-center gap-y-1`}
									>
										<img
											src={characterImages[product.product_name_en]}
											alt={`${product.product_name_en}-${product.product_name_ko}`}
											className="h-8 aspect-square"
										/>
										<p
											className={`text-xs ${selectProducts.some((p) => p.product_name_ko === product.product_name_ko) ? 'text-brown-main font-semibold' : 'text-muted-foreground '}`}
										>
											{product.product_name_ko}
										</p>
									</label>
									<Input
										type="checkbox"
										name={`product_${product.product_name_en}`}
										id={product.product_name_ko}
										className="sr-only w-4 h-4"
										onChange={toggleChangeProducts}
										disabled={isPending}
									/>
								</div>
							))}
							{/* 기타 항목 추가 예정 */}
						</div>
					</section>
					<div className="flex flex-col gap-y-4">
						{selectProducts.map((selectProduct) => (
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
												selectedProductsDetail.find((item) => item.product_id === selectProduct.product_id)
													?.order_quantity ?? 1
											}
											onChange={(e) => handleChangeOrderQuantity(selectProduct.product_id, Number(e.target.value))}
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
												selectedProductsDetail.find((item) => item.product_id === selectProduct.product_id)
													?.order_price ?? 1000
											}
											onChange={(e) => handleChangeOrderPrice(selectProduct.product_id, Number(e.target.value))}
										/>
										<p>원</p>
									</div>
								</div>
							</section>
						))}
					</div>
				</Activity>
			</div>

			{/* 버튼 */}
			{page === 1 ? (
				<Button
					type="button"
					className="fixed bottom-3 auto-width"
					disabled={nextButtonDisabled}
					onClick={handleClickNextPage}
				>
					{`다음 페이지`}
				</Button>
			) : (
				<div className="fixed bottom-3 auto-width flex flex-col gap-y-2">
					<Button type="button" className="bg-muted text-balck" onClick={handleClickPrevPage}>
						이전 페이지
					</Button>
					<Button type="button" className="flex-1" disabled={submitButtonDisabled}>
						작성 완료
					</Button>
				</div>
			)}
		</div>
	);
}

export default ReviewCreatePage;
