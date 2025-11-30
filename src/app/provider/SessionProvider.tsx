import { type ReactNode, useEffect } from 'react';
import { useIsSessionLoaded, useSetSession } from '@/app/store/sessionStore';
import supabase from '@/shared/api/supabase/supabase';

function SessionProvider({ children }: { children: ReactNode }) {
	const isSessionLoaded = useIsSessionLoaded();
	const setSession = useSetSession();

	useEffect(() => {
		// 1. 초기 세션 가져오기
		supabase.auth
			.getSession()
			.then(({ data: { session } }) => {
				setSession(session);
			})
			.catch((error) => {
				console.error('세션 데이터 로딩 오류: ', error);
				throw error;
			});

		// 2. 세션 변경 감지
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_, session) => {
			setSession(session);
		});

		// 3. cleanup
		return () => subscription.unsubscribe();
	}, [setSession]);

	if (!isSessionLoaded) return <div>로딩 중...</div>;

	return children;
}

export default SessionProvider;
