import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import CreateLocationModal from '@/features/location/create/ui/CreateLocationModal';
import ConfirmModal from '@/shared/ui/modal/ConfirmModal';

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
