import defaultavatar from '@shared/assets/character/defaultavatar.svg';
import { CalendarDaysIcon, EditIcon, Trash2Icon } from 'lucide-react';
import { Activity, useState } from 'react';
import { useSession } from '@/app/store/sessionStore';
import useFetchProducts from '@/features/product/item/hooks/useFetchProducts';
import { characterImages } from '@/features/product/item/libs/item';
import useFetchReviewImages from '@/features/review/fetch/hook/useFetchReviewImages';
import useFetchReviewProducts from '@/features/review/fetch/hook/useFetchReviewProducts';
import useFecthUserData from '@/features/user/fetch/hooks/useFecthUserData';
import { formatTimeAgo, getDateTimeKo } from '@/shared/lib/day';
import type { Review } from '@/shared/types/types';
import ImageModal from '@/shared/ui/modal/ImageModal';
import { Carousel, CarouselContent, CarouselItem } from '@/shared/ui/shadcn/carousel';

function ReviewItem({ user_id, review_id, review_title, review_text, visit_datetime, created_at }: Review) {
	// 유저 정보 패칭
	const { data: fetchUser, isPending: isFetchUserPending } = useFecthUserData(user_id);
	const profileImage = fetchUser?.profile_image_url || defaultavatar;
	const nickname = fetchUser?.nickname;
	const createDatetime = formatTimeAgo(created_at);
	const visitDatetime = getDateTimeKo(new Date(visit_datetime).getTime());

	// 현재 내 세션 정보의 user_id 추출, 내 리뷰인지 여부에 따른 UI 별도 설정
	const session = useSession();
	const session_user_id = session?.user.id;
	const isMine = session_user_id === user_id;

	// 리뷰에 해당하는 상품 목록 패칭
	const { data: fetchReviewProduct, isPending: isFetchReviewProductPending } = useFetchReviewProducts(review_id);
	// 전체 상품 목록 패칭 (상품id 와 비교해서 이름 데이터 추출 예정)
	const { data: fetchProduct, isPending: isFetchProductPending } = useFetchProducts();

	// 리뷰에 해당하는 업로드 이미지 패칭
	const { data: fetchReviewImage, isPending: isFetchReviewImagePending } = useFetchReviewImages(review_id);

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
		isFetchUserPending || isFetchReviewProductPending || isFetchProductPending || isFetchReviewImagePending;

	return (
		<div className="px-3 py-4 border-b flex flex-col gap-y-3">
			{/* 작성자, 작성일 */}
			<div className="flex justify-between items-start mb-2">
				<div className="flex items-center gap-x-2.5">
					<div className="w-9 h-9">
						<img src={profileImage} alt="프로필 이미지" className="w-full h-full object-cover" />
					</div>
					<div className="flex flex-col">
						<p className="text-sm font-semibold">{nickname}</p>
						<p className="text-xs text-muted-foreground">{createDatetime}</p>
					</div>
				</div>
				<Activity mode={isMine ? 'visible' : 'hidden'}>
					<div className="flex gap-x-2">
						<div className="flex items-center text-xs gap-x-1">
							<EditIcon width={10} height={10} />
							<p>수정</p>
						</div>
						<div className="flex items-center text-xs gap-x-1 ">
							<Trash2Icon width={10} height={10} />
							<p>삭제</p>
						</div>
					</div>
				</Activity>
			</div>
			{/* 후기 이미지 */}
			<Carousel>
				<CarouselContent className="-ml-2">
					{fetchReviewImage?.map((image, index) => (
						<CarouselItem key={image.review_id} className="max-w-[150px] max-h-[150px] pl-2">
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
			<div className="flex flex-col">
				<h3 className="text-base font-semibold">{review_title !== '' ? review_title : '제목 없음'}</h3>
				<div className="text-sm">{review_text}</div>
			</div>
			{/* 구매 상품, 방문일자 */}
			<div className="flex flex-col gap-y-3">
				<div className="flex flex-col gap-y-1.5 gap-x-2 text-xs">
					<p className="font-medium text-muted-foreground">구매 상품</p>
					{fetchReviewProduct?.map((rp) => (
						<div key={rp.review_product_id} className="flex items-center gap-x-1">
							<img
								src={characterImages[fetchProduct!.find((p) => p.product_id === rp.product_id)!.product_name_en]}
								alt=""
								className="h-4 aspect-square"
							/>
							<p className="">{fetchProduct?.find((p) => p.product_id === rp.product_id)?.product_name_ko}</p>
							<span>・</span>
							<p>{rp.order_quantity}개</p>
							<span>・</span>
							<p>{rp.order_price?.toLocaleString()}원</p>
						</div>
					))}
				</div>
				<div className="flex flex-col gap-x-2 text-xs">
					<p className="font-medium text-muted-foreground">방문 날짜</p>
					<div className="flex items-center gap-x-1">
						<CalendarDaysIcon width={14} />
						<p className="">{visitDatetime}</p>
					</div>
				</div>
			</div>

			{/* 이미지 확대 모달 */}
			<ImageModal imageUrl={selectedImageUrl} isOpen={isModalOpen} onClose={handleCloseModal} />
		</div>
	);
}

export default ReviewItem;
