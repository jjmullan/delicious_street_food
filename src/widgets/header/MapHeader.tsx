import ToggleSwitchLocationModeButton from '@/features/location/create/ui/ToggleSwitchLocationModeButton';
import UserProfileModal from '@/features/user/fetch/ui/UserProfileModal';
import HomeButton from '@/shared/ui/button/HomeButton';

function MapHeader() {
	return (
		<div className="absolute top-3 left-3 z-1 flex flex-col gap-y-2">
			<header className="flex justify-around items-center fixed text-lg z-99 glass rounded-md bottom-3 w-[calc(100vw-24px)] max-w-[calc(768px-24px)] min-w-[calc(320px-24px)] h-fit">
				{/* <ItemListButton /> */}
				<ToggleSwitchLocationModeButton />
				<HomeButton />
				<UserProfileModal />
			</header>
		</div>
	);
}

export default MapHeader;
