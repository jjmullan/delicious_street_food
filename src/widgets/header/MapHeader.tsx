import { useIsCreateMode } from '@features/location/model/createLocation';
import HomeButton from '@features/location/ui/HomeButton';
import ToggleSwitchLocationModeButton from '@features/location/ui/ToggleSwitchLocationModeButton';
import UserProfileModal from '@features/profile/ui/UserProfileModal';

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
