import { InfoIcon, PenIcon } from 'lucide-react';
import { Activity } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useOpenConfirmModal } from '@/app/store/confirmModalStore';
import LocationNavigation from '@/entities/location/ui/LocationNavigation';
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
				navigate(`/location/${location_id}/review/new`);
			},
		});
	};

	const param = useParams();
	const location_id = param.locationId;
	const { data: fetchReviews, isPending: isFetchReviewsPending } = useFetchReviewsByLocation(location_id!);

	// Pending 통합 상태 관리
	const isPending = isFetchReviewsPending;

	return (
		<>
			<LocationNavigation location_id={location_id!} />
			<main className="relative">
				<div className="fixed full-width mt-24 p-3 pt-4 top-0 z-1 bg-[#fff]">
					<Button type="button" variant={'outline'} onClick={handleClickCreateReviewPage} className="full-width">
						<PenIcon />
						<p>리뷰 작성하러 가기</p>
					</Button>
				</div>
				<div className="flex flex-col mt-39 px-3 pb-3">
					<Activity mode={isPending ? 'hidden' : 'visible'}>
						{/* 리뷰가 없을 때 대체 UI */}
						<Activity mode={fetchReviews?.length === 0 ? 'visible' : 'hidden'}>
							<div className="flex flex-col justify-center items-center gap-y-2 min-h-[calc(100svh-160px)]">
								<InfoIcon width={48} height={48} className="stroke-[1.5]" />
								<p className="font-medium">작성된 리뷰가 없습니다.</p>
							</div>
						</Activity>
						{/* 리뷰가 있을 때 */}
						<Activity mode={fetchReviews && fetchReviews.length > 0 ? 'visible' : 'hidden'}>
							{fetchReviews?.map((review) => (
								<ReviewItem key={review.review_id} {...review} />
							))}
							<div className="flex justify-center items-center p-3 text-sm border border-t-0 bg-muted">
								마지막 리뷰입니다
							</div>
						</Activity>
					</Activity>
				</div>
			</main>
		</>
	);
}

export default ReviewListPage;
