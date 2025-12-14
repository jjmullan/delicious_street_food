import { TriangleIcon } from 'lucide-react';
import LocationFinder from '@/features/location/fetch/ui/LocationFinder';

/**
 * 클릭한 위치를 표시해주는 원형 컴포넌트
 * 현재 미사용 (251205)
 */
function CurrentLocation() {
	return (
		<div className="relative flex flex-col items-center gap-y-1">
			<TriangleIcon className="rotate-180 w-3 h-3 fill-red animate-bounce absolute top-[-16px] z-2" />
			<LocationFinder is_my_location={true} />
		</div>
	);
}

export default CurrentLocation;
