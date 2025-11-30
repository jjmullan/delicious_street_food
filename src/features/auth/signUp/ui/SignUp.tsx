import { LoaderCircleIcon } from 'lucide-react';
import { Activity, useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import useSignUpWithEmail from '@/features/auth/signUp/hooks/useSignUpWithEmail';
import validateEmail from '@/features/auth/signUp/util/validateEmail';
import validatePassword from '@/features/auth/signUp/util/validatePassword';
import { generateErrorMessage } from '@/shared/lib/error';
import AdditionalNoticeAtEdge from '@/shared/ui/additional/AdditionalNoticeAtEdge';
import { Button } from '@/shared/ui/shadcn/button';
import { Input } from '@/shared/ui/shadcn/input';

function SignUp() {
	const navigate = useNavigate();

	// 제출 여부 상태
	const [isSubmitted, setIsSubmitted] = useState(false);

	// 회원가입 입력요소 상태
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [passwordConfirm, setPasswordConfirm] = useState('');

	// 정규표현식 오류 상태
	const isEmailValid = validateEmail(email);
	const isPasswordValid = validatePassword(password, passwordConfirm);

	// 회원가입 API 전송
	const { mutate: signUp, isPending } = useSignUpWithEmail({
		onSuccess: () => {
			navigate('/login/email', { replace: true });
			toast.success('회원가입이 완료되었습니다🎉', {
				position: 'top-center',
			});
		},
		onError: (error) => {
			const message = generateErrorMessage(error);
			toast.error(message, { position: 'top-center' });
		},
	});
	const handleClickSubmit = () => {
		setIsSubmitted(true);

		if (!isEmailValid.isValid || !isPasswordValid.isValid) {
			return;
		}

		signUp({ email, password });
	};

	return (
		<div className="flex flex-col gap-y-4">
			<div className="flex flex-col gap-y-2">
				<div className="flex gap-x-2">
					<Input
						type="email"
						placeholder="이메일"
						className="py-5"
						disabled={isPending}
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<Button type="button" className="py-5 cursor-pointer" disabled={isPending || email.trim() === ''}>
						중복 확인
					</Button>
				</div>
				<Activity mode={isSubmitted && isEmailValid.errors.email ? 'visible' : 'hidden'}>
					<p className="text-sm text-muted-foreground px-2">{isEmailValid.errors.email}</p>
				</Activity>
			</div>
			<div className="flex flex-col gap-y-2">
				<div className="flex flex-col gap-y-2">
					<Input
						type="password"
						placeholder="비밀번호 입력 *특수문자, 대문자, 숫자 최소 한 개 이상 포함"
						name="password"
						className="py-5"
						disabled={isPending}
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<Activity mode={isSubmitted && isPasswordValid.errors.password ? 'visible' : 'hidden'}>
						<p className="text-sm text-muted-foreground px-2">{isPasswordValid.errors.password}</p>
					</Activity>
				</div>
				<div className="flex flex-col gap-y-2">
					<Input
						type="password"
						placeholder="비밀번호 재입력"
						className="py-5"
						disabled={isPending}
						value={passwordConfirm}
						onChange={(e) => setPasswordConfirm(e.target.value)}
					/>
					<Activity mode={isSubmitted && isPasswordValid.errors.passwordConfirm ? 'visible' : 'hidden'}>
						<p className="text-sm text-muted-foreground px-2">{isPasswordValid.errors.passwordConfirm}</p>
					</Activity>
				</div>
			</div>
			<Button
				className="w-full h-10 cursor-pointer"
				disabled={isPending || email.trim() === '' || password.trim() === '' || passwordConfirm.trim() === ''}
				onClick={handleClickSubmit}
			>
				{isPending ? (
					<>
						<LoaderCircleIcon className="animate-spin" />
						'회원가입 진행 중'
					</>
				) : (
					'회원가입'
				)}
			</Button>
			<AdditionalNoticeAtEdge text={'이미 계정이 있으시다면?'} link={'login'} linkText={'로그인'} />
		</div>
	);
}

export default SignUp;
