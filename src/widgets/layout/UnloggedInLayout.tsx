import { Navigate, Outlet } from 'react-router';
import { useSession } from '@/app/store/sessionStore';
import NonMapHeader from '@/widgets/header/NonMapHeader';

/**
 * 최초 서비스 접근 시, 로그인 페이지로 라우팅
 */
function UnloggedInLayout() {
	const session = useSession();

	if (session) return <Navigate to={'/'} replace={true} />;
	return (
		<>
			<main className="px-4">
				<Outlet />
			</main>
			<NonMapHeader />
		</>
	);
}

export default UnloggedInLayout;
