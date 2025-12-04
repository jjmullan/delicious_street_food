import { useNavigate } from 'react-router';
import useSingInWithOAuth from '@/features/auth/signIn/hooks/mutation/useSignInWithOAuth';
import Title from '@/shared/ui/title/Title';
import emailSvg from '/logo-email.svg';
import google from '/logo-google.svg';
import kakao from '/logo-kakao.svg';

function SignInCommon() {
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
		<div className="flex flex-col justify-center gap-y-8">
			<Title />
			<div className="flex flex-col gap-y-12">
				{/* 로그인 버튼 */}
				<div className="flex flex-col gap-y-2">
					{/* 소셜 로그인 */}
					<button
						type="button"
						className="button bg-[#FEE500] text-[#000000]"
						onClick={handleClickSignInWithKakao}
						disabled={isPending}
					>
						<img src={kakao} alt="kakao login" width={'20'} className="absolute left-4 aspect-square" />
						<p>카카오 로그인</p>
					</button>
					<button
						type="button"
						className="button bg-[#ffffff] text-black border"
						onClick={handleClickSignInWithGoogle}
						disabled={isPending}
					>
						<img src={google} alt="google login" width={'20'} className="absolute left-4 aspect-square" />
						<p>구글 로그인</p>
					</button>
					{/* 이메일 로그인 */}
					<button
						type="button"
						className="button bg-black"
						onClick={handleClickSignInWithPassword}
						disabled={isPending}
					>
						<img src={emailSvg} alt="email login" width={'20'} className="absolute left-4" />
						<p className="text-white">이메일 로그인</p>
					</button>
				</div>
			</div>
		</div>
	);
}

export default SignInCommon;
