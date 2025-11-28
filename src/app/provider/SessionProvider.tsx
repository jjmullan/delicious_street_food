import { type ReactNode, useEffect } from 'react';
import { useIsSessionLoaded, useSession, useSetSession } from '@/app/store/session';
import useUserData from '@/features/auth/signIn/hooks/query/useUserData';
import supabase from '@/shared/api/supabase/supabase';

function SessionProvider({ children }: { children: ReactNode }) {
	const session = useSession();
	const isSessionLoaded = useIsSessionLoaded();
	const setSession = useSetSession();
	const { isLoading } = useUserData(session!.user.id);

	useEffect(() => {
		// 초기 세션 가져오기
		supabase.auth
			.getSession()
			.then(({ data: { session }, error }) => {
				if (error) {
					console.error('세션 로딩 오류:', error);
					return;
				}

				setSession(session);
			})
			.catch((error) => {
				console.error('세션 초기화 오류:', error);
			});

		// 실시간 감시 설정
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_, session) => {
			setSession(session);
		});

		return () => subscription.unsubscribe();
	}, [setSession]);

	if (!isSessionLoaded) return <div>로딩 중...</div>;
	if (isLoading) return <div>로딩 중...</div>;
	return children;
}

export default SessionProvider;
