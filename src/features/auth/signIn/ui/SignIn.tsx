import { EyeClosedIcon, EyeIcon } from 'lucide-react';
import { Activity, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { toast } from 'sonner';
import useSingInWithPassword from '@/features/auth/signIn/hooks/useSingInWithPassword';
import { generateErrorMessage } from '@/shared/lib/error';
import { Button } from '@/shared/ui/shadcn/button';
import { Input } from '@/shared/ui/shadcn/input';

function SignIn() {
	const navigate = useNavigate();

	// 로그인 데이터 전송
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { mutate: signInWithEmail, isPending } = useSingInWithPassword({
		onSuccess: () => {
			toast.success('로그인 되었습니다.', { position: 'top-center' });
			navigate('/', { replace: true });
		},
		onError: (error) => {
			const message = generateErrorMessage(error);
			toast.error(message, { position: 'top-center' });
		},
	});
	const handleClickSignIn = () => {
		if (email.trim() === '') return;
		if (password.trim() === '') return;

		signInWithEmail({ email, password });
		console.log('로그인 성공');
	};

	// 비밀번호 On/Off
	const [passwordOpen, setPasswordOpen] = useState(false);
	const togglePasswordOpen = () => {
		setPasswordOpen((state) => !state);
	};

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
			<Button className="w-full py-5 cursor-pointer" onClick={handleClickSignIn}>
				{isPending ? '로그인 중' : '로그인'}
			</Button>
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
