import { EyeClosedIcon, EyeIcon, LoaderCircleIcon } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import useSignInWithPassword from '@/features/auth/signIn/hooks/mutation/useSignInWithPassword';
import { generateErrorMessage } from '@/shared/lib/error';
import AdditionalNoticeAtEdge from '@/shared/ui/description/AdditionalNoticeAtEdge';
import { Button } from '@/shared/ui/shadcn/button';
import { Input } from '@/shared/ui/shadcn/input';
import Title from '@/shared/ui/title/Title';

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
		<div className="flex flex-col justify-center gap-y-8">
			<Title />
			<div className="flex flex-col justify-center gap-y-4">
				<div className="flex flex-col gap-y-2">
					{/* 이메일 */}
					<Input
						type="email"
						placeholder="이메일"
						className="h-12"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						disabled={isPending}
					/>
					{/* 비밀번호 */}
					<div className="flex flex-col relative">
						<Input
							type={passwordOpen ? 'text' : 'password'}
							placeholder="비밀번호"
							className="h-12"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							disabled={isPending}
						/>
						<button type="button" onClick={togglePasswordOpen} className="cursor-pointer absolute top-3 right-4">
							{passwordOpen === true ? <EyeClosedIcon className="w-4 " /> : <EyeIcon className="w-4" />}
						</button>
					</div>
				</div>
				<Button
					className="w-full h-12 cursor-pointer relative text-base"
					onClick={handleClickSignInWithPassword}
					disabled={isPending || email.trim() === '' || password.trim() === ''}
				>
					{isPending ? (
						<>
							<LoaderCircleIcon className="animate-spin" />
							'로그인 중'
						</>
					) : (
						'로그인'
					)}
				</Button>
				<AdditionalNoticeAtEdge text={'아직 계정이 없으시다면?'} link={'signup'} linkText={'이메일 회원가입'} />
			</div>
		</div>
	);
}

export default SignInWithPassword;
