import { initialLocation } from '@entities/location/lib/location';
import type { AbbrLocation } from '@entities/location/model/types';
import { create } from 'zustand';
import { combine, devtools, persist } from 'zustand/middleware';

type State = {
	location: AbbrLocation;
	isUpdated: boolean;
};

type Action = {
	setLocation(location: AbbrLocation): void;
};

const initialState = {
	location: initialLocation,
	isUpdated: false,
};

/**
 * Zustand 를 이용하여 Local Storage 에서 로그인 정보를 가져오기
 */
export const useLocationStore = create(
	devtools(
		persist(
			combine(initialState as State, (set) => ({
				actions: {
					setLocation: (location) => {
						set({ location: location, isUpdated: true });
					},
				} as Action,
			})),
			{
				name: 'LocationStore',
				partialize: (state) => ({
					user: state.location,
				}),
			}
		),
		{
			name: 'SessionStore',
		}
	)
);

export const useLocation = () => {
	const location = useLocationStore((state) => state.location);
	return location;
};

export const useIsLocationUpdated = () => {
	const isLocationUpdated = useLocationStore((state) => state.isUpdated);
	return isLocationUpdated;
};

export const useSetLocation = () => {
	const setLocation = useLocationStore((state) => state.actions.setLocation);
	return setLocation;
};
