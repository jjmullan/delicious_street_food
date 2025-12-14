import type { RouteObject } from 'react-router';
import LocationPage from '@/pages/location/LocationPage';
import ReviewAllPage from '@/pages/review/ReviewAllPage';
import ReviewPhotoPage from '@/pages/review/ReviewPhotoPage';

export const locationDetailRoutes: RouteObject[] = [
	{ path: '/location/:locationId/home', Component: LocationPage },
	{ path: '/location/:locationId/review/all', Component: ReviewAllPage },
	{ path: '/location/:locationId/review/photo', Component: ReviewPhotoPage },
];
