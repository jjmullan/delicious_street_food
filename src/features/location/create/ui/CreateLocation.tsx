import { PlusIcon, XIcon } from 'lucide-react';
import { CustomOverlayMap } from 'react-kakao-maps-sdk';
import { useOpenCreateLocationModal } from '@/app/store/createLocationModalStore';
import type { AbbrLocation } from '@/features/location/fetch/types/location';
import LocationFinder from '@/features/location/fetch/ui/LocationFinder';

function CreateLocation({
	createLocation,
	handleCloseModal,
}: {
	createLocation: AbbrLocation;
	handleCloseModal(): void;
}) {
	// 생성 모달 UI 상태
	const openCreateLocationModal = useOpenCreateLocationModal();
	const handleOpenModal = () => {
		openCreateLocationModal({
			location: createLocation,
			onPositive: () => {
				handleCloseModal();
			},
			onNegative: () => {
				handleCloseModal();
			},
		});
	};

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
