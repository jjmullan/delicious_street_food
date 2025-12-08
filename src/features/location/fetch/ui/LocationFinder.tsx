import defaultavatar from '@shared/assets/character/defaultavatar.svg';
import { useMap } from 'react-kakao-maps-sdk';
import LocationInfoModal from '@/features/location/fetch/ui/LocationInfoModal';
import useFecthUserData from '@/features/user/fetch/hooks/useFecthUserData';
import type { Location } from '@/shared/types/types';

/**
 * 현재 위치를 표시해주는 원형 컴포넌트
 */
function LocationFinder({
	is_my_location,
	location_id,
	user_Id,
	created_at,
	total_recommend_count,
	total_review_count,
	total_visit_count,
}: { is_my_location: boolean; user_Id?: string } & Partial<Location>) {
	const map = useMap();

	// 프로필 이미지 추출
	const { data } = useFecthUserData(user_Id);
	const userImage = data?.profile_image_url || defaultavatar;

	return (
		<>
			{is_my_location ? (
				<div className="relative w-8 h-8">
					{/* 항상 보이는 gradient border (가장 뒤) - 크기 증가 */}
					<div className="absolute inset-[-12px] rounded-full animate-show-border bg-gradient-me p-1" />

					{/* 펄스 애니메이션 링 (중간) */}
					<div className="absolute inset-0 rounded-full animate-pulse-ring bg-gradient-marker-me p-1" />

					{/* 중앙 (가장 앞) */}
					<div className={`absolute inset-0 rounded-full m-1 z-1 flex items-center justify-center`}>
						<img src={userImage} alt="포장마차" className="w-8 h-8 object-contain" />
					</div>
				</div>
			) : (
				<LocationInfoModal
					// onClick={(marker) => map.panTo(marker.getPosition())}
					userData={data!}
					location_id={location_id}
					created_at={created_at}
					total_recommend_count={total_recommend_count}
					total_review_count={total_review_count}
					total_visit_count={total_visit_count}
				/>
			)}
		</>
	);
}

export default LocationFinder;
