import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import ConfirmModal from '@/shared/ui/modal/ConfirmModal';

function ModalProvider({ children }: { children: ReactNode }) {
	return (
		<>
			{createPortal(
				<>
					<ConfirmModal />
				</>,
				document.getElementById('root') as HTMLElement
			)}
			{children}
		</>
	);
}

export default ModalProvider;
