import { ArrowLeftCircle, HomeIcon } from 'lucide-react';
import { useNavigate } from 'react-router';

function LoggedInDetailHeader() {
	const navigate = useNavigate();
	const handleGoBack = () => {
		navigate(-1);
	};
	const handleGoRootPage = () => {
		navigate('/');
	};
	return (
		<header className="fixed flex justify-between items-center text-sm w-full max-w-[767px] bg-[#fff]">
			<button
				type="button"
				className="cursor-pointer px-4 h-12 flex justify-center items-center"
				onClick={handleGoBack}
			>
				<ArrowLeftCircle width={16} />
			</button>
			<h2 className="text-lg font-semibold">타이틀</h2>
			<button
				type="button"
				className="cursor-pointer px-4 h-12 flex justify-center items-center"
				onClick={handleGoRootPage}
			>
				<HomeIcon width={16} />
			</button>
		</header>
	);
}

export default LoggedInDetailHeader;
