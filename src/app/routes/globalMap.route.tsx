import type { RouteObject } from 'react-router';
import HomePage from '@/pages/home/HomePage';

export const globalMapRoutes: RouteObject[] = [{ index: true, path: '/', Component: HomePage }];
