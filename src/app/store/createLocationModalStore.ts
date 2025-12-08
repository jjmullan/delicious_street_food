import { create } from 'zustand';
import { combine, devtools } from 'zustand/middleware';

type OpenState = {
	isOpen: true;
	onPositive?(): void;
	onNegative?(): void;
};

type CloseState = {
	isOpen: false;
};

type State = CloseState | OpenState;

const initialState = {
	isOpen: false,
	clicked_location: { lat: 0, lng: 0 },
} as State;

export const useCreateLocationModalStore = create(
	devtools(
		combine(initialState, (set) => ({
			actions: {
				open: (params: State) => {
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
