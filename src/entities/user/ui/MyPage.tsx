import defaultavatar from '@shared/assets/character/defaultavatar.svg';
import type { Session } from '@supabase/supabase-js';
import { Edit2Icon, EditIcon } from 'lucide-react';
import { useOutletContext } from 'react-router';
import useFecthUserData from '@/features/user/fetch/hooks/useFecthUserData';
import Separator from '@/shared/ui/separator/Separator';
import { Button } from '@/shared/ui/shadcn/button';

function MyPage() {
	const { session } = useOutletContext<{ session: Session }>();
	const user_id = session.user.id;

	// 유저 정보 패칭
	const { data: fetchUser, isPending: isFetchUserPending } = useFecthUserData(user_id);
	const nickname = fetchUser?.nickname;
	const profile_image = fetchUser?.profile_image_url ?? defaultavatar;
	const bio = fetchUser?.bio ?? `한 줄 소개`;

	// Pending 상태 통합 관리
	const isPending = isFetchUserPending;

	return (
		<>
			<div className="p-6 flex flex-col justify-center items-center gap-y-4">
				{/* 프로필 이미지 */}
				<button type="button" className="relative h-28 w-28">
					<div className="absolute inset-0 border rounded-full">{/* 여기에 리워드 이미지 추가 */}</div>
					<img src={profile_image} className="cursor-pointer rounded-full object-cover" alt="user profile" />
				</button>
				{/* 프로필 설명 */}
				<div className="flex flex-col items-center">
					<div className="flex items-center relative">
						<p className="text-xl font-bold">{nickname}</p>
					</div>
					<div className="flex items-center relative">
						<p className="text-muted-foreground">{bio}</p>
					</div>
				</div>
				<Button type="button">프로필 수정</Button>
			</div>
			<Separator />
		</>
	);
}

export default MyPage;
