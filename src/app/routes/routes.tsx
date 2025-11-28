import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from '@/pages/error/ErrorPage';
import HomePage from '@/pages/home/HomePage';
import SignIpPage from '@/pages/login/SignInPage';
import MyPage from '@/pages/mypage/MyPage';
import SignUpPage from '@/pages/signUp/SignUpPage';
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
		Component: GlobalLayout,
		errorElement: <ErrorPage />,
		children: [
			{
				index: true,
				Component: HomePage,
			},
			{
				path: 'mypage',
				Component: MyPage,
			},
			{
				path: 'signup',
				Component: SignUpPage,
			},
			{
				path: 'login',
				Component: SignIpPage,
			},
		],
	},
]);
