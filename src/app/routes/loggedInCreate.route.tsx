import type { RouteObject } from 'react-router';
import ReviewCreatePage from '@/pages/review/ReviewCreatePage';

export const loggedInCreateRoutes: RouteObject[] = [
	{ path: '/location/:locationId/review/new', Component: ReviewCreatePage },
];
