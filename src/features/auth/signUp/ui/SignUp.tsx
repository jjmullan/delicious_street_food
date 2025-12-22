import { Activity, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import useSignUpWithEmail from '@/features/auth/signUp/hooks/useSignUpWithEmail';
import validateEmail from '@/features/auth/signUp/util/validateEmail';
import validatePassword from '@/features/auth/signUp/util/validatePassword';
import { generateErrorMessage } from '@/shared/lib/error';
import AdditionalNoticeAtEdge from '@/shared/ui/description/AdditionalNoticeAtEdge';
import FallbackText from '@/shared/ui/fallback/FallbackText';
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
			navigate(`/signup/confirm?email=${email}`, { replace: true });
			toast.success('회원가입이 완료되었습니다🎉', {
				position: 'top-center',
			});
		},
		onError: (error) => {
			const message = generateErrorMessage(error);
			toast.error(message, { position: 'top-center' });
		},
	});

	// 회원가입 버튼 클릭 이벤트
	const handleClickSubmit = () => {
		setIsSubmitted(true);

		if (!isEmailValid.isValid || !isPasswordValid.isValid) {
			return;
		}

		signUp({ email, password });
	};

	// 비밀번호가 onBlur 되었을 때 시점 이후 에러메시지 호출
	const passwordRef = useRef(null);
	const [passwordFocused, setPasswordFocused] = useState(false);
	const handleBlurPassword = () => {
		setPasswordFocused(true);
	};

	// 비밀번호 확인이 onBlur 되었을 때 시점 이후 에러메시지 호출
	const passwordConfirmRef = useRef(null);
	const [passwordConfirmFocused, setPasswordConfirmFocused] = useState(false);
	const handleBlurPasswordConfirm = () => {
		setPasswordConfirmFocused(true);
	};

	return (
		<div className="flex flex-col justify-center gap-y-4">
			<div className="flex flex-col gap-y-2">
				{/* 이메일 */}
				<div className="flex flex-col gap-y-2">
					<div className="flex gap-x-2">
						<Input
							type="email"
							placeholder="이메일"
							className="h-12"
							disabled={isPending}
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						{/* <Button type="button" className="py-5 cursor-pointer" disabled={isPending || email.trim() === ''}>
  						중복 확인
  					</Button> */}
					</div>
					<Activity mode={isSubmitted && isEmailValid.errors.email ? 'visible' : 'hidden'}>
						<p className="text-sm text-muted-foreground px-2">{isEmailValid.errors.email}</p>
					</Activity>
				</div>
				{/* 비밀번호 */}
				<div className="flex flex-col gap-y-2">
					<div className="flex flex-col gap-y-2">
						<Input
							type="password"
							placeholder="비밀번호"
							name="password"
							className="h-12"
							disabled={isPending}
							value={password}
							ref={passwordRef}
							onBlur={() => handleBlurPassword()}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<Activity mode={passwordFocused && isPasswordValid.errors.password ? 'visible' : 'hidden'}>
							<p className="text-sm text-red-600 px-2">{isPasswordValid.errors.password}</p>
						</Activity>
					</div>
					<div className="flex flex-col gap-y-2">
						<Input
							type="password"
							placeholder="비밀번호 재입력"
							className="h-12"
							disabled={isPending}
							value={passwordConfirm}
							ref={passwordConfirmRef}
							onBlur={handleBlurPasswordConfirm}
							onChange={(e) => setPasswordConfirm(e.target.value)}
						/>
						<Activity mode={passwordConfirmFocused && isPasswordValid.errors.passwordConfirm ? 'visible' : 'hidden'}>
							<p className="text-sm text-red-600 px-2">{isPasswordValid.errors.passwordConfirm}</p>
						</Activity>
					</div>
				</div>
			</div>
			{/* 회원가입 */}
			<button
				type="button"
				className="button bg-black text-white"
				disabled={isPending || email.trim() === '' || password.trim() === '' || passwordConfirm.trim() === ''}
				onClick={handleClickSubmit}
			>
				{isPending ? <FallbackText title={'회원가입 중'} /> : <p className="text-white">회원가입</p>}
			</button>
			<AdditionalNoticeAtEdge text={'이미 계정이 있으시다면?'} link={'login'} linkText={'로그인'} />
		</div>
	);
}

export default SignUp;
