import type { RouteObject } from 'react-router';
import MyPageFavoritePage from '@/pages/mypage/favorite/MyPageFavoritePage';
import MyPageHomePage from '@/pages/mypage/home/MyPageHomePage';
import MyPageReviewPage from '@/pages/mypage/review/MyPageReviewPage';

export const userDetailRoutes: RouteObject[] = [
	{ path: '/mypage/home', Component: MyPageHomePage },
	{ path: '/mypage/review', Component: MyPageReviewPage },
	{ path: '/mypage/favorite', Component: MyPageFavoritePage },
];
