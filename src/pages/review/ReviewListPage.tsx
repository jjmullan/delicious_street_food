import { InfoIcon, PenIcon } from 'lucide-react';
import { Activity } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useOpenConfirmModal } from '@/app/store/confirmModalStore';
import useFetchReviewsByLocation from '@/features/review/fetch/hook/useFetchReviewsByLocation';
import ReviewItem from '@/features/review/fetch/ui/ReviewItem';
import { Button } from '@/shared/ui/shadcn/button';

function ReviewListPage() {
	const navigate = useNavigate();
	const openConfirmModal = useOpenConfirmModal();
	const handleClickCreateReviewPage = () => {
		openConfirmModal({
			title: '리뷰 작성 페이지로 이동하시겠습니까?',
			description: '',
			onPositive: () => {
				navigate(`/location/${locationId}/review/new`);
			},
		});
	};

	const param = useParams();
	const locationId = param.locationId;
	const { data: fetchReviews, isPending: isFetchReviewsPending } = useFetchReviewsByLocation(locationId!);

	// Pending 통합 상태 관리
	const isPending = isFetchReviewsPending;

	return (
		<div className="flex flex-col gap-y-1">
			<Button type="button" variant={'outline'} onClick={handleClickCreateReviewPage} className="">
				<PenIcon />
				<p>리뷰 작성하러 가기</p>
			</Button>
			<Activity mode={isPending ? 'hidden' : 'visible'}>
				<div className="flex flex-col">
					{fetchReviews?.map((review) => (
						<ReviewItem key={review.review_id} {...review} />
					))}
					<Activity mode={fetchReviews?.length === 0 ? 'visible' : 'hidden'}>
						<div className="flex flex-col justify-center items-center gap-y-2 min-h-[calc(100svh-112px)]">
							<InfoIcon width={48} height={48} className="stroke-[1.5]" />
							<p className="font-medium">작성된 리뷰가 없습니다.</p>
						</div>
					</Activity>
				</div>
			</Activity>
		</div>
	);
}

export default ReviewListPage;
