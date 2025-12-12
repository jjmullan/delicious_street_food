import { CalendarDaysIcon, PackageOpenIcon } from 'lucide-react';
import useFetchProducts from '@/features/product/item/hooks/useFetchProducts';
import { characterImages } from '@/features/product/item/libs/item';
import useFetchReviewImages from '@/features/review/fetch/hook/useFetchReviewImages';
import useFetchReviewProducts from '@/features/review/fetch/hook/useFetchReviewProducts';
import useFecthUserData from '@/features/user/fetch/hooks/useFecthUserData';
import { formatTimeAgo, getDateTimeKo } from '@/shared/lib/day';
import type { Review } from '@/shared/types/types';

function ReviewItem({ user_id, review_id, review_title, review_text, visit_datetime, created_at }: Review) {
	// 유저 정보 패칭
	const { data: fetchUser, isPending: isFetchUserPending } = useFecthUserData(user_id);
	const nickname = fetchUser?.nickname;
	const createDatetime = formatTimeAgo(created_at);
	const visitDatetime = getDateTimeKo(new Date(visit_datetime).getTime());

	// 리뷰에 해당하는 상품 목록 패칭
	const { data: fetchReviewProduct, isPending: isFetchReviewProductPending } = useFetchReviewProducts(review_id);
	// 전체 상품 목록 패칭 (상품id 와 비교해서 이름 데이터 추출 예정)
	const { data: fetchProduct, isPending: isFetchProductPending } = useFetchProducts();

	// 리뷰에 해당하는 업로드 이미지 패칭
	const { data: fetchReviewImage, isPending: isFetchReviewImagePending } = useFetchReviewImages(review_id);
	console.log(fetchReviewImage);

	// Pending 상태 통합 관리
	const isPending =
		isFetchUserPending || isFetchReviewProductPending || isFetchProductPending || isFetchReviewImagePending;

	return (
		<div className="px-3 py-4 border-b flex flex-col gap-y-3">
			{/* 작성자, 작성일 */}
			<div className="flex items-center gap-x-1.5">
				<p className="text-xs font-semibold text-muted-foreground">{nickname}</p>
				<p className="text-xs text-muted-foreground">{createDatetime}</p>
			</div>
			{/* 후기 이미지 */}
			<div className="">
				{fetchReviewImage?.map((image, index) => (
					<div key={image.review_id} className="w-18 h-18 border">
						<img src={image.review_image_url} alt={`${index}번 후기 이미지`} />
					</div>
				))}
			</div>
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
		</div>
	);
}

export default ReviewItem;
