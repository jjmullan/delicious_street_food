import { Link } from 'react-router';
import UserProfileButton from '@/entities/user/ui/UserProfileButton';
import ItemListButton from '@/shared/ui/button/MenuButton';

function LoggedInUserOnlyHeader() {
	return (
		<header className="flex justify-between items-center h-15 absolute bottom-0 text-lg w-full z-1 px-4 glass">
			<ItemListButton />
			<h1 className="text-center text-2xl font-EbsHunminjeongeum">
				<Link to={'/'}>포장맛차</Link>
			</h1>
			<UserProfileButton />
		</header>
	);
}

export default LoggedInUserOnlyHeader;
