import { create } from 'zustand';
import { combine, devtools } from 'zustand/middleware';
import { initialLocation } from '@/features/location/fetch/libs/location';
import type { AbbrLocation } from '@/features/location/fetch/types/location';

type State = {
	location: AbbrLocation;
	isUpdated: boolean;
};

const initialState = {
	location: initialLocation,
	isUpdated: false,
};

/**
 * Zustand 를 이용하여 Local Storage 에서 로그인 정보를 가져오기
 */
export const useCreateLocationStore = create(
	devtools(
		combine(initialState as State, (set) => ({
			actions: {
				setCreateLocation: (location: AbbrLocation) => {
					set({ location: location, isUpdated: true });
				},
			},
		})),
		{
			name: 'CreateLocationStore',
		}
	)
);

export const useLocationForCreate = () => {
	const createLocation = useCreateLocationStore((state) => state.location);
	return createLocation;
};

export const useIsCreateLocationUpdated = () => {
	const isLocationUpdated = useCreateLocationStore((state) => state.isUpdated);
	return isLocationUpdated;
};

export const useSetCreateLocation = () => {
	const setCreateLocation = useCreateLocationStore((state) => state.actions.setCreateLocation);
	return setCreateLocation;
};
