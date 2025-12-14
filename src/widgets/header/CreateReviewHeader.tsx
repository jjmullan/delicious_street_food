import { RefreshCcwIcon, XCircleIcon } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useOpenConfirmModal } from '@/app/store/confirmModalStore';

function CreateReviewHeader() {
	const navigate = useNavigate();
	const openConfirmModal = useOpenConfirmModal();
	const handleClickCancelButton = () => {
		openConfirmModal({
			title: '리뷰 작성을 취소하시겠습니까?',
			description: '작성된 모든 정보가 삭제됩니다.',
			onPositive: () => {
				navigate(-1);
			},
		});
		return;
	};
	const handleClickResetButton = () => {
		openConfirmModal({
			title: '작성한 내용을 초기화하시겠습니까?',
			description: '작성된 모든 정보가 삭제됩니다.',
			onPositive: () => {
				window.location.reload();
			},
		});
		return;
	};

	return (
		<header className="fixed flex justify-between items-center text-sm full-width bg-[#fff] z-2">
			<button
				type="button"
				className="cursor-pointer px-4 h-12 flex justify-center items-center"
				onClick={handleClickCancelButton}
			>
				<XCircleIcon width={16} />
			</button>
			<h2 className="text-lg font-semibold">후기 작성</h2>
			<button
				type="button"
				className="cursor-pointer px-4 h-12 flex justify-center items-center"
				onClick={handleClickResetButton}
			>
				<RefreshCcwIcon width={16} />
			</button>
		</header>
	);
}

export default CreateReviewHeader;
