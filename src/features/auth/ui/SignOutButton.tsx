import { signOut } from '@features/auth';
import { useOpenConfirmModal } from '@shared/ui/modal/model/confirmModal';
import { LogOutIcon } from 'lucide-react';
import { toast } from 'sonner';

function SignOutButton() {
	const openConfirmModal = useOpenConfirmModal();
	const handleClickSignOutButton = () => {
		openConfirmModal({
			title: '정말 로그아웃 하시겠습니까?',
			description: '서비스 이용을 위해 다시 로그인이 필요합니다.',
			onPositive: () => {
				signOut();
				toast.info('로그아웃 되었습니다.', { position: 'top-center' });
			},
		});
		return;
	};

	return (
		<button type="button" className="w-20 flex justify-end cursor-pointer" onClick={handleClickSignOutButton}>
			<LogOutIcon width={16} />
		</button>
	);
}

export default SignOutButton;
