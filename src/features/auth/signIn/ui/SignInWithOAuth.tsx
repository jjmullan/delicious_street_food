import { useNavigate } from 'react-router';
import useSingInWithOAuth from '@/features/auth/signIn/hooks/mutation/useSignInWithOAuth';
import emailSvg from '/logo-email.svg';
import google from '/logo-google.svg';
import kakao from '/logo-kakao.svg';

function SignInWithOAuth() {
	const navigate = useNavigate();

	const { mutate: signInWithOAuth, isPending } = useSingInWithOAuth({});
	const handleClickSignInWithGoogle = () => {
		signInWithOAuth('google');
	};
	const handleClickSignInWithKakao = () => {
		signInWithOAuth('kakao');
	};
	const handleClickSignInWithPassword = () => {
		navigate('/login/email');
	};

	return (
		<div className="flex flex-col gap-y-8">
			<div className="flex flex-col gap-y-2">
				{/* 이메일 로그인 버튼 */}
				<button
					type="button"
					className="bg-black text-white py-5 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive h-9 px-4 w-full cursor-pointer relative"
					onClick={handleClickSignInWithPassword}
					disabled={isPending}
				>
					<img src={emailSvg} alt="email login" width={'20'} className="absolute left-4" />
					이메일 로그인
				</button>
				{/* 소셜 로그인 */}
				<button
					type="button"
					className="bg-[#FEE500] text-[#000000] py-5 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive h-9 px-4 w-full cursor-pointer relative"
					onClick={handleClickSignInWithKakao}
					disabled={isPending}
				>
					<img src={kakao} alt="kakao login" width={'20'} className="absolute left-4 aspect-square" />
					카카오 로그인
				</button>
				<button
					type="button"
					className="bg-white text-black py-5 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive h-9 px-4 w-full cursor-pointer border relative"
					onClick={handleClickSignInWithGoogle}
					disabled={isPending}
				>
					<img src={google} alt="google login" width={'20'} className="absolute left-4 aspect-square" />
					<p>구글 로그인</p>
				</button>
			</div>
		</div>
	);
}

export default SignInWithOAuth;
