import { ArrowLeft } from 'lucide-react';
import { Activity } from 'react';
import { useNavigate } from 'react-router';

function UnloggedInHeader() {
	const navigate = useNavigate();
	const currentHref = window.location.href.split('/').pop();

	return (
		<header className="flex justify-between items-center px-4 h-12 text-lg absolute top-0 w-full">
			<button type="button" onClick={() => navigate(-1)} className="cursor-pointer w-1/5">
				<Activity mode={window.location.href.split('/login').pop() === '' ? 'hidden' : 'visible'}>
					<ArrowLeft />
				</Activity>
			</button>
			<h2 className="text-center">
				{currentHref === 'login' ? '' : currentHref === 'email' ? ' 이메일 로그인' : '이메일 회원가입'}
			</h2>
			<button type="button" onClick={() => {}} className="cursor-pointer w-1/5"></button>
		</header>
	);
}

export default UnloggedInHeader;
