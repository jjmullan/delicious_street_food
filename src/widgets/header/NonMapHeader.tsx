import { ArrowLeft } from 'lucide-react';
import { Activity } from 'react';
import { useNavigate } from 'react-router';

function NonMapHeader() {
	// mode === 'default'
	const navigate = useNavigate();
	const currentHref = window.location.href.split('/').pop();

	return (
		<header className="flex justify-between items-center text-lg absolute top-0 w-full">
			<button
				type="button"
				onClick={() => navigate(-1)}
				className="cursor-pointer px-3 h-12 flex justify-center items-center"
			>
				<Activity mode={window.location.href.split('/login').pop() === '' ? 'hidden' : 'visible'}>
					<ArrowLeft />
				</Activity>
			</button>
			<h2 className="align-baseline flex-1 h-12 flex justify-center items-center text-base">
				{currentHref === 'login' ? '' : currentHref === 'email' ? ' 이메일 로그인' : '이메일 회원가입'}
			</h2>
			<button type="button" onClick={() => {}} className="cursor-pointer flex justify-center items-center px-3 h-12">
				<div className="w-6 h-6"></div>
			</button>
		</header>
	);
}

export default NonMapHeader;
