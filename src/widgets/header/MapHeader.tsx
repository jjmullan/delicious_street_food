import { useIsCreateMode } from '@app/store/createLocationStore';
import ToggleSwitchLocationModeButton from '@features/location/ui/ToggleSwitchLocationModeButton';
import UserProfileModal from '@features/user/ui/UserProfileModal';
import HomeButton from '@shared/ui/button/HomeButton';

function MapHeader() {
	const isCreateMode = useIsCreateMode();

	return (
		<header
			className={`flex justify-around items-center fixed text-lg z-1 glass rounded-t-2xl bottom-0 full-width h-fit pb-1 scroll-y-hidden ${isCreateMode && 'bottom-[-56px]'}`}
		>
			<ToggleSwitchLocationModeButton />
			<HomeButton />
			<UserProfileModal />
		</header>
	);
}

export default MapHeader;
