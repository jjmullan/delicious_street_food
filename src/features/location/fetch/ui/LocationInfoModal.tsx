import { useLocation } from '@app/store/locationStore';
import useFetchFavorite from '@features/favorite/fetch/hooks/useFetchFavorite';
import { calculateDistanceFromLocation } from '@features/location/create/utils/validateLocationDistance';
import { characterImages } from '@features/product/item/libs/item';
import useFetchReviewImagesByLocation from '@features/review/fetch/hook/useFetchReviewImagesByLocation';
import useFetchReviewsByLocation from '@features/review/fetch/hook/useFetchReviewsByLocation';
import { PopoverClose } from '@radix-ui/react-popover';
import foodstall from '@shared/assets/character/foodstall.svg';
import { getRandomArrayItem } from '@shared/lib/utils';
import type { Location } from '@shared/types/types';
import { Popover, PopoverContent, PopoverTrigger } from '@shared/ui/shadcn/popover';
import type { Session } from '@supabase/supabase-js';
import { CameraIcon, HeartIcon, MessageCircleMoreIcon } from 'lucide-react';
import { Activity, useMemo } from 'react';
import { Link, useOutletContext } from 'react-router';

function LocationInfoModal({
	location_id,
	latitude,
	longitude,
	location_name,
	product_name_en,
}: Partial<Location> & { product_name_en?: string }) {
	// 현재 로그인한 사용자 정보 가져오기
	const { session } = useOutletContext<{ session: Session }>();
	const current_user_id = session?.user?.id;

	// 데이터 패칭
	const { data: fetchReviewImages, isPending: isFetchReviewImagesPending } = useFetchReviewImagesByLocation(
		location_id!
	);
	const { data: fetchReviews, isPending: isFetchReviewsPending } = useFetchReviewsByLocation(location_id!);
	const { data: fetchFavorites, isPending: isFetchFavoritesPending } = useFetchFavorite(location_id!);

	// 내가 해당 장소에 즐겨찾기 등록을 했는지 여부를 검증
	const isFavorited = useMemo(() => {
		if (!fetchFavorites || !current_user_id) return false;
		return fetchFavorites.some((favorite) => favorite.user_id === current_user_id);
	}, [fetchFavorites, current_user_id]);

	// 현재 위치와 장소와의 위치를 계산
	const location = useLocation();
	const distance = calculateDistanceFromLocation({ lat: Number(latitude), lng: Number(longitude) }, location);
	const fotmattedDistance = distance > 1000 ? `${(distance / 1000).toFixed(1)}km` : `${distance.toFixed()}m`;

	// 임의의 후기 이미지 선택
	const randomReviewImage = useMemo(() => {
		return getRandomArrayItem(fetchReviewImages || []);
	}, [fetchReviewImages]);

	// Pending 통합 상태 관리
	const isPending = isFetchReviewImagesPending || isFetchReviewsPending || isFetchFavoritesPending;

	return (
		<Popover>
			<PopoverTrigger>
				{/* 기본 아이콘 */}
				<div className="relative cursor-pointer">
					<div className="relative w-7 h-7 flex flex-col items-center justify-center">
						<div className="absolute inset-[-8px] rounded-full bg-gradient-location p-1" />
						<div className={`absolute inset-0 rounded-full m-1 z-1 flex items-center justify-center`}>
							<img
								src={product_name_en ? characterImages[product_name_en] : foodstall}
								alt="포장마차"
								className="w-7 h-7 object-contain"
							/>
						</div>
						{/* 즐겨찾기 배지 */}
						{isFavorited && (
							<div className="absolute -top-4 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center shadow-sm z-10">
								<HeartIcon width={10} height={10} fill="white" stroke="white" strokeWidth={1.8} />
							</div>
						)}
					</div>
				</div>
			</PopoverTrigger>
			<PopoverContent className="flex w-fit flex-col justify-center items-center p-0 text-sm">
				<PopoverClose asChild>
					<div className="flex flex-col justify-center rounded-md shadow-md w-fit">
						<Link
							to={`/location/${location_id}/home`}
							className="flex flex-col justify-center gap-y-2 items-center p-2 rounded-md shadow-md"
						>
							{/* 대표 이미지 */}
							<div className="relative w-full h-24">
								<Activity mode={randomReviewImage ? 'visible' : 'hidden'}>
									<img
										src={randomReviewImage?.review_image_url}
										alt="후기 이미지"
										className="absolute inset-0 w-full h-full object-cover rounded-md border-2 border-brown-main"
									/>
								</Activity>
								<Activity mode={!randomReviewImage ? 'visible' : 'hidden'}>
									<div className="absolute inset-0 bg-gray-100 border-2 border-gray-400 rounded-md flex flex-col text-[10px] items-center justify-center gap-y-1">
										<CameraIcon />
										<p>이미지가 없습니다</p>
									</div>
								</Activity>
							</div>
							<div className="flex flex-col items-center justify-center text-sm">
								<Activity mode={location_name ? 'visible' : 'hidden'}>
									<p className="font-medium">{location_name}</p>
								</Activity>
								<Activity mode={location_name ? 'hidden' : 'visible'}>
									<p className="text-muted-foreground">포장마차</p>
								</Activity>
								<div className="flex justify-center items-center gap-x-0.5">
									{/* <MousePointer2Icon width={14} height={14} strokeWidth={1.8} className="scale-x-[-1]" /> */}
									<p className="text-xs px-2">현재 위치로부터 {fotmattedDistance}</p>
								</div>
							</div>
							{/* 후기 & 즐겨찾기 */}
							<div className="flex justify-center items-center gap-x-2 w-full text-sm border-t pt-2">
								<div className="flex gap-x-1 items-center">
									<MessageCircleMoreIcon width={16} height={16} />
									<p>{fetchReviews && fetchReviews.length! >= 100 ? 99 : fetchReviews?.length}</p>
								</div>
								<div className="flex gap-x-1 items-center">
									<HeartIcon width={16} height={16} className={isFavorited ? 'fill-red-500' : ''} />
									<p>{fetchFavorites && fetchFavorites.length >= 100 ? 99 : fetchFavorites?.length}</p>
								</div>
							</div>
						</Link>
						{/* <Link
							to={`/location/${location_id}/review/new`}
							className="flex gap-x-1.5 justify-center items-center text-sm p-3 border-t"
						>
							<PenBoxIcon width={12} height={12} />
							<p>후기 작성하기</p>
						</Link> */}
					</div>
				</PopoverClose>
			</PopoverContent>
		</Popover>
	);
}

export default LocationInfoModal;
