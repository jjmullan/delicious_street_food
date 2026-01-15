import ReviewCreatePage from '@pages/location/review/create/ReviewCreatePage';
import type { RouteObject } from 'react-router';

export const createReviewRoutes: RouteObject[] = [
	{ path: '/location/:locationId/review/new', Component: ReviewCreatePage },
];
