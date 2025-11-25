import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';

function SignUpPage() {
	return (
		<div className="flex flex-col justify-center gap-y-2 w-1/2">
			<div className="flex gap-x-2">
				<Input type="email" placeholder="*이메일" className="py-4" />
				<Button type="button">중복 확인</Button>
			</div>
			<Input type="password" placeholder="*비밀번호" className="py-4" />
			<Input type="password" placeholder="*비밀번호 재입력" className="py-4" />
			<Input type="text" placeholder="닉네임" />
			<Input type="text" placeholder="한 줄 소개" />
		</div>
	);
}

export default SignUpPage;
