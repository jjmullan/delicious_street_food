import { Link, useParams } from 'react-router';
import useFetchLocation from '@/features/location/fetch/hooks/useFetchLocation';
import LoggedInDetailHeader from '@/widgets/header/LoggedInDetailHeader';

function LocationPage() {
	// 포장마차 위치 정보 가져오기
	const param = useParams();
	const location_id = param.locationId;

	// 포장마차 상세 위치 정보 가져오기
	const { data: fetchLocation, isPending: isFetchLocationPending } = useFetchLocation(location_id!);
	const location_name = fetchLocation?.location_name ?? '포장마차';

	// Pending 통합 상태 관리
	const isPending = isFetchLocationPending;

	return (
		<>
			<LoggedInDetailHeader title={location_name} />
			<main className="mt-12 p-3">
				<Link to={`/location/${location_id}/review/all`}>리뷰 목록</Link>
				<Link to={`/location/${location_id}/review/new`}>리뷰 작성</Link>
			</main>
		</>
	);
}

export default LocationPage;
