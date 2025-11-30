import { EyeClosedIcon, EyeIcon, LoaderCircleIcon } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { toast } from 'sonner';
import useSignInWithPassword from '@/features/auth/signIn/hooks/mutation/useSignInWithPassword';
import { generateErrorMessage } from '@/shared/lib/error';
import { Button } from '@/shared/ui/shadcn/button';
import { Input } from '@/shared/ui/shadcn/input';

function SignInWithPassword() {
	const navigate = useNavigate();

	// 이메일 로그인
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const { mutate: signInWithPassword, isPending } = useSignInWithPassword({
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

	// 비밀번호 On/Off
	const [passwordOpen, setPasswordOpen] = useState(false);
	const togglePasswordOpen = () => {
		setPasswordOpen((state) => !state);
	};
	return (
		<>
			{/* 이메일 로그인 */}
			<div className="flex flex-col gap-y-4">
				<div className="flex flex-col gap-y-2">
					<Input
						type="email"
						placeholder="이메일"
						className="py-5"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						disabled={isPending}
					/>
					<div className="flex flex-col relative">
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
					</div>
				</div>
				<Button className="w-full py-5 cursor-pointer relative" onClick={handleClickSignInWithPassword}>
					{isPending ? (
						<>
							<LoaderCircleIcon className="animate-spin" />
							'로그인 중'
						</>
					) : (
						'이메일 로그인'
					)}
				</Button>
				<div className="flex justify-center gap-x-2 text-muted-foreground text-sm">
					<div>아직 계정이 없으시다면?</div>
					<Link to="/signup" className="hover:underline text-black font-semibold">
						이메일 회원가입
					</Link>
				</div>
			</div>
		</>
	);
}

export default SignInWithPassword;
