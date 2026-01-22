import { type AbbrLocation, initialLocation } from '@entities/location';
import { create } from 'zustand';
import { combine, devtools } from 'zustand/middleware';

type State = {
	location: AbbrLocation;
	isCreateMode: boolean;
	isUpdated: boolean;
};

const initialState = {
	location: initialLocation,
	isCreateMode: false,
	isUpdated: false,
};

/**
 * Zustand 를 이용하여 Local Storage 에서 로그인 정보를 가져오기
 */
export const useCreateLocationStore = create(
	devtools(
		combine(initialState as State, (set) => ({
			actions: {
				setCreateMode: (isUpdateMode: boolean) => {
					set({ isCreateMode: !isUpdateMode });
				},
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

export const useIsCreateMode = () => {
	const isCreateMode = useCreateLocationStore((state) => state.isCreateMode);
	return isCreateMode;
};

export const useSetIsCreateMode = () => {
	const setIsCreateMode = useCreateLocationStore((state) => state.actions.setCreateMode);
	return setIsCreateMode;
};

export const useSetCreateLocation = () => {
	const setCreateLocation = useCreateLocationStore((state) => state.actions.setCreateLocation);
	return setCreateLocation;
};
