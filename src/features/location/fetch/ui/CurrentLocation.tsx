import { TriangleIcon } from 'lucide-react';
import LocationFinder from '@/features/location/fetch/ui/LocationFinder';

function CurrentLocation() {
	return (
		<div className="relative flex flex-col items-center gap-y-1">
			<TriangleIcon className="rotate-180 w-3 h-3 fill-red animate-bounce absolute top-[-16px]" />
			<LocationFinder bgColorCode="0" />
		</div>
	);
}

export default CurrentLocation;
