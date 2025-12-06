import UserProfileModal from '@/features/user/fetch/ui/UserProfileModal';
import HomeButton from '@/shared/ui/button/HomeButton';
import ItemListButton from '@/shared/ui/button/MenuButton';

function LoggedInUserOnlyHeader() {
	return (
		<header className="flex justify-around items-center h-15 fixed bottom-0 text-lg w-full z-99 px-4 glass">
			<ItemListButton />
			<HomeButton />
			<UserProfileModal />
		</header>
	);
}

export default LoggedInUserOnlyHeader;
