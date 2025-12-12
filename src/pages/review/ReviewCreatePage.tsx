import { ImagePlusIcon, XIcon } from 'lucide-react';
import { Activity, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'sonner';
import { useOpenConfirmModal } from '@/app/store/confirmModalStore';
import { useSession } from '@/app/store/sessionStore';
import useFetchProducts from '@/features/product/item/hooks/useFetchProducts';
import { characterImages } from '@/features/product/item/libs/item';
import useCreateReview from '@/features/review/create/hook/useCreateReview';
import useCreateReviewImages from '@/features/review/create/hook/useCreateReviewImages';
import useCreateReviewProducts from '@/features/review/create/hook/useCreateReviewProduct';
import type { ImageURL } from '@/features/review/create/types/image';
import ReviewTitle from '@/features/review/create/ui/ReviewTitle';
import { getNowDateTimeKo } from '@/shared/lib/day';
import type { API_ReviewProduct, Product, Review } from '@/shared/types/types';
import { Button } from '@/shared/ui/shadcn/button';
import { Input } from '@/shared/ui/shadcn/input';
import { Textarea } from '@/shared/ui/shadcn/textarea';

function ReviewCreatePage() {
	const navigate = useNavigate();

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
	const [reviewText, setReviewText] = useState('');

	// Textarea 의 내용에 따라 동적으로 크기를 늘려주기
	useEffect(() => {
		if (textareaRef.current) {
			textareaRef.current.style.height = 'auto';
			textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
		}
	}, [reviewText]);

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

	// 이미지 목록
	const [images, setImages] = useState<ImageURL[]>([]);
	const imageRef = useRef<HTMLInputElement>(null);
	const handleSelectImages = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const files = Array.from(e.target.files);
			files.forEach((file) => {
				if (images.length === 9) {
					toast.error('최대 업로드 개수를 초과하였습니다.', { position: 'top-center' });
					return;
				} else {
					setImages((prev) => [...prev, { file, previewUrl: URL.createObjectURL(file) }]);
				}
			});
		}
	};
	const handleDeleteImage = (image: ImageURL) => {
		setImages((prevImages) => prevImages.filter((item) => item.previewUrl !== image.previewUrl));

		URL.revokeObjectURL(image.previewUrl);
	};
	useEffect(() => {
		// 언마운트 시 이미지 URL 삭제
		return () => {
			images.forEach((image) => {
				URL.revokeObjectURL(image.previewUrl);
			});
		};
	}, [images]);

	// API 요청
	const {
		mutateAsync: createReview,
		error: createReviewError,
		isPending: isCreateReviewPending,
	} = useCreateReview({
		onSuccess: () => {
			toast.info('리뷰가 등록되었습니다!', { position: 'top-center' });
		},
		onError: (error) => {
			console.error('리뷰 등록 실패 :', error);
			toast.error('리뷰 등록이 실패했습니다. 다시 시도해주세요.', { position: 'top-center' });
		},
	});
	const {
		mutateAsync: createReviewProduct,
		error: createReviewProductError,
		isPending: isCreateReviewProductPending,
	} = useCreateReviewProducts({});
	const {
		mutateAsync: createReviewImages,
		error: createReviewImagesError,
		isPending: isCreateReviewImagesPending,
	} = useCreateReviewImages({
		onSuccess: () => {
			console.log('이미지 업로드 성공!');
		},
		onError: (error) => {
			console.error('이미지 업로드 실패:', error);
		},
	});

	const openConfirmModal = useOpenConfirmModal();
	const handleRequestCreateReview = () => {
		openConfirmModal({
			title: '리뷰 작성을 완료하시겠습니까?',
			description:
				'타인에게 불편함을 줄 수 있는 표현, 광고를 목적으로 작성되는 댓글은 사전 고지없이 삭제될 수 있습니다.',
			onPositive: async () => {
				try {
					// 1. 리뷰 생성
					const review: Review = await createReview({
						user_id: user_id!,
						location_id: location_id!,
						review_title: reviewTitle,
						review_text: reviewText,
						is_recommended: false,
						visit_datetime: visit_datetime,
					});

					const review_id = review.review_id;

					// 2. 리뷰 상품 생성
					await Promise.all(
						selectedProductsDetail.map((product) =>
							createReviewProduct({
								review_id,
								product_id: product.product_id!,
								order_quantity: product.order_quantity!,
								order_price: product.order_price!,
								is_recommend: product.is_recommend!,
							})
						)
					);

					// 3. 이미지 업로드
					if (images.length > 0) {
						await createReviewImages({
							review_id,
							user_id: user_id!,
							images,
						});
					}

					// 4. 페이지 이동
					await openConfirmModal({
						title: '리뷰 생성이 완료되었습니다!',
						description: '리뷰 목록 페이지로 이동하시겠습니까?',
						onPositive: () => {
							navigate(`/location/${location_id}/review/all`);
						},
						onNegative: () => {
							navigate(`/`);
						},
					});
				} catch (error) {
					console.error('리뷰 생성 에러!', error);
					toast.error('리뷰 생성에 실패했습니다. 다시 시도해주세요', { position: 'top-center' });
				}
			},
		});
	};

	// 버튼 disabled 상태 통합 관리
	const pageOneDisabled = reviewText === '' || visitDateTime === '';
	const pageTwoDisabled = selectProducts.length === 0;
	const pageThreeDisabled = images.length === 0;

	// 에러 통합 관리
	if (createReviewError || createReviewProductError || createReviewImagesError) return;

	// Pending 통합 상태 통합 관리
	const isPending =
		isFetchProductsPending || isCreateReviewPending || isCreateReviewProductPending || isCreateReviewImagesPending;

	return (
		<div className="flex flex-col">
			{/* 진행 바 */}
			<div className="fixed grid grid-cols-3 h-2 rounded-full bg-muted auto-width">
				<div className={`rounded-full bg-brown-main ${page >= 2 && 'rounded-r-none'}`}></div>
				<div
					className={`rounded-full ${page >= 2 && 'bg-brown-main rounded-l-none'} ${page >= 3 && 'rounded-r-none'}`}
				></div>
				<div className={`rounded-full ${page >= 3 && 'bg-brown-main rounded-l-none'}`}></div>
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
						<label htmlFor="review_text" className="sr-only">
							상세 후기
						</label>
						<Textarea
							placeholder="300자 이내"
							id="review_text"
							className="text-sm min-h-30"
							ref={textareaRef}
							value={reviewText}
							onChange={(e) => setReviewText(e.target.value)}
						/>
					</section>
					{/* 3. 방문 날짜 */}
					<section className="flex flex-col gap-y-2">
						<ReviewTitle title="방문 당시 날짜" subtitle="를 선택해주세요" isNecessary={true} />
						<label htmlFor="visit_date" className="sr-only">
							방문 날짜
						</label>
						<Input
							type="datetime-local"
							className="text-sm"
							defaultValue={visitDateTime}
							onChange={handleChangeVisitDateTime}
							id="visit_date"
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

				{/* Part 3. 이미지 첨부 */}
				<Activity mode={page === 3 ? 'visible' : 'hidden'}>
					<section className="flex flex-col gap-y-2">
						<ReviewTitle title="후기 이미지" subtitle="를 업로드해주세요 (최대 9개)" isNecessary={true} />
						<label htmlFor="review_image" className="sr-only">
							후기 이미지
						</label>
						<Input type="file" id="review_image" ref={imageRef} hidden multiple onChange={handleSelectImages} />
						<Button
							type="button"
							variant={'outline'}
							onClick={() => {
								if (imageRef.current) imageRef.current.click();
							}}
							className=""
						>
							<ImagePlusIcon />
							<p>이미지 업로드</p>
						</Button>
					</section>
					<Activity mode={images.length > 0 ? 'visible' : 'hidden'}>
						<section className="grid grid-cols-3 grid-rows-3 gap-2">
							{images.map((image, index) => (
								<div key={image.previewUrl} className="relative border rounded-md overflow-hidden aspect-square">
									<img src={image.previewUrl} alt={`미리보기 ${index}번`} className="w-full h-full object-fill" />
									<button
										type="button"
										className="absolute top-2 right-2 p-0.5 bg-black/30 rounded-md"
										onClick={() => handleDeleteImage(image)}
									>
										<XIcon width={16} height={16} color="#fff" />
									</button>
								</div>
							))}
						</section>
					</Activity>
				</Activity>
			</div>

			{/* 버튼 */}
			{page === 1 ? (
				<Button
					type="button"
					className="fixed bottom-3 auto-width"
					disabled={pageOneDisabled}
					onClick={handleClickNextPage}
				>
					{`다음 페이지 (${page + 1}/3)`}
				</Button>
			) : page === 2 ? (
				<div className="fixed bottom-3 auto-width flex flex-col gap-y-2">
					<Button type="button" className="bg-muted text-balck" onClick={handleClickPrevPage}>
						{`이전 페이지 (${page - 1}/3)`}
					</Button>
					<Button type="button" className="flex-1" disabled={pageTwoDisabled} onClick={handleClickNextPage}>
						{`다음 페이지 (${page + 1}/3)`}
					</Button>
				</div>
			) : (
				<div className="fixed bottom-3 auto-width flex flex-col gap-y-2">
					<Button type="button" className="bg-muted text-balck" disabled={isPending} onClick={handleClickPrevPage}>
						{`이전 페이지 (${page - 1}/3)`}
					</Button>
					<Button type="button" className="flex-1" disabled={pageThreeDisabled} onClick={handleRequestCreateReview}>
						작성 완료
					</Button>
				</div>
			)}
		</div>
	);
}

export default ReviewCreatePage;
