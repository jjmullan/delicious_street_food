import { EyeClosedIcon, EyeIcon } from 'lucide-react';
import { Activity, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { toast } from 'sonner';
import useSingInWithOAuth from '@/features/auth/signIn/hooks/mutation/useSignInWithOAuth';
import useSingInWithPassword from '@/features/auth/signIn/hooks/mutation/useSignInWithPassword';
import { generateErrorMessage } from '@/shared/lib/error';
import { Button } from '@/shared/ui/shadcn/button';
import { Input } from '@/shared/ui/shadcn/input';

function SignIn() {
	const navigate = useNavigate();

	// 로그인 데이터 전송
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const { mutate: signInWithPassword, isPending: isSignInWithPasswordPending } = useSingInWithPassword({
		onSuccess: () => {
			toast.success('로그인 되었습니다.', { position: 'top-center' });
			navigate('/', { replace: true });
		},
		onError: (error) => {
			const message = generateErrorMessage(error);
			toast.error(message, { position: 'top-center' });
		},
	});
	const handleClickSignInWithPassword = () => {
		if (email.trim() === '') return;
		if (password.trim() === '') return;

		signInWithPassword({ email, password });
		console.log('로그인 성공');
	};

	const { mutate: signInWithOAuth, isPending: isSignInWithOAuthPending } = useSingInWithOAuth({});
	const handleClickSignInWithGoogle = () => {
		signInWithOAuth('google');
	};
	const handleClickSignInWithKakao = () => {
		signInWithOAuth('kakao');
	};

	// 비밀번호 On/Off
	const [passwordOpen, setPasswordOpen] = useState(false);
	const togglePasswordOpen = () => {
		setPasswordOpen((state) => !state);
	};

	const isPending = isSignInWithPasswordPending || isSignInWithOAuthPending;

	return (
		<div className="flex flex-col gap-y-4">
			<div className="flex flex-col">
				<div className="flex flex-col gap-y-2">
					<div className="flex gap-x-2">
						<Input
							type="email"
							placeholder="이메일"
							className="py-5"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							disabled={isPending}
						/>
					</div>
					<Activity>
						<p className="text-sm text-muted-foreground px-2"></p>
					</Activity>
				</div>
				<div className="flex flex-col gap-y-2 relative">
					<Input
						type={passwordOpen ? 'text' : 'password'}
						placeholder="비밀번호"
						className="py-5"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						disabled={isPending}
					/>
					<button type="button" onClick={togglePasswordOpen} className="cursor-pointer">
						{passwordOpen === true ? (
							<EyeClosedIcon className="w-4 absolute top-2 right-4" />
						) : (
							<EyeIcon className="w-4 absolute top-2 right-4" />
						)}
					</button>
					<Activity>
						<p className="text-sm text-muted-foreground px-2"></p>
					</Activity>
				</div>
			</div>
			<div className="flex flex-col gap-y-2">
				<Button className="w-full py-5 cursor-pointer" onClick={handleClickSignInWithPassword}>
					{isPending ? '로그인 중' : '이메일 로그인'}
				</Button>
				<button
					type="button"
					className="bg-[#FEE500] text-[#000000] py-5 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive h-9 px-4 w-full cursor-pointer"
					onClick={handleClickSignInWithKakao}
				>
					카카오 로그인
				</button>
				<button
					type="button"
					className="bg-white text-black py-5 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive h-9 px-4 w-full cursor-pointer border"
					onClick={handleClickSignInWithGoogle}
				>
					구글 로그인
				</button>
			</div>
			<div className="flex gap-x-2 text-muted-foreground">
				<div>아직 계정이 없으시다면?</div>
				<Link to="/signup" className="hover:underline text-black">
					회원가입
				</Link>
			</div>
		</div>
	);
}

export default SignIn;
