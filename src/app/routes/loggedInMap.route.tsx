import type { RouteObject } from 'react-router';
import HomePage from '@/pages/home/HomePage';

export const loggedInMapRoutes: RouteObject[] = [{ index: true, path: '/', Component: HomePage }];
