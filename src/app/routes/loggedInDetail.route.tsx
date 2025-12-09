import type { RouteObject } from 'react-router';
import LocationPage from '@/pages/location/LocationPage';
import MyPagePage from '@/pages/mypage/MypagePage';
import ReviewCreatePage from '@/pages/review/ReviewCreatePage';
import ReviewListPage from '@/pages/review/ReviewListPage';

export const loggedInDetailRoutes: RouteObject[] = [
	{ path: '/mypage/:userId', Component: MyPagePage },
	{ path: '/location/:locationId', Component: LocationPage },
	{ path: '/location/:locationId/review/all', Component: ReviewListPage },
	{ path: '/location/:locationId/review/new', Component: ReviewCreatePage },
];
