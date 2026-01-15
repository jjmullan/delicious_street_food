import { useCreateLocationModal } from '@app/store/createLocationModalStore';
import { useIsCreateMode, useLocationForCreate, useSetIsCreateMode } from '@app/store/createLocationStore';
import useCreateLocation from '@features/location/hooks/useCreateLocation';
import { getFullLocationAddress } from '@features/location/utils/getLocationAddress';
import useFecthUserData from '@features/user/hooks/useFecthUserData';
import author from '@shared/assets/extra/author.svg';
import { useOpenConfirmModal } from '@shared/model/confirmModal';
import { useSession } from '@shared/model/session';
import FallbackText from '@shared/ui/fallback/FallbackText';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@shared/ui/shadcn/alert-dialog';
import { Button } from '@shared/ui/shadcn/button';
import { Activity, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

function CreateLocationModal() {
	// 선택된 위치 전역 상태 가져오기
	const clickedlocation = useLocationForCreate();
	const address = getFullLocationAddress(clickedlocation);

	const session = useSession();
	const userId = session?.user.id;
	const { data: user } = useFecthUserData(userId);
	const nickname = user?.nickname;

	// 생성 모드 전역 상태 관리
	const isCreateMode = useIsCreateMode();
	const setIsCreateMode = useSetIsCreateMode();

	// 위치 생성 API 호출
	const { mutate: createLocation, isPending: isCreateLocationPending } = useCreateLocation({
		onSuccess: () => {
			toast.info('신규 포장마차가 등록되었습니다!', { position: 'top-center' });
		},
		onError: (error) => {
			toast.error('신규 포장마차 등록이 실패했습니다. 다시 시도해주세요.', { position: 'top-center' });
			throw error;
		},
	});

	// 매장 이름 검증
	const [hasName, setHasName] = useState(false);
	const [locationName, setLocationName] = useState('');
	const nameRef = useRef<HTMLInputElement>(null);
	useEffect(() => {
		if (hasName) {
			setLocationName('');
			nameRef.current?.focus();
		}
	}, [hasName]);

	const store = useCreateLocationModal();
	const openConfirmModal = useOpenConfirmModal();
	const handleActionClick = () => {
		openConfirmModal({
			title: '정말 생성하시겠습니까?',
			description: '한번 생성된 포장마차는 임의로 수정, 삭제할 수 없습니다. 위치 정보와 매장명을 꼭 확인해주세요!',
			onPositive: () => {
				handleRequestCreateLocation();
			},
		});
	};
	const handleRequestCreateLocation = () => {
		// 매장 이름이 있다고 선택했는데 입력하지 않은 경우
		if (hasName && locationName.trim() === '') {
			toast.error('매장 이름을 입력해주세요.', { position: 'top-center' });
			return;
		}

		createLocation({
			user_id: userId!,
			latitude: String(clickedlocation.lat),
			longitude: String(clickedlocation.lng),
			location_name: hasName ? locationName : null,
			location_address: address,
		});

		setIsCreateMode(isCreateMode);
		resetAndClose();
	};

	const handleCancelClick = () => {
		resetAndClose();
	};

	const resetAndClose = () => {
		setHasName(false);
		setLocationName('');
		store.actions.close();
	};

	// 로딩 상태 통합 관리
	const isPending = isCreateLocationPending;

	return (
		<AlertDialog open={store.isOpen}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle className="text-center">
						{/* 발견한 사람 */}
						<div className="flex flex-col gap-y-2 items-center">
							<img src={author} alt="author" width={64} />
							새로운 포장마차를 발견했어요!
						</div>
					</AlertDialogTitle>
					<AlertDialogDescription className="flex flex-col gap-y-4">
						{/* 1. 매장 이름 유무 */}
						<div className="flex flex-col justify-center items-center gap-y-2">
							<p className="text-sm text-foreground">포장마차 이름이 있나요?</p>
							<div className="flex justify-center items-center w-1/2 rounded-md">
								<Button
									type="button"
									variant={'secondary'}
									onClick={() => setHasName(true)}
									className={`flex-1 rounded-r-none text-muted-foreground font-normal bg-[#fff] border border-r-0 ${hasName === true && 'border-2 border-brown-main bg-brown-main text-[#fff] font-semibold'}`}
									disabled={isPending}
								>
									예
								</Button>
								<Button
									type="button"
									variant={'secondary'}
									onClick={() => setHasName(false)}
									className={`flex-1 rounded-l-none text-muted-foreground font-normal bg-[#fff] border border-l-0 ${hasName === false && 'border-2 border-brown-main bg-brown-main text-[#fff] font-semibold'}`}
									disabled={isPending}
								>
									아니오
								</Button>
							</div>
						</div>

						{/* 2. 포장마차 이름 입력 */}
						<Activity mode={hasName ? 'visible' : 'hidden'}>
							<div className="flex flex-col justify-center items-center gap-y-2">
								<label htmlFor="location-name" className="text-sm text-foreground">
									포장마차 이름을 입력해주세요
								</label>
								<input
									id="location-name"
									type="text"
									value={locationName}
									onChange={(e) => setLocationName(e.target.value)}
									className="w-3/5 border-b p-2 pt-0 outline-0 text-center"
									disabled={isPending}
									ref={nameRef}
								/>
							</div>
						</Activity>
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter className="flex flex-col">
					<AlertDialogAction onClick={handleActionClick} disabled={isPending} className="flex-1">
						{isPending ? <FallbackText title={'지도에 추가 중'} /> : '신규 포장마차 추가하기'}
					</AlertDialogAction>
					<AlertDialogCancel onClick={handleCancelClick} disabled={isPending} className="flex-1">
						취소
					</AlertDialogCancel>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}

export default CreateLocationModal;
