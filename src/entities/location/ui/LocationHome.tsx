import LocationMap from '@entities/map/ui/LocationMap';
import ToggleFavoriteButton from '@features/favorite/toggle/ui/ToggleFavoriteButton';
import useFetchLocation from '@features/location/fetch/hooks/useFetchLocation';
import LocationFinder from '@features/location/fetch/ui/LocationFinder';
import LocationProductItem from '@features/location/fetch/ui/LocationProductItem';
import { getFullLocationAddress } from '@features/location/fetch/utils/getLocationAddress';
import useFetchProducts from '@features/product/item/hooks/useFetchProducts';
import useFetchReviewProductsByLocation from '@features/review/fetch/hook/useFetchReviewProductsByLocation';
import useFetchReviewsByLocation from '@features/review/fetch/hook/useFetchReviewsByLocation';
import useFecthUserData from '@features/user/fetch/hooks/useFecthUserData';
import { getDateTimeKo } from '@shared/lib/day';
import ShareLocationButton from '@shared/ui/button/ShareLocationButton';
import Separator from '@shared/ui/separator/Separator';
import type { Session } from '@supabase/supabase-js';
import { ClockIcon, FrownIcon, HatGlassesIcon, MapPinIcon, StoreIcon } from 'lucide-react';
import { Activity, useEffect, useMemo } from 'react';
import { CustomOverlayMap } from 'react-kakao-maps-sdk';
import { useOutletContext, useParams } from 'react-router';

function LocationHome() {
	// context 로 session 받아오기
	const { session } = useOutletContext<{ session: Session }>();

	// Param 에서 location_id 추출
	const param = useParams();
	const location_id = param.locationId;

	// location_id 로 위치 전체 데이터, 위치별 후기 데이터, 위치별 후기 상품 목록 데이터 추출
	const { data: fetchLocation, isPending: isFetchLocationPending } = useFetchLocation(location_id!);
	const { data: fetchReviews, isPending: isFetchReviewsPending } = useFetchReviewsByLocation(location_id!);
	const { data: fetchReviewProducts, isPending: isFetchReviewProductsPending } = useFetchReviewProductsByLocation(
		location_id!
	);

	// 위치 상세 데이터 추출
	const location_name = fetchLocation?.location_name;
	const location_creator_id = fetchLocation?.user_id;

	// 현재 로그인한 사용자 ID (즐겨찾기 기능에 사용)
	const current_user_id = session?.user?.id;

	// 중복 제거된 unique product_id 추출 및 product_name_ko 오름차순 정렬
	const { data: fetchProducts, isPending: isFetchProductsPending } = useFetchProducts();
	const uniqueProductIds = useMemo(() => {
		if (!fetchReviewProducts || !fetchProducts) return [];

		const productIdSet = new Set(fetchReviewProducts.map((rp) => rp.product_id));
		const uniqueIds = Array.from(productIdSet);

		// product_name_ko 기준 오름차순 정렬
		return uniqueIds.sort((a, b) => {
			const productA = fetchProducts.find((p) => p.product_id === a);
			const productB = fetchProducts.find((p) => p.product_id === b);

			if (!productA || !productB) return 0;
			return productA.product_name_ko.localeCompare(productB.product_name_ko);
		});
	}, [fetchReviewProducts, fetchProducts]);

	// 가장 많이 주문된 product_id 찾기
	const mostPopularProductId = useMemo(() => {
		if (!fetchReviewProducts || fetchReviewProducts.length === 0) return null;

		// product_id별 등장 횟수 계산
		const productCountMap = new Map<string, number>();
		fetchReviewProducts.forEach((rp) => {
			const count = productCountMap.get(rp.product_id) || 0;
			productCountMap.set(rp.product_id, count + 1);
		});

		// 가장 많이 등장한 product_id 찾기
		let maxCount = 0;
		let popularProductId: string | null = null;

		productCountMap.forEach((count, productId) => {
			if (count > maxCount) {
				maxCount = count;
				popularProductId = productId;
			}
		});

		return popularProductId;
	}, [fetchReviewProducts]);

	// 날짜 데이터 추출
	const created_at = fetchLocation?.created_at ?? Date.now();
	const updated_at = fetchLocation?.updated_at ?? Date.now();
	const lastProductUpdated = fetchReviews?.at(-1)?.created_at ?? created_at;
	const created_at_ko = getDateTimeKo({ date: created_at, isTimeIncluding: false });
	const updated_at_ko = getDateTimeKo({ date: updated_at, isTimeIncluding: false });
	const lastProductUpdated_ko = getDateTimeKo({ date: lastProductUpdated, isTimeIncluding: false });

	// 장소 생성자 유저 데이터 추출
	const { data: fetchUser, isPending: isFetchUserPending } = useFecthUserData(location_creator_id!);
	const nickname = fetchUser?.nickname;

	// 위도/경도 기반 주소 데이터 추출
	const lat = Number(fetchLocation?.latitude);
	const lng = Number(fetchLocation?.longitude);
	const address = getFullLocationAddress({ lat: lat!, lng: lng! });

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	// Pending 통합 상태 관리
	const isPending =
		isFetchLocationPending ||
		isFetchReviewsPending ||
		isFetchReviewProductsPending ||
		isFetchProductsPending ||
		isFetchUserPending;

	return (
		<Activity mode={isPending ? 'hidden' : 'visible'}>
			<div className="pb-3">
				{/* 버튼 */}
				<section className="flex gap-x-2 justify-center px-3 py-4">
					<ToggleFavoriteButton location_id={location_id!} user_id={current_user_id!} />
					<ShareLocationButton />
				</section>
				<Separator />
				{/* 메뉴 */}
				<section className="flex flex-col gap-y-3 p-5">
					<h4 className="text-lg font-semibold flex justify-between items-center">
						메뉴
						<span className="text-xs text-muted-foreground font-normal">{lastProductUpdated_ko} 업데이트</span>
					</h4>
					<div className="flex flex-col gap-y-2">
						<div className="flex flex-col items-start gap-y-2">
							{uniqueProductIds?.map((productId) => (
								<LocationProductItem
									key={productId}
									product_id={productId}
									isPopular={productId === mostPopularProductId}
								/>
							))}
							<Activity mode={uniqueProductIds.length === 0 ? 'visible' : 'hidden'}>
								<div className="flex items-center gap-x-2">
									<div className="flex items-center justify-center w-8">
										<FrownIcon width={16} height={16} strokeWidth={1.8} />
									</div>
									<p className="text-muted-foreground">작성된 후기가 없습니다</p>
								</div>
							</Activity>
						</div>
					</div>
				</section>
				<Separator />
				{/* 매장 정보 */}
				<section className="flex flex-col gap-y-3 p-5">
					<h4 className="text-lg font-semibold flex justify-between items-center">
						매장 정보
						<span className="text-xs text-muted-foreground font-normal">{updated_at_ko} 업데이트</span>
					</h4>
					<div className="flex flex-col gap-y-2">
						<div className="flex items-center gap-x-2">
							<div className="flex items-center justify-center w-8">
								<StoreIcon width={16} height={16} strokeWidth={1.8} />
							</div>
							{location_name ? <p>{location_name}</p> : <p className="text-muted-foreground">포장마차</p>}
						</div>
						<div className="flex items-center gap-x-2">
							<div className="flex items-center justify-center w-8">
								<ClockIcon width={16} height={16} strokeWidth={1.8} />
							</div>
							<p className="text-muted-foreground">운영시간</p>
						</div>
						<div className="flex items-center gap-x-2">
							<div className="flex items-center justify-center w-8">
								<MapPinIcon width={18} height={18} strokeWidth={1.8} />
							</div>
							<p>{address}</p>
						</div>
						<div className="flex items-center gap-x-2">
							<div className="flex items-center justify-center w-8">
								<HatGlassesIcon width={16} height={16} strokeWidth={1.8} />
							</div>
							<p>
								<span className="font-medium">{nickname}</span>
								&nbsp;
								<span className="text-sm">({created_at_ko})</span>
							</p>
						</div>
					</div>
				</section>
				{/* 지도 */}
				<section className="flex px-3 pb-50">
					<h4 className="sr-only">위치 정보</h4>
					<LocationMap lat={lat} lng={lng}>
						<CustomOverlayMap position={{ lat, lng }} clickable={true}>
							<LocationFinder is_my_location={false} {...location} />
						</CustomOverlayMap>
					</LocationMap>
				</section>
			</div>
		</Activity>
	);
}

export default LocationHome;
