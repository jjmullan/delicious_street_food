import { CreateLocationModal } from '@features/location';
import ConfirmModal from '@shared/ui/modal/components/ConfirmModal';
import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';

function ModalProvider({ children }: { children: ReactNode }) {
	return (
		<>
			{createPortal(
				<>
					<ConfirmModal />
					<CreateLocationModal />
				</>,
				document.getElementById('root') as HTMLElement
			)}
			{children}
		</>
	);
}

export default ModalProvider;
