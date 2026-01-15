import useFetchLocation from '@features/location/hooks/useFetchLocation';
import { deleteReview } from '@features/review/api/review';
import { useDeleteReview } from '@features/review/hooks/useDeleteReview';
import useFetchReviewImagesByReview from '@features/review/hooks/useFetchReviewImages';
import type { Review } from '@shared/types/api';
import EditDeleteButton from '@shared/ui/button/components/EditDeleteButton';
import ImageModal from '@shared/ui/modal/components/ImageModal';
import { useOpenConfirmModal } from '@shared/ui/modal/model/confirmModal';
import { Carousel, CarouselContent, CarouselItem } from '@shared/ui/shadcn/carousel';
import { getDateTimeKo } from '@shared/utils/day';
import { TriangleIcon } from 'lucide-react';
import { Activity, useState } from 'react';
import { Link } from 'react-router';
import { toast } from 'sonner';

function ReviewItemForMypage({ review_id, review_title, review_text, location_id, visit_datetime }: Review) {
	const { data: fetchLocation } = useFetchLocation(location_id);
	const { data: fetchReviewImages } = useFetchReviewImagesByReview(review_id);

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

	// 리뷰 삭제
	const { mutate: deleteReview } = useDeleteReview({
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

	const visitDatetime = getDateTimeKo({ date: new Date(visit_datetime).getTime(), isTimeIncluding: true });

	return (
		<li className="flex flex-col">
			<div className="rounded-md p-4 flex flex-col gap-y-3 w-full bg-white">
				<h4 className="sr-only">내가 작성한 후기 목록</h4>
				{/* 방문한 장소, 방문 시간 */}
				<div className="flex text-xs items-center justify-between">
					<div className="flex gap-x-1">
						<Link to={`/location/${fetchLocation?.location_id}/home`} className="font-semibold text-muted-foreground">
							{fetchLocation?.location_name ?? '포장마차'}
						</Link>
						<span>・</span>
						<p className="text-muted-foreground">{visitDatetime} 방문</p>
					</div>
					<EditDeleteButton onDelete={handleDeleteReview} />
				</div>
				{/* 제목, 글 */}
				<div className="flex flex-col gap-y-1">
					<p className="font-semibold">{review_title}</p>
					<p className="text-sm">{review_text}</p>
				</div>
				{/* 후기 이미지 */}
				<Activity mode={fetchReviewImages ? 'visible' : 'hidden'}>
					<Carousel>
						<CarouselContent className="-ml-2">
							{fetchReviewImages?.map((image, index) => (
								<CarouselItem key={image.review_image_id} className="max-w-[80px] max-h-[80px] pl-2">
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
				</Activity>
			</div>
			<TriangleIcon width={16} height={16} className="rotate-180 fill-white translate-x-5 -translate-y-0.5" color="" />

			{/* 이미지 확대 모달 */}
			<ImageModal imageUrl={selectedImageUrl} isOpen={isModalOpen} onClose={handleCloseModal} />
		</li>
	);
}

export default ReviewItemForMypage;
