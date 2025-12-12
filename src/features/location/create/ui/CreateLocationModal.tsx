import author from '@shared/assets/extra/author.svg';
import { toast } from 'sonner';
import { useCreateLocationModal } from '@/app/store/createLocationModalStore';
import { useLocationForCreate } from '@/app/store/createLocationStore';
import { useSession } from '@/app/store/sessionStore';
import useCreateLocation from '@/features/location/create/hooks/useCreateLocation';
import useFecthUserData from '@/features/user/fetch/hooks/useFecthUserData';
import FallbackText from '@/shared/ui/fallback/FallbackText';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/shared/ui/shadcn/alert-dialog';

function CreateLocationModal() {
	// 선택된 위치 전역 상태 가져오기
	const clickedlocation = useLocationForCreate();

	const session = useSession();
	const userId = session?.user.id;
	const { data: user } = useFecthUserData(userId);
	const nickname = user?.nickname;

	// 위치 생성 API 호출
	const { mutate: createLocation, isPending: isCreateLocationPending } = useCreateLocation({
		onSuccess: () => {
			toast.info('위치 등록이 성공했습니다.', { position: 'top-center' });
		},
		onError: (error) => {
			toast.error('위치 등록이 실패했습니다.', { position: 'top-center' });
			throw error;
		},
	});

	const store = useCreateLocationModal();
	if (!store.isOpen) return null;

	const handleActionClick = () => {
		createLocation({
			user_id: userId!,
			latitude: String(clickedlocation.lat),
			longitude: String(clickedlocation.lng),
		});

		if (store.onPositive) store.onPositive();
		store.actions.close();
	};
	const handleCancelClick = () => {
		if (store.onNegative) store.onNegative();
		store.actions.close();
	};

	// 로딩 상태 통합 관리
	const isPending = isCreateLocationPending;

	return (
		<AlertDialog open={store.isOpen}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle className="text-center">새로운 포장마차를 발견했어요!</AlertDialogTitle>
					<AlertDialogDescription className="sr-only">지도에 신규 포장마차를 등록해주세요</AlertDialogDescription>
					<div className="flex flex-col gap-y-5 my-3">
						{/* 발견한 사람 */}
						<div className="text-sm flex flex-col gap-y-2 items-center">
							<img src={author} alt="author" width={64} />
							<p className="flex justify-center items-center gap-x-1">
								발견한 사람: <span className="text-brown-main font-medium">{nickname}</span>
							</p>
						</div>
					</div>
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
