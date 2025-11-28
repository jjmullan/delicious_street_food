import SignUp from '@/features/auth/signUp/ui/SignUp';

function SignUpPage() {
	return (
		<div className="flex flex-col justify-center gap-y-5 min-w-1/3 max-w-1/2 mx-auto">
			<h2>회원가입</h2>
			<SignUp />
		</div>
	);
}

export default SignUpPage;
