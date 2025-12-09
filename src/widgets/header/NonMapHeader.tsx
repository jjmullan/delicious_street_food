import { ArrowLeft, HomeIcon } from 'lucide-react';
import { Activity } from 'react';
import { Link, useNavigate } from 'react-router';

function NonMapHeader({ mode }: { mode: 'default' | 'extra' }) {
	// mode === 'default'
	const navigate = useNavigate();
	const currentHref = window.location.href.split('/').pop();

	// mode === 'extra'
	const curHref = window.location.href.split('/');
	let title = '';
	if (curHref.includes('mypage')) {
		title = '마이페이지';
	} else if (curHref.includes('location')) {
		if (curHref.includes('review')) {
			if (curHref.includes('all')) {
				title = '전체 리뷰';
			} else {
				title = '리뷰 작성';
			}
		} else {
			title = '상세페이지';
		}
	}

	return (
		<>
			{mode === 'default' ? (
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
					<button
						type="button"
						onClick={() => {}}
						className="cursor-pointer flex justify-center items-center px-3 h-12"
					>
						<div className="w-6 h-6"></div>
					</button>
				</header>
			) : (
				<header className="flex justify-between items-center text-lg w-full">
					<button
						type="button"
						onClick={() => navigate(-1)}
						className="cursor-pointer px-3 h-12 flex justify-center items-center"
					>
						{/* <Activity mode={level > 2 ? 'visible' : 'hidden'}> */}
						<ArrowLeft />
						{/* </Activity> */}
					</button>
					<h2 className="align-baseline flex-1 h-12 flex justify-center items-center text-base">{title}</h2>
					<Link to={'/'} className="cursor-pointer flex justify-center items-center px-3 h-12">
						<HomeIcon />
					</Link>
				</header>
			)}
		</>
	);
}

export default NonMapHeader;
