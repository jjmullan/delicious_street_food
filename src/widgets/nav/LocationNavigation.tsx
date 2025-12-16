import { Activity } from 'react';
import { Link } from 'react-router';
import useFetchReviewImagesByLocation from '@/features/review/fetch/hook/useFetchReviewImagesByLocation';
import useFetchReviewsByLocation from '@/features/review/fetch/hook/useFetchReviewsByLocation';

function LocationNavigation({ location_id }: { location_id: string }) {
	// 현재 URL 경로 기반 동적 상태 변환
	const href = window.location.pathname.split('/');
	const isHome = href.includes('home');
	const isReviewAll = href.includes('review') && href.includes('all');
	const isReviewPhoto = href.includes('review') && href.includes('photo');

	// 전체 리뷰 수 UI 제공
	const { data: fetchReviews, isPending: isFetchReviewsPending } = useFetchReviewsByLocation(location_id);
	const { data: fetchReviewImages, isPending: isFetchReviewImagesPending } = useFetchReviewImagesByLocation(
		location_id!
	);
	const reviewCount = fetchReviews && fetchReviews.length > 99 ? '+99' : fetchReviews?.length;
	const imageCount = fetchReviewImages && fetchReviewImages.length > 99 ? '+99' : fetchReviewImages?.length;

	// Pending 통합 상태 관리
	const isPending = isFetchReviewsPending || isFetchReviewImagesPending;

	return (
		<Activity mode={isPending ? 'hidden' : 'visible'}>
			<nav className="mt-12 fixed full-width bg-[#fff] z-2">
				<ul className="flex justify-between">
					<li className={`flex-1 flex justify-center py-3 border-b-2 ${isHome && 'border-brown-main font-semibold'}`}>
						<h3>
							<Link to={`/location/${location_id}/home`}>홈</Link>
						</h3>
					</li>
					<li
						className={`flex-1 flex justify-center py-3 border-b-2 ${isReviewAll && 'border-brown-main font-semibold'}`}
					>
						<h3>
							<Link to={`/location/${location_id}/review/all`} className="flex items-center">
								후기&nbsp;<span className="text-sm">({reviewCount})</span>
							</Link>
						</h3>
					</li>
					<li
						className={`flex-1 flex justify-center py-3 border-b-2 ${isReviewPhoto && 'border-brown-main font-semibold'}`}
					>
						<h3>
							<Link to={`/location/${location_id}/review/photo`} className="flex items-center">
								사진&nbsp;<span className="text-sm">({imageCount})</span>
							</Link>
						</h3>
					</li>
				</ul>
			</nav>
		</Activity>
	);
}

export default LocationNavigation;
