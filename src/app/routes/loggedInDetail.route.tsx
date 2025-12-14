import type { RouteObject } from 'react-router';
import LocationPage from '@/pages/location/LocationPage';
import MyPagePage from '@/pages/mypage/MypagePage';
import ReviewAllPage from '@/pages/review/ReviewAllPage';
import ReviewPhotoPage from '@/pages/review/ReviewPhotoPage';

export const loggedInDetailRoutes: RouteObject[] = [
	{ path: '/mypage/:userId', Component: MyPagePage },
	{ path: '/location/:locationId/home', Component: LocationPage },
	{ path: '/location/:locationId/review/all', Component: ReviewAllPage },
	{ path: '/location/:locationId/review/photo', Component: ReviewPhotoPage },
];
