import LocationDetailPage from '@pages/location/detail/LocationDetailPage';
import ReviewAllPage from '@pages/location/review/list/ReviewListPage';
import ReviewPhotoPage from '@pages/location/review/photo/ReviewPhotoPage';
import type { RouteObject } from 'react-router';

export const locationDetailRoutes: RouteObject[] = [
	{ path: '/location/:locationId/home', Component: LocationDetailPage },
	{ path: '/location/:locationId/review/all', Component: ReviewAllPage },
	{ path: '/location/:locationId/review/photo', Component: ReviewPhotoPage },
];
