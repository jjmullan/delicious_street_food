import LocationProvider from '@app/provider/LocationProvider';
import { useIsCreateMode } from '@app/store/createLocationStore';
import { useSession } from '@app/store/sessionStore';
import ResetCreateModeButton from '@features/location/ui/ResetCreateModeButton';
import MapHeader from '@widgets/header/MapHeader';
import { Activity } from 'react';
import { Navigate, Outlet } from 'react-router';

/**
 * 최초 서비스 접근 시, 로그인 페이지로 라우팅
 */
function MapLayout() {
	const isCreateMode = useIsCreateMode();
	const session = useSession();
	if (!session) return <Navigate to={'/login'} replace={true} />;
	return (
		<LocationProvider>
			<Outlet context={{ session }} />
			<Activity mode={isCreateMode ? 'visible' : 'hidden'}>
				<ResetCreateModeButton />
			</Activity>
			<MapHeader />
		</LocationProvider>
	);
}

export default MapLayout;
