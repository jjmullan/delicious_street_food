import { Navigate, Outlet, useParams } from 'react-router';
import { useSession } from '@/app/store/sessionStore';
import DetailHeader from '@/widgets/header/DetailHeader';
import LocationNavigation from '@/widgets/nav/LocationNavigation';

/**
 * 최초 서비스 접근 시, 로그인 페이지로 라우팅
 */
function LocationDetailLayout() {
	// 포장마차 위치 정보 가져오기
	const param = useParams();
	const location_id = param.locationId;

	// 세션 데이터가 없으면 강제 라우팅
	const session = useSession();
	if (!session) return <Navigate to={'/login'} replace={true} />;

	return (
		<div className="min-h-svh full-width">
			<DetailHeader title={'포장마차'} />
			<LocationNavigation location_id={location_id!} />
			<main className="relative mt-24">
				<Outlet />
			</main>
		</div>
	);
}

export default LocationDetailLayout;
