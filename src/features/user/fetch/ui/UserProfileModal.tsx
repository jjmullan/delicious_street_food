import { PopoverClose } from '@radix-ui/react-popover';
import defaultavatar from '@shared/assets/character/defaultavatar.svg';
import { BookmarkIcon, MessageCircleMoreIcon, UserCircle2 } from 'lucide-react';
import { Link } from 'react-router';
import { useSession } from '@/app/store/sessionStore';
import { signOut } from '@/features/auth/signOut/api/auth';
import useFecthUserData from '@/features/user/fetch/hooks/useFecthUserData';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/shadcn/popover';

/**
 * 프로필 이미지를 클릭했을 때 제공하는 Popover 컴포넌트
 */
function UserProfileModal() {
	const session = useSession();

	const { data } = useFecthUserData(session?.user.id);
	const userNickname = data?.nickname;
	const totalReviewCount = data?.total_review_count;
	const totalFavoriteCount = data?.total_favorite_count;
	const userImage = data?.profile_image_url || defaultavatar;

	return (
		<Popover>
			<PopoverTrigger>
				<div className="w-18 h-18 flex justify-center items-center">
					<div className="flex flex-col items-center gap-y-1">
						{/* <img src={userImage} className="h-7 w-7 cursor-pointer rounded-full object-cover" alt="user profile" /> */}
						<UserCircle2 width={24} height={24} strokeWidth={1.8} />
						<p className="text-xs font-medium">마이페이지</p>
					</div>
				</div>
			</PopoverTrigger>
			<PopoverContent className="flex w-fit flex-col justify-center items-center p-0 text-sm">
				<PopoverClose asChild>
					<Link to={`/mypage`}>
						<div className="flex flex-col justify-center gap-y-1 rounded-md shadow-md p-3 pt-4">
							<div className="flex flex-col justify-center gap-y-2 items-center">
								<div className="relative h-16 w-16">
									{/* 리워드 이미지 추가 */}
									<div className="absolute inset-0 border rounded-full">
										{/* <img src="" alt="reward" className="absolute inset-0" /> */}
									</div>
									{/* 프로필 이미지 */}
									<img src={userImage} className="cursor-pointer rounded-full object-cover" alt="user profile" />
								</div>
								<div className="flex flex-col text-center">
									<p>{userNickname}</p>
								</div>
							</div>
							<div className="px-4 flex gap-x-3 justify-center">
								{/* 리뷰 */}
								<div className="flex gap-x-1 items-center">
									<MessageCircleMoreIcon width={12} className="" />
									<p className="text-xs">{totalReviewCount}</p>
								</div>
								{/* 즐겨찾기 */}
								<div className="flex gap-x-1 items-center">
									<BookmarkIcon width={14} className="" />
									<p className="text-xs">{totalFavoriteCount}</p>
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
