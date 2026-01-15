import { useIsCreateMode } from '@app/store/createLocationStore';
import { signOut } from '@features/auth/api/auth';
import useFetchFavoriteByUser from '@features/favorite/hooks/useFetchFavoriteByUser';
import useFetchReviewsByUser from '@features/review/hooks/useFetchReviewsByUser';
import useFecthUserData from '@features/user/hooks/useFecthUserData';
import { PopoverClose } from '@radix-ui/react-popover';
import defaultavatar from '@shared/assets/character/defaultavatar.svg';
import { useSession } from '@shared/model/session';
import { Popover, PopoverContent, PopoverTrigger } from '@shared/ui/shadcn/components/popover';
import { HeartIcon, MessageCircleMoreIcon, UserCircle2 } from 'lucide-react';
import { Activity } from 'react';
import { Link } from 'react-router';

/**
 * 프로필 이미지를 클릭했을 때 제공하는 Popover 컴포넌트
 */
function UserProfileModal() {
	const session = useSession();

	const { data: fetchUser } = useFecthUserData(session?.user.id);
	const user_id = fetchUser?.user_id;
	const userNickname = fetchUser?.nickname;
	const userImage = fetchUser?.profile_image_url || defaultavatar;

	// 전체 Review 데이터에서 해당 유저의 데이터를 가져오기
	const { data: fetchReviewsByUser, isPending: isFetchReivewsByUserPending } = useFetchReviewsByUser(user_id!);
	const totalReviewCount = fetchReviewsByUser?.length;

	// 전체 Favorite 데이터에서 해당 유저의 데이터를 가져오기
	const { data: fetchFavoriteByUser, isPending: isFetchFavoriteByUserPending } = useFetchFavoriteByUser(user_id!);
	const totalFavoriteCount = fetchFavoriteByUser?.length;

	// 생성모드 유무
	const isCreateMode = useIsCreateMode();

	// Pending 통합 상태 관리
	const isPending = isFetchReivewsByUserPending || isFetchFavoriteByUserPending;

	return (
		<Popover>
			<PopoverTrigger>
				<Activity mode={isCreateMode ? 'hidden' : 'visible'}>
					<div className="w-18 h-18 flex justify-center items-center">
						<div className="flex flex-col items-center gap-y-1">
							{/* <img src={userImage} className="h-7 w-7 cursor-pointer rounded-full object-cover" alt="user profile" /> */}
							<UserCircle2 width={24} height={24} strokeWidth={1.8} />
							<p className="text-xs font-medium">마이페이지</p>
						</div>
					</div>
				</Activity>
			</PopoverTrigger>
			<PopoverContent className="flex w-fit flex-col justify-center items-center p-0 text-sm">
				<PopoverClose asChild>
					<Link to={`/mypage/home`}>
						<div className="flex flex-col justify-center gap-y-2 rounded-md shadow-md p-3 pt-4">
							{/* 프로필 */}
							<div className="flex flex-col justify-center gap-y-2 items-center">
								<div className="relative h-16 w-16">
									{/* (필요 시 추가) 리워드 이미지 */}
									{/* <div className="absolute inset-0 border rounded-full">
										<img src="" alt="reward" className="absolute inset-0" />
									</div> */}
									<img src={userImage} className="cursor-pointer rounded-full object-cover" alt="user profile" />
								</div>
								<div className="flex flex-col text-center">
									<p>{userNickname}</p>
								</div>
							</div>
							{/* 후기 & 즐겨찾기 */}
							<div className="px-4 flex gap-x-3 justify-center border-t pt-2">
								<div className="flex gap-x-1 items-center">
									<MessageCircleMoreIcon width={16} height={16} className="" />
									<p className="text-sm">{totalReviewCount}</p>
								</div>
								<div className="flex gap-x-1 items-center">
									<HeartIcon width={16} height={16} className="" />
									<p className="text-sm">{totalFavoriteCount}</p>
								</div>
							</div>
						</div>
					</Link>
				</PopoverClose>
				<PopoverClose asChild>
					<button type="button" className="hover:bg-muted cursor-pointer w-full py-2 text-xs" onClick={signOut}>
						로그아웃
					</button>
				</PopoverClose>
			</PopoverContent>
		</Popover>
	);
}

export default UserProfileModal;
