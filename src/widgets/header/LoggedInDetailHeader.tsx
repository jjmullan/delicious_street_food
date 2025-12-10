import { Link } from 'react-router';

function LoggedInDetailHeader() {
	return (
		<header className="flex justify-between items-center text-sm w-full">
			<button type="button" className="cursor-pointer px-3 h-12 flex justify-center items-center">
				취소
			</button>
			<h2 className="sr-only">리뷰 작성</h2>
			<Link to={'/'} className="cursor-pointer flex justify-center items-center px-3 h-12">
				지도
			</Link>
		</header>
	);
}

export default LoggedInDetailHeader;
