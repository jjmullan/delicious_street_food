import UserProfileButton from '@/features/user/fetch/ui/UserProfileButton';
import HomeButton from '@/shared/ui/button/HomeButton';
import ItemListButton from '@/shared/ui/button/MenuButton';

function LoggedInUserOnlyHeader() {
	return (
		<header className="flex justify-around items-center h-15 absolute bottom-0 text-lg w-full z-1 px-4 glass">
			<ItemListButton />
			<HomeButton />
			<UserProfileButton />
		</header>
	);
}

export default LoggedInUserOnlyHeader;
