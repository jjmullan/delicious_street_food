import { Link } from 'react-router';

function LocationNavigation({ location_id }: { location_id: string }) {
	return (
		<nav className="mt-12 fixed full-width bg-[#fff] z-2">
			<ul className="flex justify-between py-3 border-b">
				<li className="flex-1 flex justify-center">
					<h3>
						<Link to={`/location/${location_id}/home`}>홈</Link>
					</h3>
				</li>
				<li className="flex-1 flex justify-center">
					<h3>
						<Link to={`/location/${location_id}/review/all`}>후기</Link>
					</h3>
				</li>
				<li className="flex-1 flex justify-center">
					<h3>
						<Link to={`/location/${location_id}/review/photo`}>사진</Link>
					</h3>
				</li>
			</ul>
		</nav>
	);
}

export default LocationNavigation;
