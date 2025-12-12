import { Navigate, Outlet } from 'react-router';
import { useSession } from '@/app/store/sessionStore';
import LoggedInCreateHeader from '@/widgets/header/LoggedInCreateHeader';

/**
 * 최초 서비스 접근 시, 로그인 페이지로 라우팅
 */
function LoggedInCreateLayout() {
	const session = useSession();
	if (!session) return <Navigate to={'/login'} replace={true} />;

	return (
		<div className="min-h-svh full-width">
			<LoggedInCreateHeader />
			<main className="mt-12">
				<Outlet />
			</main>
		</div>
	);
}

export default LoggedInCreateLayout;
