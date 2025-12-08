import { create } from 'zustand';
import { combine, devtools, persist } from 'zustand/middleware';
import type { AbbrLocation } from '@/features/location/fetch/types/location';

type State = {
	location: AbbrLocation;
};

type Action = {
	setCreateLocation(location: AbbrLocation): void;
};

const initialState = {
	location: { lat: 0, lng: 0 },
} as State;

/**
 * Zustand 를 이용하여 Local Storage 에서 로그인 정보를 가져오기
 */
export const useCreateLocationStore = create(
	devtools(
		persist(
			combine(initialState as State, (set) => ({
				actions: {
					setCreateLocation: (location) => {
						set({ location: location });
					},
				} as Action,
			})),
			{
				name: 'CreateLocationStore',
			}
		),
		{
			name: 'CreateLocationStore',
		}
	)
);

export const useLocationForCreate = () => {
	const createLocation = useCreateLocationStore((state) => state.location);
	return createLocation;
};

export const useSetCreateLocation = () => {
	const setCreateLocation = useCreateLocationStore((state) => state.actions.setCreateLocation);
	return setCreateLocation;
};
