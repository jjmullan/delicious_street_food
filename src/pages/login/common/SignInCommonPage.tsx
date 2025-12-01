import SignInCommon from '@/features/auth/signIn/ui/SignInCommon';
import Title from '@/shared/ui/title/Title';

function SignInCommonPage() {
	return (
		<main className="mobile with-title">
			<Title />
			<SignInCommon />
		</main>
	);
}

export default SignInCommonPage;
