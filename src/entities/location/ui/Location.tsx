import LocationNavigation from '@/entities/location/ui/LocationNavigation';
import type { Location as LocationType } from '@/shared/types/types';

function Location({ location_id }: Partial<LocationType>) {
	return (
		<>
			{/* 네비게이션 */}
			<LocationNavigation location_id={location_id!} />
			<main className="p-3"></main>
		</>
	);
}

export default Location;
