import { Navigate, Outlet, useParams } from 'react-router';
import { useSession } from '@/app/store/sessionStore';
import useFetchLocation from '@/features/location/fetch/hooks/useFetchLocation';
import LoggedInDetailHeader from '@/widgets/header/LoggedInDetailHeader';
import LocationNavigation from '@/widgets/nav/LocationNavigation';

/**
 * 최초 서비스 접근 시, 로그인 페이지로 라우팅
 */
function DetailLayout() {
	// 포장마차 위치 정보 가져오기
	const param = useParams();
	const location_id = param.locationId;
	const { data: fetchLocation } = useFetchLocation(location_id!);
	const location_name = fetchLocation?.location_name ?? '포장마차';

	// 세션 데이터가 없으면 강제 라우팅
	const session = useSession();
	if (!session) return <Navigate to={'/login'} replace={true} />;

	return (
		<div className="min-h-svh full-width">
			<LoggedInDetailHeader title={location_name} />
			<LocationNavigation location_id={location_id!} />
			<main className="relative mt-24">
				<Outlet />
			</main>
		</div>
	);
}

export default DetailLayout;
