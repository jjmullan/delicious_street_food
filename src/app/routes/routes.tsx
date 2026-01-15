import { createReviewRoutes } from '@app/routes/createReview.route';
import { globalMapRoutes } from '@app/routes/globalMap.route';
import { locationDetailRoutes } from '@app/routes/locationDetail.route';
import { unloggedInRoute } from '@app/routes/unloggedIn.route';
import { userDetailRoutes } from '@app/routes/userDetail.route';
import GlobalError from '@pages/GlobalError';
import CreateReviewLayout from '@widgets/layout/CreateReviewLayout';
import GlobalLayout from '@widgets/layout/GlobalLayout';
import LocationDetailLayout from '@widgets/layout/LocationDetailLayout';
import MapLayout from '@widgets/layout/MapLayout';
import UnloggedInLayout from '@widgets/layout/UnloggedInLayout';
import UserDetailLayout from '@widgets/layout/UserDetailLayout';
import { createBrowserRouter } from 'react-router-dom';

/**
 * 애플리케이션의 라우트 설정
 * createBrowserRouter를 사용하여 브라우저 히스토리 기반 라우팅을 구성합니다.
 *
 * 구조:
 * - element: Layout - 전역 레이아웃 컴포넌트 (헤더, 푸터 등)
 * - errorElement: GlobalError - 라우팅 에러 처리 컴포넌트
 * - children: 하위 라우트들 (Layout의 <Outlet />에 렌더링됨)
 */
export const router = createBrowserRouter([
	{
		Component: GlobalLayout,
		errorElement: <GlobalError />,
		children: [
			{
				// 로그인 된 유저는 카카오 맵 지도 접근 가능
				Component: MapLayout,
				children: globalMapRoutes,
			},
			{
				// 로그인 된 유저는 위치 상세 페이지 접근 가능
				Component: LocationDetailLayout,
				children: locationDetailRoutes,
			},
			{
				// 로그인 된 유저는 위치 상세 페이지 접근 가능
				Component: UserDetailLayout,
				children: userDetailRoutes,
			},
			{
				// 로그인 된 유저는 후기 생성 페이지 접근 가능
				Component: CreateReviewLayout,
				children: createReviewRoutes,
			},
			{
				// 세션 데이터가 있다면, 인덱스 페이지로 라우팅
				Component: UnloggedInLayout,
				children: unloggedInRoute,
			},
		],
	},
]);
