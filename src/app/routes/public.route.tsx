import type { RouteObject } from 'react-router';
import SignInWithPasswordPage from '@/pages/login/email/SignInWithPasswordPage';
import SignInPage from '@/pages/login/oauth/SignInWithOAuthPage';
import SignUpPage from '@/pages/signUp/SignUpPage';

export const publicRoutes: RouteObject[] = [
	{
		path: 'login',
		Component: SignInPage,
	},
	{
		path: 'login/email',
		Component: SignInWithPasswordPage,
	},
	{
		path: 'signup',
		Component: SignUpPage,
	},
];
