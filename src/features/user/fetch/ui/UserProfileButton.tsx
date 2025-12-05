import { PopoverClose } from '@radix-ui/react-popover';
import { Link } from 'react-router';
import { useSession } from '@/app/store/sessionStore';
import { signOut } from '@/features/auth/signOut/api/auth';
import useFecthUserData from '@/features/user/fetch/hooks/useFecthUserData';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/shadcn/popover';
import defaultavatar from '/character/defaultavatar.svg';

/**
 * 프로필 이미지를 클릭했을 때 제공하는 Popover 컴포넌트
 */
function UserProfileButton() {
	const session = useSession();
	const { data } = useFecthUserData(session?.user.id);
	const userImage = data?.profile_image_url || defaultavatar;

	return (
		<Popover>
			<PopoverTrigger>
				<div className="w-12 h-15 flex justify-center items-center">
					<img src={userImage} className="h-7 w-7 cursor-pointer rounded-full object-cover" alt="user profile" />
				</div>
			</PopoverTrigger>
			<PopoverContent className="flex w-24 flex-col justify-center items-center p-0 text-sm">
				<PopoverClose asChild>
					<Link
						to={`/mypage/${session!.user.id}`}
						className="flex flex-col justify-center gap-y-2 items-center px-4 py-3"
					>
						<img src={userImage} className="h-12 w-12 cursor-pointer rounded-full object-cover" alt="user profile" />
						<div className="hover:bg-muted cursor-pointer">마이페이지</div>
					</Link>
				</PopoverClose>
				<PopoverClose asChild>
					<button type="button" className="hover:bg-muted cursor-pointer px-4 py-3 border-t" onClick={signOut}>
						로그아웃
					</button>
				</PopoverClose>
			</PopoverContent>
		</Popover>
	);
}

export default UserProfileButton;
