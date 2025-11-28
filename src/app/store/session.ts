import { useEffect, useState } from 'react';
import type { Session } from 'react-router';
import { create } from 'zustand';
import { combine, devtools } from 'zustand/middleware';
import supabase from '@/shared/api/supabase/supabase';

type State = {
	isLoaded: boolean;
	session: Session | null;
};

const initialState = {
	isLoaded: false,
	session: null,
} as State;

/**
 * Zustand 를 이용하여 Local Storage 에서 로그인 정보를 가져오기
 */
export const useSessionStore = create(
	devtools(
		combine(initialState, (set) => ({
			actions: {
				setSession: (session: Session | null) => {
					set({ session, isLoaded: true });
				},
			},
		})),
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

/**
 *
 */
export const useSupabaseSession = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const checkAuth = async () => {
			try {
				setIsLoading(true);

				const {
					data: { session },
					error,
				} = await supabase.auth.getSession();

				if (error) throw error;
				setIsAuthenticated(!!session);
			} catch (error) {
				console.error('인증 세션 오류:', error);
				setIsAuthenticated(false);
			} finally {
				setIsLoading(false);
			}
		};

		checkAuth();

		// 2. 실시간 인증 상태 변경 감지
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, session) => {
			setIsAuthenticated(!!session);
			setIsLoading(false);
		});

		// 클린업
		return () => {
			subscription.unsubscribe();
		};
	}, []);

	return { isAuthenticated, isLoading };
};
