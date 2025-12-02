import { Navigate, Outlet } from 'react-router';
import { useSession } from '@/app/store/sessionStore';
import LoggedInUserOnlyHeader from '@/widgets/header/LoggedInUserOnlyHeader';

/**
 * 최초 서비스 접근 시, 로그인 페이지로 라우팅
 */
function LoggedInUserOnlyLayout() {
	const session = useSession();

	if (!session) return <Navigate to={'/login'} replace={true} />;
	return (
		<>
			<main>
				<Outlet />
			</main>
			<LoggedInUserOnlyHeader />
		</>
	);
}

export default LoggedInUserOnlyLayout;
