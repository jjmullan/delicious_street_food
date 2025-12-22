import { useNavigate, useSearchParams } from 'react-router';

function SignUpConfirm() {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const email = searchParams.get('email') || '';

	return (
		<div className="flex flex-col justify-center items-center gap-y-8">
			<div className="relative flex flex-col items-center justify-center">
				<img src="/image/email.png" alt="이메일" className="w-3/4" />
				<div className="flex flex-col text-base text-center">
					<p className="">
						<span className="text-brown-main font-medium">{email}</span>&nbsp;으로
					</p>
					<p>인증메일이 발송되었습니다.</p>
				</div>
			</div>
			<button type="button" className="button bg-black text-white" onClick={() => navigate('/login/email')}>
				인증메일 확인 완료
			</button>
		</div>
	);
}

export default SignUpConfirm;
