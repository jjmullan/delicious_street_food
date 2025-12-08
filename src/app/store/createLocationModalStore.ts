import { create } from 'zustand';
import { combine, devtools } from 'zustand/middleware';

type OpenState = {
	isOpen: true;
	user_id: string;
	latitude: string;
	longitude: string;
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

export const useCreateLocationModalStore = create(
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
		{ name: 'createLocationModalStore' }
	)
);

export const useOpenCreateLocationModal = () => {
	const open = useCreateLocationModalStore((store) => store.actions.open);
	return open;
};

export const useCreateLocationModal = () => {
	const store = useCreateLocationModalStore();
	return store as typeof store & State;
};
