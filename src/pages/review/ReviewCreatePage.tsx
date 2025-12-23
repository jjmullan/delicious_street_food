import { useOpenConfirmModal } from '@app/store/confirmModalStore';
import useFetchProducts from '@features/product/item/hooks/useFetchProducts';
import useCreateReview from '@features/review/create/hook/useCreateReview';
import useCreateReviewImages from '@features/review/create/hook/useCreateReviewImages';
import useCreateReviewProducts from '@features/review/create/hook/useCreateReviewProduct';
import type { ImageURL } from '@features/review/create/types/image';
import CreateReviewTitle from '@features/review/create/ui/CreateReviewTitle';
import PreviewImage from '@features/review/create/ui/PreviewImage';
import ProgressBar from '@features/review/create/ui/ProgressBar';
import SelectProductItemDetailForCreateReview from '@features/review/create/ui/SelectProductItemDetailForCreateReview';
import SelectProductItemForCreateReview from '@features/review/create/ui/SelectProductItemForCreateReview';
import { MAX_IMAGE_SLOT } from '@shared/lib/constants';
import { getNowDateTimeKo } from '@shared/lib/day';
import type { API_ReviewProduct, Product, Review } from '@shared/types/types';
import PrevNextButton from '@shared/ui/button/PrevNextButton';
import FallbackRequestAPI from '@shared/ui/fallback/FallbackRequestAPI';
import { Button } from '@shared/ui/shadcn/button';
import { Input } from '@shared/ui/shadcn/input';
import { Textarea } from '@shared/ui/shadcn/textarea';
import type { Session } from '@supabase/supabase-js';
import { ImagePlusIcon } from 'lucide-react';
import { Activity, useEffect, useRef, useState } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router';
import { toast } from 'sonner';

function ReviewCreatePage() {
	const navigate = useNavigate();

	// 후기 페이지 상태 관리
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
	const { session } = useOutletContext<{ session: Session }>();
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
		const selectDate = new Date(e.target.value);
		const nowDate = new Date(now);

		if (selectDate > nowDate) {
			toast.error('현재 시간 이후로 설정할 수 없습니다.', { position: 'top-center' });
			setVisitDateTime(now);
			return;
		}

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
	const handleChangeProducts = (e: React.ChangeEvent<HTMLInputElement>) => {
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
						{ product_id: selectedProduct.product_id, order_quantity: null, order_price: null, is_recommend: false },
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
			const notImageFiles = files.filter((file) => file.type.split('/')[0] !== 'image').length;

			if (notImageFiles > 0) {
				toast.error('이미지가 아닌 파일이 있습니다. 다시 확인해주세요.', { position: 'top-center' });
				return;
			}

			// 남은 업로드 가능 이미지 슬롯 (9 - ?)
			const slot = MAX_IMAGE_SLOT - images.length;
			if (slot === 0) {
				toast.error('이미지는 최대 9개 업로드 가능합니다.', { position: 'top-center' });
				return;
			}
			if (files.length > slot) {
				toast.warning(`최대 업로드 개수를 초과하여, ${slot}개만 추가됩니다.`, { position: 'top-center' });
			}

			// 현재 남은 슬롯 수만큼 잘라내서 이미지 업로드하기
			const addFile = files.slice(0, slot);
			const newImages = addFile.map((file) => ({
				file,
				previewUrl: URL.createObjectURL(file),
			}));
			setImages((prev) => [...prev, ...newImages]);
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
	const { mutateAsync: createReview, error: createReviewError, isPending: isCreateReviewPending } = useCreateReview({});
	const {
		mutateAsync: createReviewProduct,
		error: createReviewProductError,
		isPending: isCreateReviewProductPending,
	} = useCreateReviewProducts({});
	const {
		mutateAsync: createReviewImages,
		error: createReviewImagesError,
		isPending: isCreateReviewImagesPending,
	} = useCreateReviewImages({});

	// 후기 생성 로직
	const openConfirmModal = useOpenConfirmModal();
	const handleRequestCreateReview = () => {
		openConfirmModal({
			title: '후기 작성을 완료하시겠습니까?',
			description:
				'타인에게 불편함을 줄 수 있는 표현, 광고를 목적으로 작성되는 댓글은 사전 고지없이 삭제될 수 있습니다.',
			onPositive: async () => {
				try {
					// 1. 후기 생성
					const review: Review = await createReview({
						user_id: user_id!,
						location_id: location_id!,
						review_title: reviewTitle,
						review_text: reviewText,
						is_recommended: false,
						visit_datetime: visit_datetime,
					});

					const review_id = review.review_id;

					// 2. 후기 상품 생성
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

					await openConfirmModal({
						title: '후기 생성이 완료되었습니다!',
						description: '후기 목록 페이지로 이동하시겠습니까?',
						onPositive: () => {
							navigate(`/location/${location_id}/review/all`);
						},
						onNegative: () => {
							navigate(`/`);
						},
					});
				} catch (error) {
					console.error('후기 생성에 실패했습니다.', error);
					toast.error('후기 생성에 실패했습니다.', { position: 'top-center' });
				}
			},
		});
	};

	// 버튼 disabled 상태 조건 통합 관리
	const pageOneDisabled = reviewText === '' || visitDateTime === '';
	const pageTwoDisabled =
		selectProducts.length === 0 ||
		selectedProductsDetail.some((pd) => !pd.order_price || pd.order_price === 0) ||
		selectedProductsDetail.some((pd) => !pd.order_quantity || pd.order_quantity === 0);
	const pageThreeDisabled = images.length === 0;

	// 에러 통합 관리
	if (createReviewError || createReviewProductError || createReviewImagesError) return;

	// Pending 통합 상태 통합 관리
	const isPending =
		isFetchProductsPending || isCreateReviewPending || isCreateReviewProductPending || isCreateReviewImagesPending;

	return (
		<div className="flex flex-col">
			{/* 진행 바 */}
			<ProgressBar page={page} />

			{/* 작성 내용 */}
			<div className="mt-8 mb-8 p-3 flex flex-col gap-y-6">
				{/* Part 1. */}
				<Activity mode={page === 1 ? 'visible' : 'hidden'}>
					{/* 1. 후기 제목 */}
					<section className="flex flex-col gap-y-2">
						<CreateReviewTitle title="후기 제목" subtitle="을 작성해주세요" isNecessary={false} />
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
						<CreateReviewTitle title="상세 후기" subtitle="를 작성해주세요" isNecessary={true} />
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
						<CreateReviewTitle title="방문 당시 날짜" subtitle="를 선택해주세요" isNecessary={true} />
						<label htmlFor="visit_date" className="sr-only">
							방문 날짜
						</label>
						<Input
							type="datetime-local"
							className="text-sm"
							defaultValue={visitDateTime}
							onChange={handleChangeVisitDateTime}
							id="visit_date"
							max={now}
						/>
					</section>
				</Activity>

				{/* Part 2. 구매한 상품의 수량, 가격 정보 */}
				<Activity mode={page === 2 ? 'visible' : 'hidden'}>
					{/* 구매한 상품 모두 선택란 */}
					<section className="flex flex-col gap-y-2">
						<CreateReviewTitle title="구매하신 상품" subtitle="을 모두 선택해주세요" isNecessary={true} />
						<div className="grid grid-cols-4 grid-rows-2 gap-1">
							{products?.map((product: Product) => (
								<SelectProductItemForCreateReview
									key={product.product_id}
									onChangeEvent={handleChangeProducts}
									disabled={isPending}
									productDetail={product}
									selectProducts={selectProducts}
								/>
							))}
							{/* 기타 항목 추가 예정 */}
						</div>
					</section>
					{/* 구매한 상품의 수량, 가격 정보 */}
					<div className="flex flex-col gap-y-4">
						{selectProducts.map((selectProduct) => (
							<SelectProductItemDetailForCreateReview
								key={selectProduct.product_id}
								selectProduct={selectProduct}
								selectedProductsDetail={selectedProductsDetail}
								onChangeQuantity={handleChangeOrderQuantity}
								onChangePrice={handleChangeOrderPrice}
							/>
						))}
					</div>
				</Activity>

				{/* Part 3. 이미지 첨부 */}
				<Activity mode={page === 3 ? 'visible' : 'hidden'}>
					{/* 이미지 업로드 */}
					<section className="flex flex-col gap-y-2">
						<CreateReviewTitle title="후기 이미지" subtitle="를 업로드해주세요 (최대 9개)" isNecessary={true} />
						<label htmlFor="review_image" className="sr-only">
							후기 이미지
						</label>
						<Input
							type="file"
							id="review_image"
							ref={imageRef}
							hidden
							multiple
							onChange={handleSelectImages}
							disabled={isPending}
						/>
						<Button
							type="button"
							variant={'outline'}
							onClick={() => {
								if (imageRef.current) imageRef.current.click();
							}}
							className=""
							disabled={isPending}
						>
							<ImagePlusIcon />
							<p>이미지 업로드</p>
						</Button>
					</section>
					{/* 이미지 미리보기 */}
					<Activity mode={images.length > 0 ? 'visible' : 'hidden'}>
						<section className="grid grid-cols-3 gap-2">
							{images.map((image, index) => (
								<PreviewImage key={image.previewUrl} image={image} index={index} onDelete={handleDeleteImage} />
							))}
						</section>
					</Activity>
				</Activity>
			</div>

			{/* 버튼 */}
			<div className="fixed bottom-0 full-width p-3 flex flex-col gap-y-2 bg-[#fff]">
				{page === 1 ? (
					<PrevNextButton
						disabled={pageOneDisabled}
						onClick={handleClickNextPage}
						mode="main"
						title={`다음 페이지 (${page + 1}/3)`}
					/>
				) : page === 2 ? (
					<>
						<PrevNextButton onClick={handleClickPrevPage} mode="sub" title={`이전 페이지 (${page - 1}/3)`} />
						<PrevNextButton
							disabled={pageTwoDisabled}
							onClick={handleClickNextPage}
							mode="main"
							title={`다음 페이지 (${page + 1}/3)`}
						/>
					</>
				) : (
					<>
						<PrevNextButton
							disabled={isPending}
							onClick={handleClickPrevPage}
							mode="sub"
							title={`이전 페이지 (${page - 1}/3)`}
						/>
						<PrevNextButton
							disabled={pageThreeDisabled || isPending}
							onClick={handleRequestCreateReview}
							mode="main"
							title={`작성 완료`}
						/>
					</>
				)}
			</div>

			{/* 로딩 중 */}
			<Activity mode={isPending ? 'visible' : 'hidden'}>
				<FallbackRequestAPI />
			</Activity>
		</div>
	);
}

export default ReviewCreatePage;
