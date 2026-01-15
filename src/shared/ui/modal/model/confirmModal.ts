import type { ConfirmModalState, OpenState } from '@shared/ui/modal/types/modal.type';
import { create } from 'zustand';
import { combine, devtools } from 'zustand/middleware';

const initialState = {
	isOpen: false,
} as ConfirmModalState;

export const useConfirmModalStore = create(
	devtools(
		combine(initialState, (set) => ({
			actions: {
				open: (params: Omit<OpenState, 'isOpen'>) => {
					set({ ...params, isOpen: true });
				},
				close: () => {
					set({ isOpen: false });
				},
			},
		})),
		{ name: 'confirmModalStore' }
	)
);

export const useOpenConfirmModal = () => {
	const open = useConfirmModalStore((store) => store.actions.open);
	return open;
};

export const useConfirmModal = () => {
	const store = useConfirmModalStore();
	return store as typeof store & ConfirmModalState;
};
