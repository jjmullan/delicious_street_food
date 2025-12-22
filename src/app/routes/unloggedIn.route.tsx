import SignInPage from '@pages/login/common/SignInCommonPage';
import SignInWithPasswordPage from '@pages/login/email/SignInWithPasswordPage';
import SignUpConfirmPage from '@pages/signUp/SignUpConfirmPage';
import SignUpPage from '@pages/signUp/SignUpPage';
import type { RouteObject } from 'react-router';

export const unloggedInRoute: RouteObject[] = [
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
	{
		path: 'signup/confirm',
		Component: SignUpConfirmPage,
	},
];
