import { HomeButton, ToggleSwitchLocationModeButton, useIsCreateMode } from '@features/location';
import { UserProfileModal } from '@features/profile';

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
