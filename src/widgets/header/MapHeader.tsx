import ToggleSwitchLocationModeButton from '@/features/location/create/ui/ToggleSwitchLocationModeButton';
import UserProfileModal from '@/features/user/fetch/ui/UserProfileModal';
import HomeButton from '@/shared/ui/button/HomeButton';

function MapHeader() {
	return (
		<header className="flex justify-around items-center h-15 fixed bottom-0 text-lg w-full z-99 px-4 glass max-w-[768px]">
			{/* <ItemListButton /> */}
			<ToggleSwitchLocationModeButton />
			<HomeButton />
			<UserProfileModal />
		</header>
	);
}

export default MapHeader;
