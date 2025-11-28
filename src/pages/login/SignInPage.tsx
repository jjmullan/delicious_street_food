import SignIn from '@/features/auth/signIn/ui/SignIn';

function SignInPage() {
	return (
		<div className="flex flex-col justify-center gap-y-5 min-w-1/3 max-w-1/2 mx-auto">
			<h2>로그인</h2>
			<SignIn />
		</div>
	);
}

export default SignInPage;
