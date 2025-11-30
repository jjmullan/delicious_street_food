import type { RouteObject } from 'react-router';
import SignInPage from '@/pages/login/SignInPage';
import SignUpPage from '@/pages/signUp/SignUpPage';

export const publicRoutes: RouteObject[] = [
	{
		path: 'login',
		Component: SignInPage,
	},
	{
		path: 'signup',
		Component: SignUpPage,
	},
];
