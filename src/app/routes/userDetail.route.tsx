import UserFavoritePage from '@pages/mypage/favorite/UserFavoritePage';
import UserProfilePage from '@pages/mypage/profile/UserProfilePage';
import UserReviewPage from '@pages/mypage/review/UserReviewPage';
import type { RouteObject } from 'react-router';

export const userDetailRoutes: RouteObject[] = [
	{ path: '/mypage/home', Component: UserProfilePage },
	{ path: '/mypage/review', Component: UserReviewPage },
	{ path: '/mypage/favorite', Component: UserFavoritePage },
];
