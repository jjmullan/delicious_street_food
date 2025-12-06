import { PopoverClose } from '@radix-ui/react-popover';
import foodstall from '@shared/assets/character/foodstall.svg';
import { CameraIcon, EyeIcon, ThumbsUpIcon } from 'lucide-react';
import { Link } from 'react-router';
import type { Location, User } from '@/shared/types/types';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/shadcn/popover';

function LocationInfoModal({
	userData,
	location_id,
	total_recommend_count,
	total_visit_count,
}: Partial<Location> & { userData: Partial<User> }) {
	return (
		<Popover>
			<PopoverTrigger>
				{/* 기본 아이콘 */}
				<div className="relative cursor-pointer">
					<div className="relative w-7 h-7">
						{/* 항상 보이는 gradient border (가장 뒤) - 크기 증가 */}
						<div className="absolute inset-[-12px] rounded-full animate-show-border bg-gradient-location p-1" />

						{/* 펄스 애니메이션 링 (중간) */}
						<div className="absolute inset-0 rounded-full animate-pulse-ring bg-gradient-marker-location p-1" />

						{/* 중앙 (가장 앞) */}
						<div className={`absolute inset-0 rounded-full m-1 z-1 flex items-center justify-center`}>
							<img src={foodstall} alt="포장마차" className="w-7 h-7 object-contain" />
						</div>
					</div>
				</div>
			</PopoverTrigger>
			<PopoverContent className="flex w-fit flex-col justify-center items-center p-0 text-sm">
				<PopoverClose asChild>
					<Link to={`/location/${location_id}`}>
						<div className="flex flex-col justify-center gap-y-3 rounded-md shadow-md pt-4 pb-3 px-3 w-fit">
							<div className="flex flex-col justify-center gap-y-2 items-center">
								<div className="relative w-24 h-20">
									{/* 대표 이미지 */}
									<div className="absolute inset-0 bg-gray-100 border-2 border-gray-400 rounded-md flex flex-col text-[10px] items-center justify-center gap-y-1">
										<CameraIcon />
										<p>이미지가 없습니다</p>
									</div>
									{/* <img src={} className="cursor-pointer rounded-full object-cover" alt="user profile" /> */}
								</div>
							</div>
							<div className="flex gap-x-3 justify-center text-xs">
								{/* 방문 */}
								<div className="flex gap-x-1 items-center">
									<EyeIcon width={12} height={12} />
									<p>{total_visit_count}</p>
								</div>
								{/* 추천 */}
								<div className="flex gap-x-1 items-center">
									<ThumbsUpIcon width={12} height={12} />
									<p>{total_recommend_count}</p>
								</div>
							</div>
						</div>
					</Link>
				</PopoverClose>
			</PopoverContent>
		</Popover>
	);
}

export default LocationInfoModal;
