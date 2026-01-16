import { useSetLoginProvider } from '@features/auth/model/loginProvider';
import { useIsSessionLoaded, useSession } from '@shared/model/session';
import type { Provider } from '@supabase/supabase-js';
import { type ReactNode, useEffect } from 'react';

function LoginProviderProvider({ children }: { children: ReactNode }) {
	const isSessionLoaded = useIsSessionLoaded();
	const session = useSession();
	const setLoginProvider = useSetLoginProvider();

	useEffect(() => {
		if (!isSessionLoaded && !session) return;

		// 로그인 성공 시, LoginProvider 정보 저장
		let provider = session!.user.app_metadata.provider;

		// app_metadata 가 없는 경우, 기존 로그인 이력 중 최근 데이터 추출
		if (!provider && session!.user.identities) {
			const lastProvider = session!.user.identities[session!.user.identities.length - 1];
			provider = lastProvider.provider;
		}

		if (provider && provider !== 'email') {
			setLoginProvider(provider as Provider);
		} else {
			setLoginProvider('email');
		}
	}, [setLoginProvider, session, isSessionLoaded]);

	return children;
}

export default LoginProviderProvider;
