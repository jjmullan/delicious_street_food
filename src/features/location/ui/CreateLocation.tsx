import { useCreateLocationModal, useOpenCreateLocationModal } from '@app/store/createLocationModalStore';
import type { AbbrLocation } from '@features/location/types/location';
import LocationFinder from '@features/location/ui/LocationFinder';
import { PlusIcon, XIcon } from 'lucide-react';
import { useEffect } from 'react';
import { CustomOverlayMap } from 'react-kakao-maps-sdk';

function CreateLocation({
	createLocation,
	handleCloseModal,
}: {
	createLocation: AbbrLocation;
	handleCloseModal(): void;
}) {
	// 생성을 위한 상세 모달 UI 열기/닫기
	const openCreateLocationModal = useOpenCreateLocationModal();
	const handleOpenModal = () => {
		openCreateLocationModal({
			onPositive: () => {
				handleCloseModal();
			},
			onNegative: () => {
				handleCloseModal();
			},
		});
	};

	// 위치 생성을 위한 상세 모달이 열려있는 경우, 해당 UI 는 닫기
	const createLocationModal = useCreateLocationModal();
	const isModalOpen = createLocationModal.isOpen;
	useEffect(() => {
		if (isModalOpen) {
			handleCloseModal();
		} else {
			return;
		}
	}, [isModalOpen]);

	return (
		<CustomOverlayMap position={createLocation ?? location} clickable={true}>
			<div className="absolute translate-x-[-31px] translate-y-[-12px]">
				<div className="flex flex-col items-center gap-y-1">
					<LocationFinder is_my_location={false} is_create_location={true} />
					<div className="flex flex-col glass rounded-md z-3 text-sm">
						<button
							type="button"
							className="px-2 py-1.5 flex items-center gap-x-1.5 border-b"
							onClick={handleOpenModal}
						>
							<PlusIcon width={16} height={16} />
							추가
						</button>
						<button
							type="button"
							className="px-2 py-1.5 flex items-center gap-x-1.5 text-red"
							onClick={handleCloseModal}
						>
							<XIcon width={16} height={16} color="#e35c18" />
							취소
						</button>
					</div>
				</div>
			</div>
		</CustomOverlayMap>
	);
}

export default CreateLocation;
