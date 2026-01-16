import useFetchProducts from '@entities/product/model/useFetchProducts';
import {
	ReviewProductItem,
	ReviewTitleAndText,
	ReviewUserProfile,
	ReviewVisitDate,
	useFetchReviewImages,
	useFetchReviewProducts,
} from '@entities/review';
import useFecthUserData from '@features/profile/model/useFetchUserProfile';
import { useDeleteReview } from '@features/review/model/useDeleteReview';
import defaultavatar from '@shared/assets/character/defaultavatar.svg';
import { useSession } from '@shared/model/session';
import type { Review } from '@shared/types/api';
import EditDeleteButton from '@shared/ui/button/components/EditDeleteButton';
import ImageModal from '@shared/ui/modal/components/ImageModal';
import { useOpenConfirmModal } from '@shared/ui/modal/model/confirmModal';
import { Carousel, CarouselContent, CarouselItem } from '@shared/ui/shadcn/components/carousel';
import { formatTimeAgo, getDateTimeKo } from '@shared/utils/day';
import { Activity, useState } from 'react';
import { toast } from 'sonner';

function ReviewItem({ user_id, review_id, review_title, review_text, visit_datetime, created_at }: Review) {
	// 유저 정보 패칭
	const { data: fetchUser, isPending: isFetchUserPending } = useFecthUserData(user_id);
	const profileImage = fetchUser?.profile_image_url || defaultavatar;
	const nickname = fetchUser?.nickname;
	const createDatetime = formatTimeAgo(created_at);
	const visitDatetime = getDateTimeKo({ date: new Date(visit_datetime).getTime(), isTimeIncluding: true });

	// 현재 내 세션 정보의 user_id 추출, 내 후기인지 여부에 따른 UI 별도 설정
	const session = useSession();
	const session_user_id = session?.user.id;
	const isMine = session_user_id === user_id;

	// 후기에 해당하는 상품 목록 패칭
	const { data: fetchReviewProduct, isPending: isFetchReviewProductPending } = useFetchReviewProducts(review_id);
	// 전체 상품 목록 패칭 (상품id 와 비교해서 이름 데이터 추출 예정)
	const { data: fetchProduct, isPending: isFetchProductPending } = useFetchProducts();
	// 후기에 해당하는 업로드 이미지 패칭
	const { data: fetchReviewImage, isPending: isFetchReviewImagePending } = useFetchReviewImages(review_id);

	// 후기 삭제 기능
	const { mutate: deleteReview, isPending: isDeleteReviewPending } = useDeleteReview({
		onSuccess: () => {
			toast.info('후기가 삭제되었습니다.', { position: 'top-center' });
		},
		onError: () => {
			toast.error('후기 삭제가 실패했습니다.', { position: 'top-center' });
		},
	});
	const openConfirmModal = useOpenConfirmModal();
	const handleDeleteReview = () => {
		openConfirmModal({
			title: '후기를 정말 삭제하시겠습니까?',
			description: '삭제된 후기는 되돌릴 수 없습니다',
			onPositive: () => {
				deleteReview(review_id);
			},
			onNegative: () => {},
		});
	};

	// 이미지 모달 상태 관리
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedImageUrl, setSelectedImageUrl] = useState('');
	const handleClickLargeImage = (imageUrl: string) => {
		setSelectedImageUrl(imageUrl);
		setIsModalOpen(true);
	};
	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	// Pending 상태 통합 관리
	const isPending =
		isFetchUserPending ||
		isFetchReviewProductPending ||
		isFetchProductPending ||
		isFetchReviewImagePending ||
		isDeleteReviewPending;

	return (
		<li className="px-3 py-4 border-b flex flex-col gap-y-3">
			{/* 작성자, 작성일 */}
			<div className="flex justify-between items-center mb-2">
				<ReviewUserProfile profileImage={profileImage} nickname={nickname!} createDatetime={createDatetime} />
				<Activity mode={isMine ? 'visible' : 'hidden'}>
					<EditDeleteButton onDelete={handleDeleteReview} />
				</Activity>
			</div>
			{/* 후기 이미지 */}
			<Carousel>
				<CarouselContent className="-ml-2">
					{fetchReviewImage?.map((image, index) => (
						<CarouselItem key={image.review_image_id} className="max-w-[150px] max-h-[150px] pl-2">
							<button
								type="button"
								className="h-full w-full rounded-md overflow-hidden flex items-center justify-center"
								onClick={() => handleClickLargeImage(image.review_image_url)}
								onKeyDown={(e) => e.key === 'Enter' && handleClickLargeImage(image.review_image_url)}
							>
								<img
									src={image.review_image_url}
									alt={`${index}번 후기 이미지`}
									className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
									aria-label={`${index}번 후기 이미지 확대`}
								/>
							</button>
						</CarouselItem>
					))}
				</CarouselContent>
			</Carousel>
			{/* 후기 제목, 내용 */}
			<ReviewTitleAndText review_title={review_title ?? '제목 없음'} review_text={review_text} />
			{/* 구매 상품, 방문일자 */}
			<div className="flex flex-col gap-y-3">
				<div className="flex flex-col gap-y-1.5 gap-x-2 text-xs">
					<p className="font-medium text-muted-foreground">구매 상품</p>
					{fetchReviewProduct?.map((rp) => {
						const product = fetchProduct?.find((p) => p.product_id === rp.product_id);
						return (
							product && (
								<ReviewProductItem
									key={rp.review_product_id}
									product_name_ko={product.product_name_ko}
									product_name_en={product.product_name_en}
									{...rp}
								/>
							)
						);
					})}
				</div>
				<div className="flex flex-col gap-x-2 text-xs">
					<p className="font-medium text-muted-foreground">방문 날짜</p>
					<ReviewVisitDate visitDatetime={visitDatetime} />
				</div>
			</div>

			{/* 이미지 확대 모달 */}
			<ImageModal imageUrl={selectedImageUrl} isOpen={isModalOpen} onClose={handleCloseModal} />
		</li>
	);
}

export default ReviewItem;
