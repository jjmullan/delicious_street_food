import type { RouteObject } from 'react-router';
import HomePage from '@/pages/home/HomePage';
import MyPage from '@/pages/mypage/MyPage';

export const privateRoutes: RouteObject[] = [
	{ path: '/', Component: HomePage },
	{ path: '/mypage', Component: MyPage },
];
