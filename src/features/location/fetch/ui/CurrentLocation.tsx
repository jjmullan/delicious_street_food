import { TriangleIcon } from 'lucide-react';
import LocationFinder from '@/features/location/fetch/ui/LocationFinder';

function CurrentLocation() {
	return (
		<div className="flex flex-col items-center gap-y-1">
			<TriangleIcon className="rotate-180 w-4 h-4 fill-[#e35c18] animate-bounce" />
			<LocationFinder bgColor="black" />
		</div>
	);
}

export default CurrentLocation;
