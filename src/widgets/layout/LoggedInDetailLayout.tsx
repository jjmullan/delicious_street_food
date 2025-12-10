import { Navigate, Outlet } from 'react-router';
import { useSession } from '@/app/store/sessionStore';
import LoggedInDetailHeader from '@/widgets/header/LoggedInDetailHeader';

/**
 * 최초 서비스 접근 시, 로그인 페이지로 라우팅
 */
function LoggedInDetailLayout() {
	const session = useSession();
	if (!session) return <Navigate to={'/login'} replace={true} />;

	return (
		<div className="min-h-svh">
			<LoggedInDetailHeader />
			<main className="p-3 mt-12">
				<Outlet />
			</main>
		</div>
	);
}

export default LoggedInDetailLayout;
