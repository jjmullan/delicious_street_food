import type { RouteObject } from 'react-router';
import SignInPage from '@/pages/login/common/SignInCommonPage';
import SignInWithPasswordPage from '@/pages/login/email/SignInWithPasswordPage';
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
