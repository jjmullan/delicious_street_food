import type { RouteObject } from 'react-router';
import LocationPage from '@/pages/location/LocationPage';
import MyPagePage from '@/pages/mypage/MypagePage';
import ReviewListPage from '@/pages/review/ReviewListPage';
import ReviewPhotoPage from '@/pages/review/ReviewPhotoPage';

export const loggedInDetailRoutes: RouteObject[] = [
	{ path: '/mypage/:userId', Component: MyPagePage },
	{ path: '/location/:locationId/home', Component: LocationPage },
	{ path: '/location/:locationId/review/all', Component: ReviewListPage },
	{ path: '/location/:locationId/review/photo', Component: ReviewPhotoPage },
];
