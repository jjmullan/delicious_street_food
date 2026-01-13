import ReviewCreatePage from '@pages/review/ReviewCreatePage';
import type { RouteObject } from 'react-router';

export const createReviewRoutes: RouteObject[] = [
	{ path: '/location/:locationId/review/new', Component: ReviewCreatePage },
];
