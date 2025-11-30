import type { Session } from '@supabase/supabase-js';
import { create } from 'zustand';
import { combine, devtools, persist } from 'zustand/middleware';

type State = {
	session: Session | null;
	isLoaded: boolean;
};

type Action = {
	setSession(session: Session | null): void;
};

const initialState = {
	session: null,
	isLoaded: false,
};

/**
 * Zustand 를 이용하여 Local Storage 에서 로그인 정보를 가져오기
 */
export const useSessionStore = create(
	devtools(
		persist(
			combine(initialState as State, (set) => ({
				actions: {
					setSession: (session: Session | null) => {
						set({ session: session, isLoaded: true });
					},
				} as Action,
			})),
			{
				name: 'SessionStore',
				partialize: (state) => ({
					user: state.session?.user,
				}),
			}
		),
		{
			name: 'SessionStore',
		}
	)
);

export const useSession = () => {
	const session = useSessionStore((state) => state.session);
	return session;
};

export const useIsSessionLoaded = () => {
	const isSessionLoaded = useSessionStore((state) => state.isLoaded);
	return isSessionLoaded;
};

export const useSetSession = () => {
	const setSession = useSessionStore((state) => state.actions.setSession);
	return setSession;
};
