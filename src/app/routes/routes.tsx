// React Router 라우팅 설정 파일
// 애플리케이션의 모든 라우트 경로를 정의하고 관리합니다.

import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from '@/pages/error/ErrorPage';
import HomePage from '@/pages/home/HomePage';
import LoginPage from '@/pages/login/LoginPage';
import GlobalLayout from '@/widgets/layout/GlobalLayout';

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
		path: '/',
		element: <GlobalLayout />,
		errorElement: <ErrorPage />,
		children: [
			{
				index: true,
				element: <HomePage />,
			},
			// 추가 라우트는 여기에 정의합니다.
			{
				path: 'login',
				element: <LoginPage />,
			},
			// {
			//   path: 'products/:id',
			//   element: <ProductDetailPage />,
			// },
		],
	},
]);
