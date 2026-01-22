import type { Provider } from '@supabase/supabase-js';
import { create } from 'zustand';
import { combine, devtools, persist } from 'zustand/middleware';

type State = {
	loginProvider: Provider | 'email' | null;
};

type Action = {
	setLoginProvider(provider: Provider | 'email' | null): void;
};

const initialState = {
	loginProvider: null,
};

export const useLoginProviderStore = create(
	devtools(
		persist(
			combine(initialState as State, (set) => ({
				actions: {
					setLoginProvider: (provider) => {
						set({ loginProvider: provider });
					},
				} as Action,
			})),
			{
				name: 'LoginProviderStore',
			}
		),
		{
			name: 'LoginProviderStore',
		}
	)
);

export const useLoginProvider = () => {
	const loginProvider = useLoginProviderStore((state) => state.loginProvider);
	return loginProvider;
};

export const useSetLoginProvider = () => {
	const setLoginProvider = useLoginProviderStore((state) => state.actions.setLoginProvider);
	return setLoginProvider;
};
