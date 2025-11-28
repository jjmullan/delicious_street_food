import { Link } from 'react-router';

function Header() {
	return (
		<header className="flex justify-center items-center px-4 h-15 text-lg">
			<h1 className="text-center">
				<Link to={'/'}>로고</Link>
			</h1>
		</header>
	);
}

export default Header;
