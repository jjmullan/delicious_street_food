import { Link } from 'react-router';
import SignOutButton from '@/features/auth/signOut/ui/SignOutButton';
import ItemListButton from '@/shared/ui/button/MenuButton';

function LoggedInUserOnlyHeader() {
	return (
		<header className="flex justify-between items-center h-12 absolute top-2 text-lg left-2 w-[calc(100%-16px)] z-1 px-4 rounded-full glass">
			<ItemListButton />
			<h1 className="text-center text-2xl font-EbsHunminjeongeum">
				<Link to={'/'}>포장맛차</Link>
			</h1>
			<SignOutButton />
		</header>
	);
}

export default LoggedInUserOnlyHeader;
