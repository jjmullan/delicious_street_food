import ToggleSwitchLocationModeButton from '@/features/location/create/ui/ToggleSwitchLocationModeButton';
import UserProfileModal from '@/features/user/fetch/ui/UserProfileModal';
import HomeButton from '@/shared/ui/button/HomeButton';

function LoggedInMapHeader() {
	return (
		<header className="flex justify-around items-center fixed text-lg z-99 glass rounded-t-2xl bottom-0 w-full h-fit pb-3">
			{/* <ItemListButton /> */}
			<ToggleSwitchLocationModeButton />
			<HomeButton />
			<UserProfileModal />
		</header>
	);
}

export default LoggedInMapHeader;
