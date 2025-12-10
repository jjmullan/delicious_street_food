import ToggleSwitchLocationModeButton from '@/features/location/create/ui/ToggleSwitchLocationModeButton';
import UserProfileModal from '@/features/user/fetch/ui/UserProfileModal';
import HomeButton from '@/shared/ui/button/HomeButton';

function LoggedInMapHeader() {
	return (
		<div className="absolute top-3 left-1 z-1 flex flex-col gap-y-2">
			<header className="flex justify-around items-center fixed text-lg z-99 glass rounded-md bottom-1 w-[calc(100vw-8px)] max-w-[calc(768px-8px)] min-w-[calc(320px-8px)] h-fit">
				{/* <ItemListButton /> */}
				<ToggleSwitchLocationModeButton />
				<HomeButton />
				<UserProfileModal />
			</header>
		</div>
	);
}

export default LoggedInMapHeader;
