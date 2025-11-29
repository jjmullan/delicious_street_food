import { Activity } from 'react';
import { Link, useNavigate } from 'react-router';
import { useSession } from '@/app/store/session';

function Header() {
	const session = useSession();
	const navigate = useNavigate();

	return (
		<header className="flex justify-between items-center px-4 h-15 text-lg absolute top-0 w-full z-1 bg-white/80">
			<div className="w-[100px]">
				<Activity mode={window.location.href.split('/').pop() === '' ? 'hidden' : 'visible'}>
					<button type="button" onClick={() => navigate(-1)}>
						뒤로 가기
					</button>
				</Activity>
			</div>
			<h1 className="text-center">
				<Link to={'/'}>로고</Link>
			</h1>
			<div className="w-[100px] flex justify-end">
				{session ? (
					<button type="button">로그아웃</button>
				) : (
					<button type="button" onClick={() => navigate('/login')} className="cursor-pointer">
						로그인
					</button>
				)}
			</div>
		</header>
	);
}
4;
export default Header;
