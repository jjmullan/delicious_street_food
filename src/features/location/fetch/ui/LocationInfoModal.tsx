import { PopoverClose } from '@radix-ui/react-popover';
import foodstall from '@shared/assets/character/foodstall.svg';
import { BookmarkIcon, CameraIcon, MessageCircleMoreIcon, PenBoxIcon } from 'lucide-react';
import { Activity, useMemo } from 'react';
import { Link } from 'react-router';
import useFetchFavorite from '@/features/favorite/fetch/hooks/useFetchFavorite';
import useFetchReviewImagesByLocation from '@/features/review/fetch/hook/useFetchReviewImagesByLocation';
import useFetchReviewsByLocation from '@/features/review/fetch/hook/useFetchReviewsByLocation';
import { getRandomArrayItem } from '@/shared/lib/utils';
import type { Location, User } from '@/shared/types/types';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/shadcn/popover';

function LocationInfoModal({ location_id }: Partial<Location> & { userData: Partial<User> }) {
	const { data: fetchReviewImages, isPending: isFetchReviewImagesPending } = useFetchReviewImagesByLocation(
		location_id!
	);
	const { data: fetchReviews, isPending: isFetchReviewsPending } = useFetchReviewsByLocation(location_id!);
	const { data: fetchFavorites, isPending: isFetchFavoritesPending } = useFetchFavorite(location_id!);

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
					<div className="relative w-7 h-7">
						<div className="absolute inset-[-8px] rounded-full bg-gradient-location p-1" />
						<div className={`absolute inset-0 rounded-full m-1 z-1 flex items-center justify-center`}>
							<img src={foodstall} alt="포장마차" className="w-7 h-7 object-contain" />
						</div>
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
							<div className="relative w-24 h-24">
								{/* 대표 이미지 */}
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
							<div className="flex justify-center items-center gap-x-2 w-full text-sm">
								<div className="flex gap-x-1 items-center">
									<MessageCircleMoreIcon width={16} height={16} />
									<p>{fetchReviews && fetchReviews.length! >= 100 ? 99 : fetchReviews?.length}</p>
								</div>
								<div className="flex gap-x-1 items-center">
									<BookmarkIcon width={16} height={16} />
									<p>{fetchFavorites && fetchFavorites.length >= 100 ? 99 : fetchFavorites?.length}</p>
								</div>
							</div>
						</Link>
						<Link
							to={`/location/${location_id}/review/new`}
							className="flex gap-x-1.5 justify-center items-center text-sm p-3 border-t"
						>
							<PenBoxIcon width={12} height={12} />
							<p>후기 작성하기</p>
						</Link>
					</div>
				</PopoverClose>
			</PopoverContent>
		</Popover>
	);
}

export default LocationInfoModal;
