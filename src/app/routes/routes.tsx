import { createBrowserRouter } from 'react-router-dom';
import { privateRoutes } from '@/app/routes/private.route';
import { publicRoutes } from '@/app/routes/public.route';
import ErrorPage from '@/pages/error/ErrorPage';
import GlobalLayout from '@/widgets/layout/GlobalLayout';
import PrivateLayout from '@/widgets/layout/PrivateLayout';
import PublicLayout from '@/widgets/layout/PublicLayout';

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
				Component: PublicLayout,
				children: publicRoutes,
			},
			{
				Component: PrivateLayout,
				children: privateRoutes,
			},
		],
	},
]);
