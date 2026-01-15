import useFetchProducts from '@entities/product/model/useFetchProducts';
import useFetchReviewsByLocation from '@features/review/hooks/useFetchReviewsByLocation';
import ReviewItem from '@features/review/ui/ReviewItem';
import { useOpenConfirmModal } from '@shared/ui/modal/model/confirmModal';
import { Button } from '@shared/ui/shadcn/components/button';
import { InfoIcon, PenIcon } from 'lucide-react';
import { Activity } from 'react';
import { useNavigate, useParams } from 'react-router';

export default function ReviewListPage() {
	const param = useParams();
	const location_id = param.locationId;

	const navigate = useNavigate();
	const openConfirmModal = useOpenConfirmModal();
	const handleClickCreateReviewPage = () => {
		openConfirmModal({
			title: '후기 작성 페이지로 이동하시겠습니까?',
			description: '',
			onPositive: () => {
				navigate(`/location/${location_id}/review/new`);
			},
		});
	};

	// 리뷰 목록 패칭
	const { data: fetchReviews, isPending: isFetchReviewsPending } = useFetchReviewsByLocation(location_id!);
	const { data: fetchProducts, isPending: isFetchProductsPending } = useFetchProducts();

	// Pending 통합 상태 관리
	const isPending = isFetchReviewsPending || isFetchProductsPending;

	return (
		<div className="px-3">
			{/* 버튼 UI */}
			<div className="fixed auto-width mt-24 py-4 top-0 z-1 bg-[#fff]">
				<Button type="button" variant={'outline'} onClick={handleClickCreateReviewPage} className="full-width">
					<PenIcon />
					<p>후기 작성하러 가기</p>
				</Button>
			</div>
			{/* 후기 목록 UI */}
			<ul className="flex flex-col mt-41 pb-3">
				<Activity mode={isPending ? 'hidden' : 'visible'}>
					{/* 후기가 없을 때 대체 UI */}
					<Activity mode={fetchReviews?.length === 0 ? 'visible' : 'hidden'}>
						<li className="flex flex-col justify-center items-center gap-y-2 min-h-[calc(100svh-176px)]">
							<InfoIcon width={48} height={48} className="stroke-[1.5]" />
							<p className="font-medium">작성된 후기가 없습니다.</p>
						</li>
					</Activity>
					{/* 후기가 있을 때 */}
					<Activity mode={fetchReviews && fetchReviews.length > 0 ? 'visible' : 'hidden'}>
						{fetchReviews?.map((review) => (
							<ReviewItem key={review.review_id} {...review} />
						))}
						<li className="flex justify-center items-center p-3 text-sm border-b border-t-0 bg-muted">
							마지막 후기입니다
						</li>
					</Activity>
				</Activity>
			</ul>
		</div>
	);
}
