import author from '@shared/assets/extra/author.svg';
import { useCreateLocationModal } from '@/app/store/createLocationModalStore';
import { useSession } from '@/app/store/sessionStore';
import useFecthUserData from '@/features/user/fetch/hooks/useFecthUserData';
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
	const session = useSession();
	const userId = session?.user.id;
	const { data: user } = useFecthUserData(userId);
	const nickname = user?.nickname;

	const store = useCreateLocationModal();
	if (!store.isOpen) return null;

	const handleActionClick = () => {
		if (store.onPositive) store.onPositive();
		store.actions.close();
	};
	const handleCancelClick = () => {
		if (store.onNegative) store.onNegative();
		store.actions.close();
	};

	return (
		<AlertDialog open={store.isOpen}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>새로운 포장마차를 발견했어요!</AlertDialogTitle>
					<AlertDialogDescription className="sr-only">지도에 신규 포장마차를 등록해주세요</AlertDialogDescription>
					<div className="text-sm flex flex-col gap-y-2 items-center">
						<img src={author} alt="author" width={64} />
						<p className="text-muted-foreground flex justify-center items-center gap-x-1">
							발견한 사람: <span className="text-brown-main font-medium">{nickname}</span>
						</p>
					</div>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel onClick={handleCancelClick}>취소</AlertDialogCancel>
					<AlertDialogAction onClick={handleActionClick}>지도에 신규 포장마차 추가하기</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}

export default CreateLocationModal;
