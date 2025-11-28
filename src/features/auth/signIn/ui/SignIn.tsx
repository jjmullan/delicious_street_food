import { EyeClosedIcon, EyeIcon } from 'lucide-react';
import { Activity, useState } from 'react';
import { Button } from '@/shared/ui/shadcn/button';
import { Input } from '@/shared/ui/shadcn/input';

function SignIn() {
	const [passwordOpen, setPasswordOpen] = useState(false);
	const togglePasswordOpen = () => {
		setPasswordOpen((state) => !state);
	};

	return (
		<div className="flex flex-col gap-y-4">
			<div className="flex flex-col gap-y-2">
				<div className="flex flex-col gap-y-2">
					<div className="flex gap-x-2">
						<Input type="email" placeholder="이메일" className="py-5" />
					</div>
					<Activity>
						<p className="text-sm text-muted-foreground px-2"></p>
					</Activity>
				</div>
				<div className="flex flex-col gap-y-2 relative">
					<Input type={passwordOpen ? 'text' : 'password'} placeholder="비밀번호" name="password" className="py-5" />
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
			<Button className="w-full py-5 cursor-pointer">로그인</Button>
		</div>
	);
}

export default SignIn;
