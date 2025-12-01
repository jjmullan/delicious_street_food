import { type ReactNode, useEffect } from 'react';
import { useIsSessionLoaded, useSetSession } from '@/app/store/sessionStore';
import supabase from '@/shared/api/supabase/supabase';

function SessionProvider({ children }: { children: ReactNode }) {
	const isSessionLoaded = useIsSessionLoaded();
	const setSession = useSetSession();

	useEffect(() => {
		// 세션 변경 구독
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_, session) => {
			setSession(session);
		});

		// 언마운트시 구독 해제
		return () => subscription.unsubscribe();
	}, [setSession]);

	if (!isSessionLoaded) return;

	return children;
}

export default SessionProvider;
