import CreateLocationModal from '@features/location/ui/CreateLocationModal';
import ConfirmModal from '@shared/ui/modal/ConfirmModal';
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
