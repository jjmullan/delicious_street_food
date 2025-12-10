import { createBrowserRouter } from 'react-router-dom';
import { loggedInCreateRoutes } from '@/app/routes/loggedInCreate.route';
import { loggedInDetailRoutes } from '@/app/routes/loggedInDetail.route';
import { loggedInMapRoutes } from '@/app/routes/loggedInMap.route';
import { unloggedInRoute } from '@/app/routes/unloggedIn.route';
import ErrorPage from '@/pages/error/ErrorPage';
import GlobalLayout from '@/widgets/layout/GlobalLayout';
import LoggedInCreateLayout from '@/widgets/layout/LoggedInCreateLayout';
import LoggedInDetailLayout from '@/widgets/layout/LoggedInDetailLayout';
import LoggedInMapLayout from '@/widgets/layout/LoggedInMapLayout';
import UnloggedInLayout from '@/widgets/layout/UnloggedInLayout';

/**
 * 애플리케이션의 라우트 설정
 * createBrowserRouter를 사용하여 브라우저 히스토리 기반 라우팅을 구성합니다.
 *
 * 구조:
 * - element: Layout - 전역 레이아웃 컴포넌트 (헤더, 푸터 등)
 * - errorElement: ErrorPage - 라우팅 에러 처리 컴포넌트
 * - children: 하위 라우트들 (Layout의 <Outlet />에 렌더링됨)
 */
export const router = createBrowserRouter([
	{
		Component: GlobalLayout,
		errorElement: <ErrorPage />,
		children: [
			{
				// 로그인 된 유저는 카카오 맵 지도 접근 가능
				Component: LoggedInMapLayout,
				children: loggedInMapRoutes,
			},
			{
				// 로그인 된 유저는 상세 페이지 접근 가능
				Component: LoggedInDetailLayout,
				children: loggedInDetailRoutes,
			},
			{
				// 로그인 된 유저는 생성 페이지 접근 가능
				Component: LoggedInCreateLayout,
				children: loggedInCreateRoutes,
			},
			{
				// 세션 데이터가 있다면, 인덱스 페이지로 라우팅
				Component: UnloggedInLayout,
				children: unloggedInRoute,
			},
		],
	},
]);
