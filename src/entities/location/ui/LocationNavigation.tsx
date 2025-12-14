import { Link } from 'react-router';

function LocationNavigation({ location_id }: { location_id: string }) {
	const href = window.location.pathname.split('/');
	const isHome = href.includes('home');
	const isReviewAll = href.includes('review') && href.includes('all');
	const isReviewPhoto = href.includes('review') && href.includes('photo');

	return (
		<nav className="mt-12 fixed full-width bg-[#fff] z-2">
			<ul className="flex justify-between">
				<li className={`flex-1 flex justify-center py-3 border-b-2 ${isHome && 'border-brown-main'}`}>
					<h3>
						<Link to={`/location/${location_id}/home`}>홈</Link>
					</h3>
				</li>
				<li className={`flex-1 flex justify-center py-3 border-b-2 ${isReviewAll && 'border-brown-main'}`}>
					<h3>
						<Link to={`/location/${location_id}/review/all`}>후기</Link>
					</h3>
				</li>
				<li className={`flex-1 flex justify-center py-3 border-b-2 ${isReviewPhoto && 'border-brown-main'}`}>
					<h3>
						<Link to={`/location/${location_id}/review/photo`}>사진</Link>
					</h3>
				</li>
			</ul>
		</nav>
	);
}

export default LocationNavigation;
