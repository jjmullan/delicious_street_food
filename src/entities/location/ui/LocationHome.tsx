import {
	BookmarkIcon,
	ClockIcon,
	MapPinIcon,
	Share2Icon,
	StoreIcon,
	ThumbsUpIcon,
	UserCircle2Icon,
} from 'lucide-react';
import { Activity } from 'react';
import { CustomOverlayMap } from 'react-kakao-maps-sdk';
import { useParams } from 'react-router';
import LocationMap from '@/entities/map/ui/LocationMap';
import useFetchLocation from '@/features/location/fetch/hooks/useFetchLocation';
import LocationFinder from '@/features/location/fetch/ui/LocationFinder';
import { getFullLocationAddress } from '@/features/location/fetch/utils/getLocationAddress';
import useFetchReviewsByLocation from '@/features/review/fetch/hook/useFetchReviewsByLocation';
import useFecthUserData from '@/features/user/fetch/hooks/useFecthUserData';
import Separator from '@/shared/ui/separator/Separator';

function LocationHome() {
	const param = useParams();
	const location_id = param.locationId;
	const { data: fetchLocation, isPending: isFetchLocationPending } = useFetchLocation(location_id!);
	const { data: fetchReviews, isPending: isFetchReviewsPending } = useFetchReviewsByLocation(location_id!);

	// 위치 상세 데이터 추출
	const location_name = fetchLocation?.location_name;
	const recommend_count = fetchLocation?.total_recommend_count;
	const bookmark_count = fetchLocation?.total_favorite_count;
	const user_id = fetchLocation?.user_id;

	// 유저 데이터 추출
	const { data: fetchUser, isPending: isFetchUserPending } = useFecthUserData(user_id!);
	const nickname = fetchUser?.nickname;

	// 위도/경도 기반 주소 데이터 추출
	const lat = Number(fetchLocation?.latitude);
	const lng = Number(fetchLocation?.longitude);
	const address = getFullLocationAddress({ lat: lat!, lng: lng! });

	// Pending 통합 상태 관리
	const isPending = isFetchLocationPending || isFetchReviewsPending;

	return (
		<Activity mode={isPending ? 'hidden' : 'visible'}>
			<div className="pb-3">
				<section className="flex pt-3 pb-1">
					<div className="flex-1 flex flex-col items-center justify-center py-3 gap-y-1.5">
						<p className="text-2xl">{recommend_count}</p>
						<button type="button" className="flex justify-center items-center gap-x-1.5 px-2 py-1 rounded-md">
							<ThumbsUpIcon width={16} height={16} strokeWidth={1.5} />
							<p className="text-sm">추천</p>
						</button>
					</div>
					<div className="flex-1 flex flex-col items-center justify-center py-3 gap-y-1.5">
						<p className="text-2xl">{bookmark_count}</p>
						<button type="button" className="flex justify-center items-center gap-x-1.5 px-2 py-1 rounded-md">
							<BookmarkIcon width={16} height={16} strokeWidth={1.5} />
							<p className="text-sm">저장</p>
						</button>
					</div>
					<div className="flex-1 flex flex-col items-center justify-center py-3 gap-y-1.5">
						<p className="text-2xl">{recommend_count}</p>
						<button type="button" className="flex justify-center items-center gap-x-1.5 px-2 py-1 rounded-md">
							<Share2Icon width={16} height={16} strokeWidth={1.5} />
							<p className="text-sm">공유</p>
						</button>
					</div>
				</section>
				<Separator />
				<section className="flex flex-col gap-y-3 p-3">
					<div className="">
						<div className="flex items-center justify-center gap-x-1 full-width border py-2 rounded-md">
							<UserCircle2Icon width={16} height={16} strokeWidth={1.8} />
							<p className="text-xs">
								<span className="font-semibold">{nickname}</span>&nbsp;님이 처음 발견했어요!
							</p>
						</div>
					</div>
					<div className="flex flex-col gap-y-2">
						<div className="flex items-center gap-x-2">
							<div className="flex items-center justify-center w-6">
								<StoreIcon width={16} height={16} strokeWidth={1.8} />
							</div>
							{location_name ? <p>{location_name}</p> : <p className="text-muted-foreground">포장마차</p>}
						</div>
						<div className="flex items-center gap-x-2">
							<div className="flex items-center justify-center w-6">
								<ClockIcon width={16} height={16} strokeWidth={1.8} />
							</div>
							<p className="text-muted-foreground">운영시간</p>
						</div>
						<div className="flex items-center gap-x-2">
							<div className="flex items-center justify-center w-6">
								<MapPinIcon width={18} height={18} strokeWidth={1.8} />
							</div>
							<p>{address}</p>
						</div>
					</div>
					<LocationMap lat={lat} lng={lng}>
						<CustomOverlayMap position={{ lat, lng }} clickable={true}>
							<LocationFinder is_my_location={false} {...location} />
						</CustomOverlayMap>
					</LocationMap>
				</section>
			</div>
		</Activity>
	);
}

export default LocationHome;
