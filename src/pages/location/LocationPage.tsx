import { useParams } from 'react-router';
import Location from '@/entities/location/ui/Location';
import useFetchLocation from '@/features/location/fetch/hooks/useFetchLocation';
import LoggedInDetailHeader from '@/widgets/header/LoggedInDetailHeader';

function LocationPage() {
	// 포장마차 위치 정보 가져오기
	const param = useParams();
	const location_id = param.locationId;
	const { data: fetchLocation } = useFetchLocation(location_id!);
	const location_name = fetchLocation?.location_name ?? '포장마차';

	return (
		<>
			<LoggedInDetailHeader title={location_name} />
			<Location {...fetchLocation} />
		</>
	);
}

export default LocationPage;
