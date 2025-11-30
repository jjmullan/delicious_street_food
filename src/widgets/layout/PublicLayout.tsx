import { Navigate, Outlet } from 'react-router';
import { useSession } from '@/app/store/sessionStore';

/**
 * 최초 서비스 접근 시, 로그인 페이지로 라우팅
 */
function PublicLayout() {
	const session = useSession();

	if (!session) return <Navigate to={'/login'} replace={true} />;
	return <Outlet />;
}

export default PublicLayout;
