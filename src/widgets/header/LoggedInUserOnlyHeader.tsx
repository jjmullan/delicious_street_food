import { Link } from 'react-router';
import SignOutButton from '@/features/auth/signOut/ui/signOutButton';

function LoggedInUserOnlyHeader() {
	return (
		<header className="flex justify-between items-center h-12 absolute top-2 text-lg left-2 w-[calc(100%-16px)] z-1 bg-white/80 px-4 rounded-full">
			<div className="w-20 flex justify-start"></div>
			<h1 className="text-center">
				<Link to={'/'}>포장맛차</Link>
			</h1>
			<SignOutButton />
		</header>
	);
}

export default LoggedInUserOnlyHeader;
