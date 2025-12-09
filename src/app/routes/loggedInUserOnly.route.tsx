import type { RouteObject } from 'react-router';
import HomePage from '@/pages/home/HomePage';
import LocationPage from '@/pages/location/LocationPage';
import MypagePage from '@/pages/mypage/MypagePage';
import ReviewCreatePage from '@/pages/review/ReviewCreatePage';
import ReviewListPage from '@/pages/review/ReviewListPage';

export const loggedInUserOnlyRoutes: RouteObject[] = [
	{ index: true, path: '/', Component: HomePage },
	{ path: '/mypage/:userId', Component: MypagePage },
	{ path: '/location/:locationId', Component: LocationPage },
	{ path: '/location/:locationId/review/all', Component: ReviewListPage },
	{ path: '/location/:locationId/review/new', Component: ReviewCreatePage },
];
