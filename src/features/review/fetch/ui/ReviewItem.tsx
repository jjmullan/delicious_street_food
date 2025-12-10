import { CalendarDaysIcon, PackageOpenIcon } from 'lucide-react';
import useFecthUserData from '@/features/user/fetch/hooks/useFecthUserData';
import { formatTimeAgo, getDateTimeKo } from '@/shared/lib/day';
import type { Review } from '@/shared/types/types';

function ReviewItem({ user_id, review_title, review_text, visit_datetime, created_at }: Review) {
	const { data: fetchUser, isPending: isFetchUserPending } = useFecthUserData(user_id);
	const nickname = fetchUser?.nickname;
	const createDatetime = formatTimeAgo(created_at);
	const visitDatetime = getDateTimeKo(new Date(visit_datetime).getTime());

	// Pending 상태 통합 관리
	const isPending = isFetchUserPending;

	return (
		<div className="px-3 py-4 border-b flex flex-col gap-y-3">
			{/* 작성자, 작성일 */}
			<div className="flex items-center gap-x-1.5">
				<p className="text-xs font-semibold text-muted-foreground">{nickname}</p>
				<p className="text-xs text-muted-foreground">{createDatetime}</p>
			</div>
			{/* 후기 이미지 */}
			<div className="">
				<div className="w-18 h-18 border"></div>
			</div>
			{/* 후기 제목, 내용 */}
			<div className="flex flex-col">
				<h3 className="text-base font-semibold">{review_title !== '' ? review_title : '제목 없음'}</h3>
				<div className="text-sm">{review_text}</div>
			</div>
			{/* 구매 상품, 방문일자 */}
			<div className="flex flex-col gap-y-2">
				<div className="flex flex-col gap-x-2 text-xs">
					<div className="flex items-center gap-x-1">
						<PackageOpenIcon width={14} />
						<p className="font-medium">구매 상품</p>
					</div>
					<div className="flex gap-x-1">
						<p className="">붕어빵</p>
						<p>1개</p>
						<p>1000원</p>
					</div>
				</div>
				<div className="flex flex-col gap-x-2 text-xs">
					<div className="flex items-center gap-x-1">
						<CalendarDaysIcon width={14} />
						<p className="font-medium">방문 날짜</p>
					</div>
					<p className="">{visitDatetime}</p>
				</div>
			</div>
		</div>
	);
}

export default ReviewItem;
