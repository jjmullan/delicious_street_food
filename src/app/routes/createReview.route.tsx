import type { RouteObject } from 'react-router';
import ReviewCreatePage from '@/pages/review/ReviewCreatePage';

export const createReviewRoutes: RouteObject[] = [
	{ path: '/location/:locationId/review/new', Component: ReviewCreatePage },
];
