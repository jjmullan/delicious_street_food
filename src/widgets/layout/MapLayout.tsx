import { Navigate, Outlet } from 'react-router';
import { useSession } from '@/app/store/sessionStore';
import MapHeader from '@/widgets/header/MapHeader';

/**
 * 최초 서비스 접근 시, 로그인 페이지로 라우팅
 */
function MapLayout() {
	const session = useSession();

	if (!session) return <Navigate to={'/login'} replace={true} />;
	return (
		<div className="">
			<Outlet />
			<MapHeader />
		</div>
	);
}

export default MapLayout;
