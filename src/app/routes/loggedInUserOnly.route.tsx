import type { RouteObject } from 'react-router';
import HomePage from '@/pages/home/HomePage';
import LocationPage from '@/pages/location/LocationPage';
import MypagePage from '@/pages/mypage/MypagePage';

export const loggedInUserOnlyRoutes: RouteObject[] = [
	{ index: true, path: '/', Component: HomePage },
	{ path: '/mypage/:userId', Component: MypagePage },
	{ path: '/location/:locationId', Component: LocationPage },
];
