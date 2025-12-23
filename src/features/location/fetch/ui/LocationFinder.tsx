import LocationInfoModal from '@features/location/fetch/ui/LocationInfoModal';
import useFecthUserData from '@features/user/fetch/hooks/useFecthUserData';
import defaultavatar from '@shared/assets/character/defaultavatar.svg';
import type { Location } from '@shared/types/types';

/**
 * 현재 위치를 표시해주는 원형 컴포넌트
 */
function LocationFinder({
	user_id,
	product_name_en,
	is_my_location,
	is_create_location,
	location,
}: { user_id?: string; product_name_en?: string; is_my_location: boolean; is_create_location?: boolean } & {
	location?: Partial<Location>;
}) {
	// 프로필 이미지 추출
	const { data: fetchUser, isPending: isFetchUserPending } = useFecthUserData(user_id);
	const profile_image_url = fetchUser?.profile_image_url;

	// Pending 통합 상태 관리
	const isPending = isFetchUserPending;

	return (
		<>
			{!isPending && is_my_location ? (
				<div className="relative w-8 h-8">
					{/* 항상 보이는 gradient border (가장 뒤) - 크기 증가 */}
					<div className="absolute inset-[-10px] rounded-full animate-show-border bg-gradient-me p-1" />
					{/* 펄스 애니메이션 링 (중간) */}
					<div className="absolute inset-[-2px] rounded-full animate-pulse-ring bg-gradient-marker-me p-1" />
					{/* 중앙 (가장 앞) */}
					<div className="absolute inset-0 rounded-full m-0.5 z-1 flex items-center justify-center w-7 h-7">
						<img
							src={profile_image_url ?? defaultavatar}
							alt="현재 내 위치"
							className="w-full h-full rounded-full object-cover"
						/>
					</div>
				</div>
			) : is_create_location ? (
				<div className="relative w-6 h-6">
					<div className="absolute inset-[-8px] rounded-full bg-gradient-location p-1" />
					<div className={`absolute inset-0 rounded-full m-1 z-1 flex items-center justify-center bg-brown-main`}></div>
				</div>
			) : (
				<LocationInfoModal product_name_en={product_name_en} {...location} />
			)}
		</>
	);
}

export default LocationFinder;
