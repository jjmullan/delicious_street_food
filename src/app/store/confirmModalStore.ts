import { create } from 'zustand';
import { combine, devtools } from 'zustand/middleware';

type OpenState = {
	isOpen: true;
	title: string;
	description: string;
	onPositive?(): void;
	onNegative?(): void;
};

type CloseState = {
	isOpen: false;
};

type State = CloseState | OpenState;

const initialState = {
	isOpen: false,
} as State;

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
	return store as typeof store & State;
};
