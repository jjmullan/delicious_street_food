import useFetchReviewImagesByLocation from '@features/review/hooks/useFetchReviewImagesByLocation';
import ImageModal from '@shared/ui/modal/components/ImageModal';
import { useState } from 'react';
import { useParams } from 'react-router';

function LocationReviewPhoto() {
	const param = useParams();
	const location_id = param.locationId;
	const { data: fetchReviewImage, isPending: isFetchReviewImagePending } = useFetchReviewImagesByLocation(location_id!);

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

	// Pending 통합 상태 관리
	const isPending = isFetchReviewImagePending;

	return (
		<>
			<div className="flex items-center">
				{fetchReviewImage?.map((reviewImage, index) => (
					<button
						type="button"
						key={reviewImage.review_image_id}
						className="flex-1 max-w-1/4 max-h-[200px] overflow-hidden flex items-center justify-center"
						onClick={() => handleClickLargeImage(reviewImage.review_image_url)}
						onKeyDown={(e) => e.key === 'Enter' && handleClickLargeImage(reviewImage.review_image_url)}
					>
						<img
							src={reviewImage.review_image_url}
							alt={`${index}번 후기 이미지`}
							className="w-full h-full aspect-square object-cover cursor-pointer hover:opacity-90 transition-opacity"
							aria-label={`${index}번 후기 이미지 확대`}
						/>
					</button>
				))}
			</div>
			{/* 이미지 확대 모달 */}
			<ImageModal imageUrl={selectedImageUrl} isOpen={isModalOpen} onClose={handleCloseModal} />
		</>
	);
}

export default LocationReviewPhoto;
