import { useConfirmModal } from '@app/store/confirmModalStore';
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

function ConfirmModal() {
	const store = useConfirmModal();
	if (!store.isOpen) return null;

	const handleCancelClick = () => {
		if (store.onNegative) store.onNegative();
		store.actions.close();
	};
	const handleActionClick = () => {
		if (store.onPositive) store.onPositive();
		store.actions.close();
	};

	return (
		<AlertDialog open={store.isOpen}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>{store.title}</AlertDialogTitle>
					<AlertDialogDescription>{store.description}</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel onClick={handleCancelClick}>취소</AlertDialogCancel>
					<AlertDialogAction onClick={handleActionClick}>확인</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}

export default ConfirmModal;
