import type { RouteObject } from 'react-router';
import HomePage from '@/pages/home/HomePage';
import MyPage from '@/pages/mypage/MyPage';

export const loggedInUserOnlyRoutes: RouteObject[] = [
	{ index: true, path: '/', Component: HomePage },
	{ path: '/mypage', Component: MyPage },
];
